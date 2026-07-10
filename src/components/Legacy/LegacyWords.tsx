import { useState, useEffect } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { Zap, Sparkles, Heart } from 'lucide-react';

export const LegacyWords = () => {
  const [ref, isVisible] = useReveal({ threshold: 0.2 });
  const [wordIndex, setWordIndex] = useState(0);
  const [showGrid, setShowGrid] = useState(false);

  const words = [
    "THE LAST BRAZILIAN GENIUS.",
    "BRAZIL'S CREATIVITY.",
    "FOOTBALL'S ENTERTAINER.",
    "AN INSPIRATION FOR MILLIONS.",
    "THE NEYMAR LEGACY."
  ];

  useEffect(() => {
    if (isVisible && wordIndex < words.length - 1) {
      const timer = setTimeout(() => {
        setWordIndex((prev) => prev + 1);
      }, 1600);
      return () => clearTimeout(timer);
    } else if (isVisible && wordIndex === words.length - 1) {
      const gridTimer = setTimeout(() => {
        setShowGrid(true);
      }, 1200);
      return () => clearTimeout(gridTimer);
    }
  }, [isVisible, wordIndex, words.length]);

  return (
    <section 
      ref={ref} 
      className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden w-full py-20 px-6 sm:px-12 md:px-20 lg:px-40"
    >
      {/* Noise background */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` 
        }} 
      />
      
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-[#B89B5E]/5 blur-[120px] pointer-events-none" />
      
      <div className="text-center relative z-10 w-full max-w-5xl h-32 md:h-40 flex items-center justify-center">
        {words.map((word, idx) => {
          const isActive = idx === wordIndex;
          const isLastWord = idx === words.length - 1;
          
          return (
            <h2 
              key={idx}
              className={`absolute w-full px-4 text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter transition-all duration-1000 ease-out select-none
                ${isActive ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-md pointer-events-none'}
                ${isLastWord ? 'text-[#B89B5E]' : 'text-white'}
              `}
            >
              {word}
            </h2>
          );
        })}
      </div>

      {/* Cinematic Legacy Grid Columns */}
      <div 
        className={`w-full max-w-6xl mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10 transition-all duration-[1500ms] transform select-none
          ${showGrid 
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
            : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
          }`}
      >
        {/* Creativity */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left group border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#B89B5E]/20 p-8 rounded-2xl transition-all duration-500">
          <div className="w-12 h-12 bg-[#B89B5E]/10 rounded-xl flex items-center justify-center text-[#B89B5E] mb-6 group-hover:scale-110 transition-transform duration-300">
            <Zap size={20} />
          </div>
          <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-4">
            A Essência da Ousadia
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
            Resgatou a criatividade pura e a imprevisibilidade do futebol de rua brasileiro. Dribles desconcertantes que desafiam as convenções táticas e trazem magia ao gramado.
          </p>
        </div>

        {/* Entertainment */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left group border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#B89B5E]/20 p-8 rounded-2xl transition-all duration-500">
          <div className="w-12 h-12 bg-[#B89B5E]/10 rounded-xl flex items-center justify-center text-[#B89B5E] mb-6 group-hover:scale-110 transition-transform duration-300">
            <Sparkles size={20} />
          </div>
          <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-4">
            O Jogo como Arte
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
            Transformou o futebol em espetáculo e entretenimento global. A alegria de jogar com leveza, celebrar com danças contagiantes e transformar cada partida em um show único.
          </p>
        </div>

        {/* Inspiration */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left group border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#B89B5E]/20 p-8 rounded-2xl transition-all duration-500">
          <div className="w-12 h-12 bg-[#B89B5E]/10 rounded-xl flex items-center justify-center text-[#B89B5E] mb-6 group-hover:scale-110 transition-transform duration-300">
            <Heart size={20} />
          </div>
          <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-4">
            Inspiração de Milhões
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
            Da Baixada Santista para a aclamação mundial. Tornou-se o maior ícone e referência para gerações de jovens atletas que sonham em ousar, criar e deixar seu próprio legado.
          </p>
        </div>
      </div>
    </section>
  );
};
