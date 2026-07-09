interface HeroTitleProps {
  text: string;
  showCursor: boolean;
  pulseCursor: boolean;
  phase: number;
}

export const HeroTitle = ({ text, showCursor, pulseCursor, phase }: HeroTitleProps) => {
  return (
    <div 
      className={`transition-all duration-1000 transform ${
        phase >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
      } z-10 select-none`}
    >
      <h1 className="text-[12vw] md:text-[14vw] font-black uppercase tracking-tighter leading-none text-white flex items-center justify-center">
        {text}
        {showCursor && (
          <span 
            className={`inline-block w-[1.5vw] h-[10vw] bg-[#B89B5E] ml-2 ${
              pulseCursor ? 'animate-pulse opacity-50' : 'opacity-100'
            }`}
          />
        )}
      </h1>
    </div>
  );
};
