import { useState } from 'react';
import type { CareerEra } from '../../data/career';
import { FlipNumber } from '../Common/FlipNumber';
import { Info, HelpCircle } from 'lucide-react';

interface EraSectionProps {
  era: CareerEra;
  isActive: boolean;
}

export const EraSection = ({ era, isActive }: EraSectionProps) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeSourceIdx, setActiveSourceIdx] = useState<number | null>(null);

  return (
    <div className="w-full max-w-[90rem] mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Text content (full-width on mobile, spans 7 columns on desktop) */}
        <div className="lg:col-span-7 text-left flex flex-col justify-center w-full">
          <h4 
            className={`text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-2 md:mb-4 transition-all duration-700 transform ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } ${era.theme.text}`}
          >
            {era.name} — <span className="opacity-60">{era.eraTitle}</span>
          </h4>
          
          <h3 
            className={`text-2xl sm:text-4xl lg:text-7xl font-black uppercase tracking-tighter mb-3 md:mb-6 leading-[0.95] sm:leading-[0.9] transition-all duration-1000 transform ${
              isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            } ${era.theme.text}`}
          >
            {era.role}
          </h3>
          
          <p 
            className={`text-sm sm:text-base lg:text-lg font-light max-w-2xl leading-relaxed mb-6 md:mb-8 opacity-80 transition-all duration-[1200ms] ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            } ${era.theme.text}`}
          >
            {era.description}
          </p>

          {/* Stats Section */}
          <div className="space-y-4 md:space-y-6 max-w-xl relative">
            {era.statsDetails.map((stat, i) => {
              const progressWidth = Math.min((stat.value / stat.max) * 100, 100);
              const isHovered = hoveredIdx === i;
              const isPopupOpen = activeSourceIdx === i;
              
              return (
                <div 
                  key={i} 
                  className="interactive group relative"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => {
                    setHoveredIdx(null);
                    setActiveSourceIdx(null);
                  }}
                >
                  <div className="flex justify-between items-end mb-1 md:mb-2 relative">
                    <div className="flex flex-col">
                      <span className={`text-[9px] md:text-xs font-bold tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-300 ${era.theme.text}`}>
                        {isHovered ? stat.hoverLabel : stat.label}
                      </span>
                      {stat.context && (
                        <span className="text-[9px] md:text-[10px] font-mono tracking-widest text-[#B89B5E] mt-0.5 opacity-80">
                          {stat.context}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSourceIdx(isPopupOpen ? null : i);
                        }}
                        className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none ${
                          era.id === 'santos' ? 'text-black/40 hover:text-black' : 'text-white/40 hover:text-white'
                        }`}
                        title="Ver fontes dos dados"
                        aria-label={`Ver fontes para ${stat.label}`}
                      >
                        <HelpCircle size={14} />
                      </button>
                      <FlipNumber
                        value={isActive ? stat.value : 0}
                        className={`text-lg md:text-3xl font-black transition-transform duration-300 group-hover:scale-105 ${era.theme.textAccent}`}
                      />
                    </div>
                  </div>

                  <div className={`h-[2px] w-full ${era.id === 'santos' ? 'bg-black/10' : 'bg-white/10'} overflow-hidden rounded-full`}>
                    <div 
                      className={`h-full ${era.theme.accent} transition-all duration-[1800ms] ease-out`}
                      style={{ 
                        width: isActive ? `${progressWidth}%` : '0%',
                      }}
                    />
                  </div>

                  {/* Tooltip explanation on hover / click popup */}
                  {(isHovered || isPopupOpen) && (
                    <div 
                      className={`absolute bottom-full left-0 mb-3 w-72 p-4 rounded-xl border z-50 backdrop-blur-xl shadow-2xl transition-all duration-300 transform translate-y-0 scale-100 animate-fade-in
                        ${era.id === 'santos' 
                          ? 'bg-white/95 border-black/10 text-black shadow-black/10' 
                          : 'bg-black/95 border-white/10 text-white shadow-black/80'
                        }`}
                    >
                      <div className="text-[10px] font-bold tracking-widest text-[#B89B5E] uppercase mb-1 flex items-center gap-1.5">
                        <Info size={10} />
                        <span>{stat.hoverLabel}</span>
                      </div>
                      <p className="text-xs font-light leading-relaxed mb-2 opacity-85">
                        {stat.tooltip}
                      </p>
                      <div className="pt-2 border-t border-dashed border-gray-600/30 text-[9px] font-mono opacity-60 flex flex-wrap gap-x-2 gap-y-0.5">
                        <span className="font-bold text-[#B89B5E]">FONTES:</span>
                        {era.sources.map((src, sIdx) => (
                          <span key={sIdx} className="underline">{src}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <div className={`pt-4 text-[9px] font-mono tracking-widest opacity-40 select-none ${era.theme.text}`}>
              * Estatísticas oficiais nas contas da FIFA e parceiros, atualizadas em Julho de 2026.
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Editorial Photo (hidden on mobile/tablet, visible on desktop) */}
        <div className="lg:col-span-5 relative items-center justify-center w-full hidden lg:flex">
          <div 
            className={`relative overflow-hidden w-full aspect-[4/5] border border-white/10 rounded-xl transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) transform ${
              isActive ? 'opacity-100 translate-y-0 scale-100 rotate-0' : 'opacity-0 translate-y-16 scale-95 rotate-1'
            }`}
          >
            <img 
              src={era.image} 
              alt={`${era.name} - ${era.role}`} 
              className={`w-full h-full object-cover transition-all duration-[1500ms] ease-out scale-105 hover:scale-100 
                ${era.id === 'santos' 
                  ? 'grayscale contrast-125' 
                  : 'grayscale contrast-115 mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal'
                }`} 
            />
            
            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            
            {/* Corner design brackets */}
            <div className="absolute top-4 left-4 w-4 h-[1px] bg-white/30" />
            <div className="absolute top-4 left-4 w-[1px] h-4 bg-white/30" />
            <div className="absolute bottom-4 right-4 w-4 h-[1px] bg-white/30" />
            <div className="absolute bottom-4 right-4 w-[1px] h-4 bg-white/30" />
          </div>
        </div>

      </div>
    </div>
  );
};
