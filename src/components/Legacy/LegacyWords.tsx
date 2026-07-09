import { useState, useEffect } from 'react';
import { useReveal } from '../../hooks/useReveal';

export const LegacyWords = () => {
  const [ref, isVisible] = useReveal({ threshold: 0.4 });
  const [wordIndex, setWordIndex] = useState(0);
  const words = [
    "THE LAST BRAZILIAN GENIUS.",
    "JOY.",
    "CREATIVITY.",
    "COURAGE.",
    "NEYMAR."
  ];

  useEffect(() => {
    if (isVisible && wordIndex < words.length - 1) {
      const timer = setTimeout(() => {
        setWordIndex((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, wordIndex, words.length]);

  return (
    <section 
      ref={ref} 
      className="h-screen bg-black flex items-center justify-center relative overflow-hidden w-full"
    >
      {/* Noise background */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` 
        }} 
      />
      
      <div className="text-center relative z-10 w-full px-4 h-40 flex items-center justify-center">
        {words.map((word, idx) => {
          const isActive = idx === wordIndex;
          const isLastWord = idx === words.length - 1;
          
          return (
            <h2 
              key={idx}
              className={`absolute w-full px-4 text-3xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter transition-all duration-1000 ease-out select-none
                ${isActive ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-md pointer-events-none'}
                ${isLastWord ? 'text-[#B89B5E]' : 'text-white'}
              `}
            >
              {word}
            </h2>
          );
        })}
      </div>
    </section>
  );
};
