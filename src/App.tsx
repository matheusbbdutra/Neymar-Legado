import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Layout/Navbar';
import { Cursor } from './components/Cursor/Cursor';
import { HeroSection } from './components/Hero/HeroSection';
import { BrandsSection } from './components/Brands/BrandsSection';
import { LegacyWords } from './components/Legacy/LegacyWords';
import { StickyTimeline } from './components/Timeline/StickyTimeline';
import { EndingCredit } from './components/Common/EndingCredit';
import { AudioController } from './components/Common/AudioController';
import { Loader } from './components/Common/Loader';
import { CaseStudy } from './components/Common/CaseStudy';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  };

  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <div className="min-h-screen text-white bg-[#050505] selection:bg-[#B89B5E] selection:text-black overflow-x-hidden relative">
      <Cursor />
      
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <AudioController />

      <CaseStudy isOpen={isCaseStudyOpen} onClose={() => setIsCaseStudyOpen(false)} />

      
      {/* Global Noise Overlay */}
      <div 
        className="fixed inset-0 z-[99] pointer-events-none opacity-[var(--noise-opacity)] mix-blend-overlay noise-bg" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` 
        }} 
      />

      <Navbar 
        onOpenCaseStudy={() => setIsCaseStudyOpen(true)} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />

      <HeroSection />

      <StickyTimeline />


      <BrandsSection />

      <LegacyWords />

      <EndingCredit />

      {/* FOOTER */}
      <footer className="bg-black py-16 border-t border-white/10 relative z-20 select-none">
        <div className="max-w-[90rem] mx-auto px-6 sm:px-12 md:px-20 lg:px-40 flex flex-col gap-10">
          
          {/* Top segment: Title and Credits */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-8 border-b border-white/5">
            <div>
              <p className="text-[#B89B5E] text-[10px] font-bold tracking-[0.4em] uppercase mb-2">
                Designed & Developed by
              </p>
              <h4 className="text-xl font-bold uppercase tracking-widest text-white">
                Matheus Dutra
              </h4>
            </div>
            
            {/* Tech tag list */}
            <div className="flex flex-wrap gap-3 font-mono text-[10px] text-gray-500">
              <span className="border border-white/10 px-3 py-1 rounded-full">React</span>
              <span className="border border-white/10 px-3 py-1 rounded-full">GSAP</span>
              <span className="border border-white/10 px-3 py-1 rounded-full">Web Audio</span>
              <span className="border border-white/10 px-3 py-1 rounded-full">Canvas</span>
              <span className="border border-white/10 px-3 py-1 rounded-full">Tailwind</span>
            </div>
          </div>

          {/* Bottom segment: Disclaimer and Update date */}
          <div className="flex flex-col lg:flex-row justify-between gap-6 text-xs text-gray-600 leading-relaxed font-light">
            <div className="max-w-2xl">
              <p className="mb-2">
                <strong>Legal Disclaimer:</strong> This is an independent concept project created for educational and portfolio purposes. It is not affiliated with Neymar Jr., NR Sports or any official organization.
              </p>
              <p>
                All photos, trademarks, and logos are property of their respective owners.
              </p>
            </div>
            <div className="lg:text-right shrink-0 flex flex-col justify-end">
              <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                Last updated
              </span>
              <span className="text-sm font-bold text-white tracking-wide mt-1">
                July 2026 Season
              </span>
            </div>
          </div>

          {/* Bastidores trigger */}
          <div className="text-center md:text-left">
            <button
              onClick={() => setIsCaseStudyOpen(true)}
              className="text-[10px] font-bold tracking-widest text-[#B89B5E] hover:text-white underline underline-offset-4 decoration-[#B89B5E]/40 hover:decoration-white interactive focus:outline-none"
            >
              LEIA O ESTUDO DE CASO TÉCNICO
            </button>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default App;
