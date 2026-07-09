import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { brandsData } from '../../data/brands';

export const BrandsSection = () => {
  const [activeBrandIndex, setActiveBrandIndex] = useState<number | null>(null);

  const handleBrandToggle = (idx: number) => {
    setActiveBrandIndex(activeBrandIndex === idx ? null : idx);
  };

  return (
    <section className="min-h-screen bg-[#050505] text-white py-20 md:py-32 relative z-20 flex flex-col justify-center w-full">
      <div className="max-w-[90rem] mx-auto px-6 sm:px-12 md:px-20 lg:px-40 w-full text-left">
        <p className="text-[#B89B5E] text-xs font-bold tracking-[0.4em] uppercase mb-12 md:mb-16 select-none">
          Ecosystem
        </p>
        
        <div className="flex flex-col">
          {brandsData.map((brand, idx) => {
            const isOpen = activeBrandIndex === idx;
            
            return (
              <div 
                key={idx} 
                onClick={() => handleBrandToggle(idx)}
                className="group border-b border-white/10 py-10 md:py-12 interactive hover:border-[#B89B5E] transition-colors duration-500 cursor-none select-none"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h3 
                    className={`text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter transition-all duration-500 transform select-none
                      ${isOpen 
                        ? 'text-white translate-x-4 md:translate-x-8' 
                        : 'text-white/30 group-hover:text-white group-hover:translate-x-4 md:group-hover:translate-x-8'
                      }`}
                  >
                    {brand.name}
                  </h3>
                  <span 
                    className={`text-xs md:text-sm font-mono tracking-widest text-[#B89B5E] transition-opacity duration-500 select-none
                      ${isOpen 
                        ? 'opacity-100' 
                        : 'opacity-0 group-hover:opacity-100'
                      }`}
                  >
                    {brand.info}
                  </span>
                </div>
                
                {/* Drawer list of key drops / collabs */}
                <div 
                  className={`overflow-hidden transition-all duration-[800ms] ease-in-out pl-4 md:pl-8
                    ${isOpen 
                      ? 'max-h-40 mt-6 md:mt-8' 
                      : 'max-h-0 mt-0 group-hover:max-h-40 group-hover:mt-6 md:group-hover:mt-8'
                    }`}
                >
                  <div className="flex flex-wrap gap-6 md:gap-12 pb-4">
                    {brand.drops.map((drop, i) => (
                      <div 
                        key={i} 
                        className="text-gray-500 text-xs md:text-sm tracking-widest uppercase flex items-center gap-2 hover:text-[#B89B5E] transition-colors select-none"
                      >
                        <ArrowRight size={12} className="shrink-0" />
                        <span>{drop}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
