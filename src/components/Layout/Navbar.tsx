import { Sun, Moon, Database } from 'lucide-react';

interface NavbarProps {
  onOpenCaseStudy: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar = ({ onOpenCaseStudy, theme, toggleTheme }: NavbarProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed w-full z-50 flex justify-between items-center px-6 sm:px-12 py-6 mix-blend-difference pointer-events-none">
      {/* Brand logo (pointer-events-auto to make clickable) */}
      <button 
        onClick={scrollToTop}
        className="text-2xl font-black tracking-[0.2em] text-white select-none pointer-events-auto interactive focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89B5E] rounded-md px-2"
        aria-label="Ir para o topo"
      >
        NJR
      </button>

      {/* Middle Label */}
      <div className="text-[10px] font-bold tracking-[0.4em] text-white uppercase opacity-40 hidden lg:block select-none">
        Documentary Experience
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4 sm:gap-6 pointer-events-auto">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 text-white hover:text-[#B89B5E] transition-colors interactive focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89B5E] rounded-full"
          title={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
          aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Case Study Toggle Button */}
        <button
          onClick={onOpenCaseStudy}
          className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white hover:text-[#B89B5E] border border-white/15 hover:border-[#B89B5E] px-4 py-2 rounded-full bg-black/40 backdrop-blur-md interactive transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89B5E]"
          title="Ver estudo de caso técnico"
          aria-label="Abrir estudo de caso técnico"
        >
          <Database size={10} />
          <span className="hidden sm:inline">BASTIDORES</span>
        </button>
      </div>
    </nav>
  );
};
