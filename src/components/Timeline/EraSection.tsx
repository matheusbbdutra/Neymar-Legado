import type { CareerEra } from '../../data/career';
import { FlipNumber } from '../Common/FlipNumber';

interface EraSectionProps {
  era: CareerEra;
  isActive: boolean;
}

export const EraSection = ({ era, isActive }: EraSectionProps) => {
  // Let's normalize progress bar values based on realistic maximums:
  // Goals max ~150, Games max ~250, Assists max ~100
  const statsConfig = [
    { label: 'Games', value: era.stats.games, max: 250 },
    { label: 'Goals', value: era.stats.goals, max: 150 },
    { label: 'Assists', value: era.stats.assists, max: 100 },
  ];

  return (
    <div className="w-full max-w-[90rem] mx-auto px-6 sm:px-12 md:px-20 lg:px-40 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-start-4 lg:col-span-8 text-left">
          
          <h4 
            className={`text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-4 md:mb-6 transition-all duration-700 transform ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } ${era.theme.text}`}
          >
            {era.name}
          </h4>
          
          <h3 
            className={`text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-[0.9] transition-all duration-1000 transform ${
              isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            } ${era.theme.text}`}
          >
            {era.role}
          </h3>
          
          <p 
            className={`text-lg sm:text-xl md:text-2xl font-light max-w-3xl leading-relaxed mb-10 md:mb-14 opacity-80 transition-all duration-[1200ms] ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            } ${era.theme.text}`}
          >
            {era.description}
          </p>

          {/* Stats Section with progress bars */}
          <div className="space-y-6 md:space-y-8 max-w-xl">
            {statsConfig.map((stat, i) => {
              const progressWidth = Math.min((stat.value / stat.max) * 100, 100);
              
              return (
                <div key={i} className="interactive group">
                  <div className="flex justify-between items-end mb-2">
                    <span className={`text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-300 ${era.theme.text}`}>
                      {stat.label}
                    </span>
                    <FlipNumber
                      value={isActive ? stat.value : 0}
                      className={`text-2xl md:text-3xl font-black transition-transform duration-300 group-hover:scale-105 ${era.theme.textAccent}`}
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
      </div>
    </div>
  );
};
