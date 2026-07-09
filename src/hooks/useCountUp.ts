import { useState, useEffect } from 'react';

export const useCountUp = (end: number, duration: number = 2000, startAnimating: boolean = true): number => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimating) {
      setCount(0);
      return;
    }
    
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Exponential ease-out
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration, startAnimating]);

  return count;
};
