class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterVolume: GainNode | null = null;
  private isEnabled: boolean = false;

  public init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterVolume = this.ctx.createGain();
      this.masterVolume.gain.value = 0.25; // elegant low default volume
      this.masterVolume.connect(this.ctx.destination);
      this.isEnabled = true;
      
      // Play a subtle success chime on initialization
      this.playChime();
    } catch (e) {
      console.warn("Web Audio API is not supported in this browser:", e);
    }
  }

  public toggle(mute: boolean) {
    if (!this.ctx) {
      this.init();
    }
    if (this.masterVolume && this.ctx) {
      const targetVolume = mute ? 0 : 0.25;
      this.masterVolume.gain.setValueAtTime(this.masterVolume.gain.value, this.ctx.currentTime);
      this.masterVolume.gain.linearRampToValueAtTime(targetVolume, this.ctx.currentTime + 0.3);
    }
  }

  private playChime() {
    if (!this.ctx || !this.masterVolume) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.masterVolume);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.8); // C6

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.start(now);
    osc.stop(now + 0.85);
  }

  public playEraTransition(index: number) {
    if (!this.isEnabled || !this.ctx || !this.masterVolume) return;
    
    // Resume context if suspended by browser autoplay policy
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;

    // Standard high quality sweep setup
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterVolume);

    if (index === 1) {
      // Barcelona (Auge) - Play a rich perfect-fifth harmonic chord
      // Osc 1 (C4 -> C5 sweep)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(261.63, now); // C4
      osc.frequency.exponentialRampToValueAtTime(523.25, now + 1.5); 

      // Osc 2 (G4 -> G5 sweep)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(this.masterVolume);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(392.00, now); // G4
      osc2.frequency.exponentialRampToValueAtTime(783.99, now + 1.5);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(220, now + 1.5);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.linearRampToValueAtTime(0.1, now + 0.5);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      osc.start(now);
      osc2.start(now);
      
      osc.stop(now + 2.0);
      osc2.stop(now + 2.0);
    } else {
      // Standard deep sub-bass sweep transition
      osc.type = 'sine';
      const rootFreq = index === 0 ? 82.41 : index === 2 ? 73.42 : 98.00; // E2, D2, G2
      osc.frequency.setValueAtTime(rootFreq, now);
      osc.frequency.linearRampToValueAtTime(rootFreq * 0.75, now + 1.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(45, now + 1.2);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      osc.start(now);
      osc.stop(now + 1.6);
    }
  }
}

export const synthEngine = new AudioEngine();
