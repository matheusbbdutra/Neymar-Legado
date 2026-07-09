import type { CareerEra } from '../../data/career';

interface TimelineDotsProps {
  eras: CareerEra[];
  activeEraIndex: number;
}

export const TimelineDots = ({ eras, activeEraIndex }: TimelineDotsProps) => {
  // Dynamically extract start years from career data and append infinity (∞) for Legacy
  const timelineYears = eras.map((era) => ({
    year: era.period.split(' - ')[0],
    label: era.name,
  }));
  timelineYears.push({ year: '∞', label: 'Legacy' });

  return (
    <div className="absolute left-6 sm:left-12 md:left-20 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-30 select-none mix-blend-difference hidden md:flex">
      {timelineYears.map((item, idx) => {
        const isActive = idx === activeEraIndex;
        // Wait, activeEraIndex is 0 to 3 for Santos, Barca, PSG, Brasil. If index is Brasil, the next index is Legacy (idx = 4).
        
        return (
          <div key={idx} className="flex flex-col items-center gap-4">
            {/* Year / Infinity sign */}
            <span 
              className={`text-xs font-mono font-bold tracking-widest transition-all duration-500 ${
                isActive 
                  ? 'text-[#B89B5E] scale-125 opacity-100' 
                  : 'text-white/20 scale-100 opacity-60'
              }`}
            >
              {item.year}
            </span>

            {/* Connecting Arrow */}
            {idx < timelineYears.length - 1 && (
              <span 
                className={`text-[10px] leading-none transition-all duration-500 font-light ${
                  activeEraIndex === idx 
                    ? 'text-[#B89B5E] opacity-100 translate-y-1' 
                    : 'text-white/10 opacity-30 translate-y-0'
                }`}
              >
                ↓
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
