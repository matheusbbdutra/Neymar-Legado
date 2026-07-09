import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { careerData } from '../../data/career';
import { EraSection } from './EraSection';
import { TimelineDots } from './TimelineDots';
import { EraCanvas } from './EraCanvas';
import { synthEngine } from '../../utils/synth';

gsap.registerPlugin(ScrollTrigger);

export const StickyTimeline = () => {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);

  const [activeEraIndex, setActiveEraIndex] = useState(0);
  const [barcaSubProgress, setBarcaSubProgress] = useState(0);

  const activeEra = careerData[activeEraIndex];

  // Play audio transition whenever active era changes
  useEffect(() => {
    synthEngine.playEraTransition(activeEraIndex);
  }, [activeEraIndex]);

  useGSAP(() => {
    if (!triggerRef.current || !stickyRef.current) return;


    ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: stickyRef.current,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // Unequal ranges to highlight Barcelona as the "Momento Auge"
        // Total track is 500vh:
        // Santos: 0% to 22%
        // Barcelona: 22% to 60% (38% of total scroll distance!)
        // PSG: 60% to 80%
        // Seleção: 80% to 100%
        let index = 0;
        if (progress < 0.22) {
          index = 0;
          setBarcaSubProgress(0);
        } else if (progress < 0.60) {
          index = 1;
          // Calculate normalized progress within Barcelona era
          const subProg = (progress - 0.22) / (0.60 - 0.22);
          setBarcaSubProgress(subProg);
        } else if (progress < 0.80) {
          index = 2;
          setBarcaSubProgress(0);
        } else {
          index = 3;
          setBarcaSubProgress(0);
        }

        setActiveEraIndex(index);
      }
    });
  }, { scope: triggerRef });

  // Apply visual scrub zoom to the canvas container and content wrapper during Barcelona era
  // When activeEraIndex is Barcelona (1), barcaSubProgress goes from 0 to 1
  // We can zoom canvas up to 1.35x and slightly enlarge content scale
  const canvasScale = activeEraIndex === 1 ? 1 + barcaSubProgress * 0.35 : 1;
  const canvasBlur = activeEraIndex === 1 ? barcaSubProgress * 4 : 0;
  
  // Parallax translation for title and description
  const contentScale = activeEraIndex === 1 ? 1 + Math.sin(barcaSubProgress * Math.PI) * 0.05 : 1;

  return (
    <div ref={triggerRef} className="relative w-full" style={{ height: '520vh' }}>
      
      {/* Sticky viewport content container */}
      <div 
        ref={stickyRef} 
        className="h-screen w-full sticky top-0 overflow-hidden flex items-center justify-center transition-colors duration-[1200ms] ease-in-out"
      >
        {/* Dynamic Background Gradient */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${activeEra.theme.bg} transition-colors duration-[1200ms] ease-in-out -z-20`}
        />

        {/* Abstract Blobs / Gradients */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-multiply transition-all duration-[1200ms] ease-in-out -z-10" 
          style={{ backgroundImage: activeEra.theme.gradientBlob }} 
        />
        
        {/* Fixed Silhouette shadows */}
        <div 
          className={`absolute right-0 top-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-black/5 blur-[120px] transition-all duration-1000 scale-150 -z-10 ${
            activeEraIndex === 1 ? 'bg-amber-500/5' : ''
          }`} 
        />

        {/* Canvas particles background container with GSAP-like dynamic zoom */}
        <div 
          ref={canvasContainerRef}
          className="absolute inset-0 w-full h-full -z-10 origin-center pointer-events-none"
          style={{ 
            transform: `scale(${canvasScale})`,
            filter: `blur(${canvasBlur}px)`
          }}
        >
          <EraCanvas era={activeEra} activeEraIndex={activeEraIndex} />
        </div>

        {/* Minimal Timeline indicator */}
        <TimelineDots eras={careerData} activeEraIndex={activeEraIndex} />

        {/* Main active Era Content */}
        <div 
          ref={contentWrapperRef}
          className="w-full flex items-center justify-center transition-all duration-500 origin-center"
          style={{
            transform: `scale(${contentScale})`
          }}
        >
          {careerData.map((era, index) => {
            const isActive = index === activeEraIndex;
            return (
              <div 
                key={era.id} 
                className={`absolute w-full left-0 transition-all duration-[1000ms] ease-in-out ${
                  isActive 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 translate-y-20 pointer-events-none'
                }`}
              >
                <EraSection era={era} isActive={isActive} />
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
