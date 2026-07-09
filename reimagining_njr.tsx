import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowRight, Instagram, Twitter, Youtube, ChevronDown } from 'lucide-react';

/* ==========================================
   📂 DATA (/data/content.js)
   ========================================== */
const careerData = [
  {
    id: 'santos',
    name: 'SANTOS FC',
    period: '2009 - 2013',
    role: 'O Nascimento do Gênio',
    description: 'A Vila Belmiro testemunhou o surgimento de um talento geracional. Dribles desconcertantes, a ousadia natural e a conquista da América que o colocou no radar global.',
    stats: { games: 225, goals: 136, assists: 64 },
    theme: {
      bg: 'from-[#e0e0e0] via-[#ffffff] to-[#d4d4d4]',
      text: 'text-black',
      accent: 'bg-black',
      textAccent: 'text-black',
      gradientBlob: 'radial-gradient(circle at 80% 50%, rgba(0,0,0,0.08) 0%, transparent 60%)'
    }
  },
  {
    id: 'barcelona',
    name: 'FC BARCELONA',
    period: '2013 - 2017',
    role: 'A Consagração Européia',
    description: 'Parte do lendário MSN. No Camp Nou, evoluiu para a realeza do futebol mundial, culminando no topo da Europa em uma noite mágica em Berlim.',
    stats: { games: 186, goals: 105, assists: 76 },
    theme: {
      bg: 'from-[#004D98] via-[#111827] to-[#A50044]',
      text: 'text-white',
      accent: 'bg-[#DB0030]',
      textAccent: 'text-[#FDEC00]',
      gradientBlob: 'radial-gradient(circle at 20% 60%, rgba(165,0,68,0.4) 0%, transparent 60%)'
    }
  },
  {
    id: 'psg',
    name: 'PARIS SG',
    period: '2017 - 2023',
    role: 'A Estrela Global',
    description: 'A capital francesa sob seus pés. Assumiu a 10, quebrou recordes, redefiniu o mercado e levou Paris ao seu limite histórico na Champions League.',
    stats: { games: 173, goals: 118, assists: 77 },
    theme: {
      bg: 'from-[#001c3c] via-[#000a18] to-[#001224]',
      text: 'text-white',
      accent: 'bg-[#DA291C]',
      textAccent: 'text-[#CEAB5D]',
      gradientBlob: 'radial-gradient(circle at 70% 30%, rgba(218,41,28,0.15) 0%, transparent 60%)'
    }
  },
  {
    id: 'brasil',
    name: 'SELEÇÃO',
    period: '2010 - PRESENTE',
    role: 'A Coroa de Ouro',
    description: 'O peso da camisa amarela transformado em arte. Superou Pelé em números, carregou a esperança de uma nação e conquistou o inédito Ouro Olímpico.',
    stats: { games: 128, goals: 79, assists: 59 },
    theme: {
      bg: 'from-[#009B3A] via-[#002710] to-[#FEDF00]',
      text: 'text-white',
      accent: 'bg-[#FEDF00]',
      textAccent: 'text-[#FEDF00]',
      gradientBlob: 'radial-gradient(circle at 50% 50%, rgba(254,223,0,0.2) 0%, transparent 70%)'
    }
  }
];

const brandsData = [
  { id: 'puma', name: 'PUMA', info: '2020 - LONG TERM', drops: ['The King Returns', 'Instituto Collection', 'Future Z Drop'] },
  { id: 'redbull', name: 'RED BULL', info: 'GLOBAL PARTNER', drops: ['Neymar Jr\'s Five', 'Out of the Box Series'] },
  { id: 'pokerstars', name: 'POKERSTARS', info: 'CULTURAL AMBASSADOR', drops: ['Mindset Campaigns', 'Global Tournaments'] }
];

/* ==========================================
   📂 HOOKS (/hooks)
   ========================================== */
const useCountUp = (end, duration = 2000, startAnimating = true) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startAnimating) return;
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, startAnimating]);
  return count;
};

const useReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);
  return [ref, isVisible];
};

/* ==========================================
   📂 COMPONENTS (/components)
   ========================================== */
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, .interactive')) setIsHovering(true);
      else setIsHovering(false);
    };
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference transition-transform duration-300 ease-out flex items-center justify-center ${isHovering ? 'w-20 h-20 bg-white scale-100' : 'w-4 h-4 bg-white scale-100'}`}
      style={{ transform: `translate3d(${position.x - (isHovering ? 40 : 8)}px, ${position.y - (isHovering ? 40 : 8)}px, 0)` }}
    >
      {isHovering && <span className="text-black text-[10px] font-black tracking-widest uppercase">View</span>}
    </div>
  );
};

const HeroTrailer = () => {
  const [phase, setPhase] = useState(0);
  const [heroText, setHeroText] = useState("");
  const fullText = "NEYMAR";

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1800), // One Name
      setTimeout(() => setPhase(2), 3600), // 792 Goals
      setTimeout(() => setPhase(3), 5400), // Countless Memories
      setTimeout(() => setPhase(4), 7200), // Start Typing
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase === 4) {
      if (heroText.length < fullText.length) {
        setTimeout(() => setHeroText(fullText.slice(0, heroText.length + 1)), 150);
      } else {
        setTimeout(() => setPhase(5), 500); // Complete
      }
    }
  }, [heroText, phase]);

  const totalGoals = useCountUp(792, 2500, phase === 5);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      {/* Abstract dark vibe */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        
        {/* Trailer Text Sequence */}
        <div className="absolute flex items-center justify-center inset-0 pointer-events-none">
          <h2 className={`text-3xl md:text-5xl font-light tracking-widest text-white transition-all duration-1000 ${phase === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
            One Name.
          </h2>
          <h2 className={`absolute text-3xl md:text-5xl font-light tracking-widest text-[#B89B5E] transition-all duration-1000 ${phase === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
            792 Goals.
          </h2>
          <h2 className={`absolute text-3xl md:text-5xl font-light tracking-widest text-white transition-all duration-1000 ${phase === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
            Countless Memories.
          </h2>
        </div>

        {/* NEYMAR Typography */}
        <div className={`transition-all duration-1000 transform ${phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="text-[14vw] md:text-[18rem] font-black uppercase tracking-tighter leading-none text-white select-none mix-blend-difference">
            {heroText}
            <span className={`inline-block w-[1.5vw] h-[10vw] bg-[#B89B5E] ml-2 ${phase === 5 ? 'animate-pulse opacity-50' : 'opacity-100'}`}></span>
          </h1>
        </div>
        
        {/* Counter */}
        <div className={`absolute bottom-32 flex flex-col items-center transition-all duration-1000 ${phase === 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-[5rem] md:text-[7rem] font-light tracking-tighter leading-none text-[#B89B5E]">
            {totalGoals}
          </span>
          <span className="text-xs tracking-[0.6em] text-gray-500 uppercase mt-4 font-bold">
            Career Goals
          </span>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={`absolute bottom-8 animate-bounce text-gray-700 transition-opacity duration-1000 ${phase === 5 ? 'opacity-100' : 'opacity-0'}`}>
        <ChevronDown size={24} />
      </div>
    </section>
  );
};

const LegacySection = () => {
  const [ref, isVisible] = useReveal();
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["THE LAST BRAZILIAN GENIUS.", "JOY.", "CREATIVITY.", "COURAGE.", "NEYMAR."];

  useEffect(() => {
    if (isVisible && wordIndex < words.length - 1) {
      const timer = setTimeout(() => {
        setWordIndex(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, wordIndex]);

  return (
    <section ref={ref} className="h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}></div>
      <div className="text-center relative z-10 px-4">
        {words.map((word, idx) => (
          <h2 
            key={idx}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-4xl md:text-8xl font-black uppercase tracking-tighter transition-all duration-1000
              ${idx === wordIndex ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-sm'}
              ${idx === words.length - 1 ? 'text-[#B89B5E]' : 'text-white'}
            `}
          >
            {word}
          </h2>
        ))}
      </div>
    </section>
  );
};

/* ==========================================
   📂 MAIN APP (pages/index.js)
   ========================================== */
export default function App() {
  const [activeEraIndex, setActiveEraIndex] = useState(0);
  const activeEra = careerData[activeEraIndex];
  
  // Refs for Scroll-Driven Timeline
  const eraRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Middle of screen
      eraRefs.forEach((ref, index) => {
        if (ref.current) {
          const { top, bottom } = ref.current.getBoundingClientRect();
          const absoluteTop = top + window.scrollY;
          const absoluteBottom = bottom + window.scrollY;
          
          if (scrollPosition >= absoluteTop && scrollPosition < absoluteBottom) {
            setActiveEraIndex(index);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen font-sans selection:bg-[#B89B5E] selection:text-black overflow-x-hidden transition-colors duration-[1500ms] ease-in-out cursor-none
      ${activeEraIndex === 0 ? 'bg-[#050505]' : ''} 
    `}>
      <CustomCursor />

      {/* Global Noise Texture */}
      <div className="fixed inset-0 z-[999] pointer-events-none opacity-[0.04] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Navbar Minimalista */}
      <nav className="fixed w-full z-50 flex justify-between items-center px-8 py-8 mix-blend-difference pointer-events-none">
        <div className="text-2xl font-black tracking-[0.2em] text-white">NJR</div>
        <div className="text-[10px] font-bold tracking-[0.4em] text-white uppercase opacity-50 hidden md:block">
          Documentary Experience
        </div>
      </nav>

      <HeroTrailer />

      {/* TIMELINE DOCUMENTÁRIO (SCROLL DRIVEN) */}
      <div className="relative">
        
        {/* Background Visuals Fixos (Mudam com activeEra) */}
        <div className={`sticky top-0 h-screen w-full transition-colors duration-[1500ms] ease-out bg-gradient-to-br ${activeEra.theme.bg} overflow-hidden -z-10 flex items-center`}>
          {/* Abstract Silhouettes/Blobs */}
          <div className="absolute inset-0 opacity-50 mix-blend-multiply transition-all duration-[2000ms]" style={{ backgroundImage: activeEra.theme.gradientBlob }}></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-black/5 blur-[100px] transition-all duration-1000 scale-150"></div>
          
          {/* Timeline UI (Esquerda) */}
          <div className="absolute left-8 md:left-20 top-1/2 -translate-y-1/2 flex flex-col gap-12 z-10">
            {careerData.map((era, idx) => (
              <div key={idx} className="flex items-center gap-6">
                <div className="relative flex items-center justify-center w-8 h-8">
                  {idx === activeEraIndex && <div className="absolute inset-0 rounded-full border border-current opacity-50 animate-ping"></div>}
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${idx === activeEraIndex ? `scale-150 ${activeEra.theme.textAccent}` : 'bg-current opacity-20'}`}></div>
                </div>
                <span className={`text-xs font-bold tracking-[0.3em] transition-all duration-500 ${idx === activeEraIndex ? 'opacity-100 translate-x-2' : 'opacity-0 -translate-x-4'}`}>
                  {era.period.split(' - ')[0]}
                </span>
              </div>
            ))}
          </div>

          {/* Conteúdo Ativo (Centro/Direita) */}
          <div className="w-full max-w-[90rem] mx-auto px-20 md:px-40 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-start-4 lg:col-span-8">
                
                <h4 className={`text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-6 transition-all duration-700 transform ${activeEra.theme.text}`}>
                  {activeEra.name}
                </h4>
                
                <h3 className={`text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9] transition-all duration-1000 transform ${activeEra.theme.text}`}>
                  {activeEra.role}
                </h3>
                
                <p className={`text-xl md:text-3xl font-light max-w-3xl leading-snug mb-16 opacity-80 transition-all duration-[1200ms] ${activeEra.theme.text}`}>
                  {activeEra.description}
                </p>

                {/* Estatísticas Animadas */}
                <div className="space-y-12 max-w-2xl">
                  <div className="interactive">
                    <div className="flex justify-between items-end mb-3">
                      <span className={`text-xs font-bold tracking-[0.3em] uppercase ${activeEra.theme.text}`}>Goals</span>
                      <span className={`text-4xl font-black ${activeEra.theme.textAccent}`}>{activeEra.stats.goals}</span>
                    </div>
                    <div className="h-[2px] w-full bg-black/10 overflow-hidden">
                      <div 
                        className={`h-full ${activeEra.theme.accent} transition-all duration-[1500ms] ease-out`}
                        style={{ width: `${(activeEra.stats.goals / 150) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Áreas de Trigger Invisíveis para o Scroll Spy */}
        <div className="absolute top-0 w-full" style={{ height: `${careerData.length * 100}vh` }}>
          {careerData.map((_, idx) => (
            <div key={idx} ref={eraRefs[idx]} className="h-screen w-full"></div>
          ))}
        </div>

      </div>

      {/* MARCAS - EDITORIAL STYLE */}
      <section className="min-h-screen bg-[#050505] text-white py-32 relative z-20 flex flex-col justify-center">
        <div className="max-w-[90rem] mx-auto px-8 w-full">
          <p className="text-[#B89B5E] text-xs font-bold tracking-[0.4em] uppercase mb-16">Ecosystem</p>
          
          <div className="flex flex-col">
            {brandsData.map((brand, idx) => (
              <div key={idx} className="group border-b border-white/10 py-12 interactive hover:border-[#B89B5E] transition-colors duration-500 cursor-none">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white/30 group-hover:text-white transition-all duration-500 transform group-hover:translate-x-8">
                    {brand.name}
                  </h3>
                  <span className="text-sm font-mono tracking-widest text-[#B89B5E] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {brand.info}
                  </span>
                </div>
                
                {/* Gaveta de Drops (Microinteração) */}
                <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-[800ms] ease-in-out pl-8 mt-0 group-hover:mt-8">
                  <div className="flex gap-12">
                    {brand.drops.map((drop, i) => (
                      <div key={i} className="text-gray-500 text-sm tracking-widest uppercase flex items-center gap-2 hover:text-[#B89B5E] transition-colors">
                        <ArrowRight size={14} /> {drop}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LegacySection />

      {/* FOOTER */}
      <footer className="bg-black py-12 border-t border-white/10 relative z-20">
        <div className="max-w-[90rem] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-gray-600 tracking-widest uppercase">
            Reimagining Neymar Jr's Digital Experience.
          </div>
          <div className="text-xs text-gray-700 tracking-widest">
            CONCEPTUAL PROJECT • PORTFOLIO 2026
          </div>
        </div>
      </footer>
    </div>
  );
}