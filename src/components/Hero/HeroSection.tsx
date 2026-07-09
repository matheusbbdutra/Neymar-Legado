import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { TrailerSequence } from './TrailerSequence';
import { HeroTitle } from './HeroTitle';
import { HeroCounter } from './HeroCounter';

export const HeroSection = () => {
  const [phase, setPhase] = useState(0);
  const [heroText, setHeroText] = useState("");
  const fullText = "NEYMAR";

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1800), // Show 792 Goals
      setTimeout(() => setPhase(2), 3600), // Show Countless Memories
      setTimeout(() => setPhase(3), 5400), // Black transition screen pause
      setTimeout(() => setPhase(4), 7000), // Start Typing NEYMAR
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase === 4) {
      if (heroText.length < fullText.length) {
        const timer = setTimeout(() => {
          setHeroText(fullText.slice(0, heroText.length + 1));
        }, 150);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setPhase(5); // Show Counter & Chevron
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [heroText, phase]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] w-full">
      {/* Dynamic dark radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_0%,transparent_70%)] pointer-events-none" />

      <TrailerSequence phase={phase} />

      <HeroTitle 
        text={heroText} 
        showCursor={phase === 4 || phase === 5} 
        pulseCursor={phase === 5} 
        phase={phase} 
      />

      <HeroCounter phase={phase} />

      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-8 animate-bounce text-gray-700 transition-opacity duration-1000 ${
          phase === 5 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } z-10`}
      >
        <ChevronDown size={24} />
      </div>
    </section>
  );
};
