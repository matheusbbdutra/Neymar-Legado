import { useState, useEffect } from 'react';
import { FlipNumber } from '../Common/FlipNumber';

interface HeroCounterProps {
  phase: number;
}

export const HeroCounter = ({ phase }: HeroCounterProps) => {
  const [goals, setGoals] = useState(0);

  useEffect(() => {
    if (phase === 5) {
      setGoals(792);
    } else {
      setGoals(0);
    }
  }, [phase]);

  return (
    <div 
      className={`absolute bottom-28 md:bottom-32 flex flex-col items-center transition-all duration-[1200ms] ease-out transform ${
        phase === 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } z-10`}
    >
      <FlipNumber 
        value={goals}
        className="text-[5.5rem] md:text-[7.5rem] font-light tracking-tighter text-[#B89B5E]"
      />
      <span className="text-[10px] md:text-xs tracking-[0.6em] text-gray-500 uppercase mt-2 md:mt-4 font-bold select-none">
        Career Goals
      </span>
    </div>
  );
};
