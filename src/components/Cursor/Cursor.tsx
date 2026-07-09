import { useState, useEffect } from 'react';

export const Cursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if it is a touch device or device with no hover support
    const checkDevice = () => {
      const hasHover = window.matchMedia('(hover: hover)').matches;
      setIsMobile(!hasHover);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .interactive, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <div 
      className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference transition-all duration-300 ease-out flex items-center justify-center ${
        isHovering ? 'w-20 h-20 bg-white scale-100' : 'w-4 h-4 bg-white scale-100'
      }`}
      style={{ 
        transform: `translate3d(${position.x - (isHovering ? 40 : 8)}px, ${position.y - (isHovering ? 40 : 8)}px, 0)` 
      }}
    >
      {isHovering && (
        <span className="text-black text-[10px] font-black tracking-widest uppercase">
          View
        </span>
      )}
    </div>
  );
};
