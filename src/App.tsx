import { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Layout/Navbar';
import { Cursor } from './components/Cursor/Cursor';
import { HeroSection } from './components/Hero/HeroSection';
import { BrandsSection } from './components/Brands/BrandsSection';
import { LegacyWords } from './components/Legacy/LegacyWords';
import { StickyTimeline } from './components/Timeline/StickyTimeline';
import { EndingCredit } from './components/Common/EndingCredit';
import { AudioController } from './components/Common/AudioController';

function App() {
  // Initialize smooth scrolling with Lenis
  useEffect(() => {
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
  }, []);

  return (
    <div className="min-h-screen text-white bg-[#050505] selection:bg-[#B89B5E] selection:text-black overflow-x-hidden relative">
      <Cursor />
      <AudioController />

      
      {/* Global Noise Overlay */}
      <div 
        className="fixed inset-0 z-[99] pointer-events-none opacity-[0.03] mix-blend-overlay pointer-events-none noise-bg" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` 
        }} 
      />

      <Navbar />

      <HeroSection />

      <StickyTimeline />


      <BrandsSection />

      <LegacyWords />

      <EndingCredit />

      {/* FOOTER */}
      <footer className="bg-black py-12 border-t border-white/10 relative z-20">
        <div className="max-w-[90rem] mx-auto px-6 sm:px-12 md:px-20 lg:px-40 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left select-none">
          <div className="text-xs text-gray-500 tracking-widest uppercase">
            Reimagining Neymar Jr's Digital Experience.
          </div>
          <div className="text-xs text-gray-600 tracking-widest uppercase">
            CONCEPTUAL PROJECT • PORTFOLIO 2026
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
