interface TrailerSequenceProps {
  phase: number;
}

export const TrailerSequence = ({ phase }: TrailerSequenceProps) => {
  return (
    <div className="absolute flex items-center justify-center inset-0 pointer-events-none z-20">
      <h2 
        className={`absolute text-2xl sm:text-3xl md:text-5xl font-light tracking-[0.2em] text-white transition-all duration-1000 transform ${
          phase === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      >
        One Name.
      </h2>
      <h2 
        className={`absolute text-2xl sm:text-3xl md:text-5xl font-light tracking-[0.2em] text-[#B89B5E] transition-all duration-1000 transform ${
          phase === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      >
        792 Goals.
      </h2>
      <h2 
        className={`absolute text-2xl sm:text-3xl md:text-5xl font-light tracking-[0.2em] text-white transition-all duration-1000 transform ${
          phase === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      >
        Countless Memories.
      </h2>
    </div>
  );
};
