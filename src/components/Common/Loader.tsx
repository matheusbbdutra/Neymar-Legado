import { useEffect, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2800; // 2.8 seconds
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, intervalTime);

    // GSAP animations for loader elements
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out transition
        gsap.to('.loader-container', {
          opacity: 0,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: onComplete
        });
      }
    });

    tl.fromTo('.loader-title', 
      { letterSpacing: '0.1em', opacity: 0, scale: 0.95 },
      { letterSpacing: '0.3em', opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
    )
    .fromTo('.loader-subtitle',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo('.loader-bar-outer',
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.5'
    );

    // Wait until progress reaches 100 and then trigger complete animation
    const delayTimer = setTimeout(() => {
      clearInterval(timer);
      setProgress(100);
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(delayTimer);
    };
  }, [onComplete]);

  return (
    <div className="loader-container fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] text-white select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,155,94,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Title */}
        <h1 className="loader-title text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-[0.2em] mb-3 leading-none text-white">
          NEYMAR
        </h1>
        
        {/* Subtitle */}
        <h2 className="loader-subtitle text-[#B89B5E] text-[10px] sm:text-xs font-bold tracking-[0.5em] uppercase mb-12">
          THE LEGACY EXPERIENCE
        </h2>

        {/* Cinematic progress details */}
        <div className="loader-bar-outer flex flex-col items-center w-48 sm:w-64">
          <div className="w-full h-[1px] bg-white/10 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-[#B89B5E] transition-all duration-100 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between w-full text-[9px] font-mono tracking-widest text-gray-500 uppercase">
            <span>Loading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
