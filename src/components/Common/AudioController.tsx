import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { synthEngine } from '../../utils/synth';

export const AudioController = () => {
  const [isMuted, setIsMuted] = useState(true);

  const handleToggle = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    synthEngine.toggle(nextState);
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-mono font-bold tracking-widest text-[#B89B5E] hover:text-white hover:border-[#B89B5E] transition-all duration-300 interactive select-none"
      aria-label={isMuted ? "Unmute audio experience" : "Mute audio experience"}
    >
      <div className="flex items-center gap-1.5 h-3">
        {isMuted ? (
          <VolumeX size={12} className="text-gray-500" />
        ) : (
          <Volume2 size={12} className="text-[#B89B5E] animate-pulse" />
        )}
      </div>
      <span>
        SOUND: {isMuted ? 'OFF' : 'ON'}
      </span>
      
      {/* Sound waves visualization when playing */}
      {!isMuted && (
        <div className="flex items-end gap-[2px] h-2">
          <div className="w-[1px] h-1 bg-[#B89B5E] animate-bounce" style={{ animationDelay: '0.1s', animationDuration: '0.6s' }} />
          <div className="w-[1px] h-2 bg-[#B89B5E] animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '0.8s' }} />
          <div className="w-[1px] h-1.5 bg-[#B89B5E] animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '0.5s' }} />
        </div>
      )}
    </button>
  );
};
