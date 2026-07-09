import type { CareerEra } from '../../data/career';
import { FlipNumber } from '../Common/FlipNumber';

interface EraSectionProps {
  era: CareerEra;
  isActive: boolean;
}

export const EraSection = ({ era, isActive }: EraSectionProps) => {
  const statsConfig = [
    { label: 'Games', value: era.stats.games, max: 250 },
    { label: 'Goals', value: era.stats.goals, max: 150 },
    { label: 'Assists', value: era.stats.assists, max: 100 },
  ];

  return (
    <div className="w-full max-w-[90rem] mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Text content (full-width on mobile, spans 7 columns on desktop) */}
        <div className="lg:col-span-7 text-left flex flex-col justify-center w-full">
          <h4 
            className={`text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-3 md:mb-6 transition-all duration-700 transform ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } ${era.theme.text}`}
          >
            {era.name}
          </h4>
          
          <h3 
            className={`text-2xl sm:text-4xl lg:text-7xl font-black uppercase tracking-tighter mb-4 md:mb-8 leading-[0.95] sm:leading-[0.9] transition-all duration-1000 transform ${
              isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            } ${era.theme.text}`}
          >
            {era.role}
          </h3>
          
          <p 
            className={`text-sm sm:text-base lg:text-xl font-light max-w-2xl leading-relaxed mb-6 md:mb-12 opacity-85 transition-all duration-[1200ms] ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            } ${era.theme.text}`}
          >
            {era.description}
          </p>

          {/* Stats Section */}
          <div className="space-y-4 md:space-y-6 max-w-xl">
            {statsConfig.map((stat, i) => {
              const progressWidth = Math.min((stat.value / stat.max) * 100, 100);
              
              return (
                <div key={i} className="interactive group">
                  <div className="flex justify-between items-end mb-1 md:mb-2">
                    <span className={`text-[9px] md:text-xs font-bold tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-300 ${era.theme.text}`}>
                      {stat.label}
                    </span>
                    <FlipNumber
                      value={isActive ? stat.value : 0}
                      className={`text-lg md:text-3xl font-black transition-transform duration-300 group-hover:scale-105 ${era.theme.textAccent}`}
                    />
                  </div>
                  <div className={`h-[2px] w-full ${era.id === 'santos' ? 'bg-black/10' : 'bg-white/10'} overflow-hidden rounded-full`}>
                    <div 
                      className={`h-full ${era.theme.accent} transition-all duration-[1800ms] ease-out`}
                      style={{ 
                        width: isActive ? `${progressWidth}%` : '0%',
                      }}
                    />
                  </div>
                </div>
              );
            })}
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
