import { useEffect, useState } from 'react';

interface FlipNumberProps {
  value: number;
  className?: string;
}

export const FlipNumber = ({ value, className = "" }: FlipNumberProps) => {
  const [digits, setDigits] = useState<string[]>([]);

  useEffect(() => {
    // Convert number to string and split into digits array
    // Pad numbers if we want to maintain a consistent digit length, or just map them dynamically
    const digitString = value.toString();
    setDigits(digitString.split(''));
  }, [value]);

  return (
    <div className={`flex overflow-hidden h-[1.2em] leading-none ${className}`}>
      {digits.map((digit, index) => {
        // If it's not a digit (e.g., comma, dot), render it statically
        const isNum = !isNaN(parseInt(digit));
        
        if (!isNum) {
          return (
            <span key={index} className="inline-block select-none">
              {digit}
            </span>
          );
        }

        const digitVal = parseInt(digit);

        return (
          <div 
            key={index} 
            className="relative w-[0.6em] h-[1.2em] overflow-hidden select-none"
          >
            {/* Vertical column of digits 0 to 9 */}
            <div 
              className="absolute left-0 top-0 flex flex-col transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1)"
              style={{ 
                transform: `translateY(-${digitVal * 10}%)`,
                height: '1000%' // 10 items of 100% height
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <span 
                  key={n} 
                  className="h-[1.2em] flex items-center justify-center font-inherit select-none"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
