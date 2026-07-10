import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const Cursor = () => {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverType, setHoverType] = useState<'normal' | 'interactive' | 'view' | 'none'>('none');

  useEffect(() => {
    // Check if device supports hover and cursor pointer events
    const checkDevice = () => {
      const hasHover = window.matchMedia('(hover: hover)').matches;
      setIsMobile(!hasHover);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    // Mouse coordinates
    const mouse = { x: -100, y: -100 };
    // Current animated coordinates
    const pos = { x: -100, y: -100 };
    
    // Magnetic target properties
    let magneticTarget: HTMLElement | null = null;

    // quickSetters for high performance animations
    const setOuterX = gsap.quickSetter(outerRef.current, 'x', 'px');
    const setOuterY = gsap.quickSetter(outerRef.current, 'y', 'px');
    const setInnerX = gsap.quickSetter(innerRef.current, 'x', 'px');
    const setInnerY = gsap.quickSetter(innerRef.current, 'y', 'px');

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('button, a, .interactive, [role="button"]') as HTMLElement | null;

      if (interactiveEl) {
        magneticTarget = interactiveEl;
        if (interactiveEl.classList.contains('view-trigger') || interactiveEl.closest('.view-trigger-parent')) {
          setHoverType('view');
        } else {
          setHoverType('interactive');
        }
      } else {
        magneticTarget = null;
        setHoverType('none');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);

    // Animation Loop
    const ticker = () => {
      // Interpolation speed (lag)
      // If magnet is active, snap faster, otherwise float smoothly
      const ease = magneticTarget ? 0.35 : 0.15;
      
      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Pull position towards element center with a magnetic blend (80% center, 20% mouse position)
        const targetX = centerX + (mouse.x - centerX) * 0.3;
        const targetY = centerY + (mouse.y - centerY) * 0.3;

        pos.x += (targetX - pos.x) * ease;
        pos.y += (targetY - pos.y) * ease;
        
        // Also apply a small magnetic shift on the actual target element for feedback!
        const shiftX = (mouse.x - centerX) * 0.25;
        const shiftY = (mouse.y - centerY) * 0.25;
        gsap.to(magneticTarget, {
          x: shiftX,
          y: shiftY,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        pos.x += (mouse.x - pos.x) * ease;
        pos.y += (mouse.y - pos.y) * ease;
      }

      setOuterX(pos.x);
      setOuterY(pos.y);
      setInnerX(mouse.x);
      setInnerY(mouse.y);

      // Clean up magnetic shift when moving off elements
      if (!magneticTarget) {
        const resetTargets = document.querySelectorAll('button, a, .interactive, [role="button"]');
        resetTargets.forEach((el) => {
          if ((el as any)._gsap?.x !== 0 || (el as any)._gsap?.y !== 0) {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
          }
        });
      }
    };

    gsap.ticker.add(ticker);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      gsap.ticker.remove(ticker);
    };
  }, [isMobile, isVisible]);

  if (isMobile || !isVisible) return null;

  // Decide classes based on hover state
  let outerClasses = "w-8 h-8 border border-[#B89B5E] bg-transparent opacity-80 shadow-[0_0_10px_rgba(184,155,94,0.2)]";
  let innerClasses = "w-1.5 h-1.5 bg-white opacity-100";

  if (hoverType === 'interactive') {
    outerClasses = "w-14 h-14 border border-[#B89B5E] bg-[#B89B5E]/5 opacity-100 shadow-[0_0_20px_rgba(184,155,94,0.5)]";
    innerClasses = "w-2 h-2 bg-[#B89B5E] opacity-100 scale-125";
  } else if (hoverType === 'view') {
    outerClasses = "w-20 h-20 border-0 bg-white opacity-100 shadow-[0_0_25px_rgba(255,255,255,0.4)]";
    innerClasses = "w-0 h-0 opacity-0";
  }

  return (
    <>
      {/* Outer Glow Ring */}
      <div 
        ref={outerRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[99999] transition-[width,height,background-color,border-color,box-shadow] duration-300 ease-out flex items-center justify-center ${outerClasses}`}
      >
        {hoverType === 'view' && (
          <span className="text-black text-[9px] font-black tracking-widest uppercase animate-fade-in select-none">
            VEJA
          </span>
        )}
      </div>

      {/* Inner Pin Dot */}
      <div 
        ref={innerRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[100000] mix-blend-difference transition-[width,height,background-color] duration-200 ease-out ${innerClasses}`}
      />
    </>
  );
};
