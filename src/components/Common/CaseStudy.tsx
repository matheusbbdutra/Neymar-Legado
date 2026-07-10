import { X, Code, Palette, Zap, ShieldAlert } from 'lucide-react';

interface CaseStudyProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudy = ({ isOpen, onClose }: CaseStudyProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050505]/95 backdrop-blur-xl text-white flex items-center justify-center animate-fade-in p-4 sm:p-8 select-none">
      {/* Background soft glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,155,94,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative w-full max-w-5xl bg-black/60 border border-white/10 rounded-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto flex flex-col custom-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-white/10 pb-6 mb-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter text-[#B89B5E]">
              Behind the Experience
            </h2>
            <p className="text-xs sm:text-sm font-mono tracking-widest text-gray-500 uppercase mt-1">
              Ficha Técnica & Decisões de Engenharia
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-[#B89B5E] hover:bg-white/5 transition-all interactive focus:outline-none"
            aria-label="Fechar Estudo de Caso"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Column 1: Tech Stack & Architecture */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#B89B5E]/10 rounded-xl text-[#B89B5E] shrink-0">
                <Code size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-2">
                  Arquitetura & Tecnologias
                </h3>
                <ul className="text-xs sm:text-sm text-gray-400 font-light space-y-2 leading-relaxed">
                  <li><strong className="text-white">React 19 & TypeScript:</strong> Componentização moderna, tipagem estática robusta e ciclo de vida otimizado.</li>
                  <li><strong className="text-white">GSAP & ScrollTrigger:</strong> Animações cinemáticas de scroll scrub de alta performance (60 FPS) e interpolação de matrizes.</li>
                  <li><strong className="text-white">Lenis Smooth Scroll:</strong> Rolagem suave unificada para todos os navegadores, permitindo orquestração fina do ScrollTrigger.</li>
                  <li><strong className="text-white">Web Audio API:</strong> Trilha de sintetizador dinâmica em tempo real (drone e chord loops) mantendo o peso de carregamento de mídia em zero.</li>
                  <li><strong className="text-white">HTML5 Canvas API:</strong> Renderizador leve de partículas e malha interativa de física espacial no background.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#B89B5E]/10 rounded-xl text-[#B89B5E] shrink-0">
                <Zap size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-2">
                  Performance & Otimizações
                </h3>
                <ul className="text-xs sm:text-sm text-gray-400 font-light space-y-2 leading-relaxed">
                  <li><strong className="text-white">Otimização de Render:</strong> Cursor de altíssimo desempenho acionado por GSAP `quickSetter`, desacoplado do ciclo de re-renders do React.</li>
                  <li><strong className="text-white">Carregamento Inteligente:</strong> Pré-carregamento de fontes e scripts críticos no HTML; imagens complementares com lazy loading.</li>
                  <li><strong className="text-white">Mobile Safeguards:</strong> Desativação inteligente de blur pesado e partículas em dispositivos de baixo desempenho.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 2: Design & Concepts */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#B89B5E]/10 rounded-xl text-[#B89B5E] shrink-0">
                <Palette size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-2">
                  Design System & Acessibilidade
                </h3>
                <ul className="text-xs sm:text-sm text-gray-400 font-light space-y-2 leading-relaxed">
                  <li><strong className="text-white">Estética de Luxo:</strong> Tipografia geométrica elegante (Outfit & Inter), tom escuro predominante com detalhes dourados inspirado nos documentários premium da Netflix.</li>
                  <li><strong className="text-white">Modo Dual Clássico:</strong> Modo claro e escuro fluidos, adaptando paletas de cores de acordo com contraste e design de galeria física.</li>
                  <li><strong className="text-white">Navegação Universal:</strong> Foco por teclado (`focus-visible`) e suporte total para o modo `prefers-reduced-motion` a fim de evitar enjoos de animações.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#B89B5E]/10 rounded-xl text-[#B89B5E] shrink-0">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-2">
                  Contexto & Credibilidade
                </h3>
                <ul className="text-xs sm:text-sm text-gray-400 font-light space-y-2 leading-relaxed">
                  <li><strong className="text-white">Veracidade Estatística:</strong> Dados oficiais da carreira mapeados e linkados às fontes originais (FIFA, CBF, Olympics.com) em cada seção.</li>
                  <li><strong className="text-white">Isenção de Responsabilidade:</strong> Informações claras sobre fins educacionais e não afiliação oficial com as marcas ou com o jogador no rodapé do produto.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* GitHub / Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-white/10">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            Projeto Conceito © 2026. Desenvolvido por Matheus Dutra.
          </span>
          <a 
            href="https://github.com/matheusdutra/Neymar-Legado" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#B89B5E] hover:text-white border border-[#B89B5E]/30 hover:border-[#B89B5E] px-4 py-2 rounded-full bg-white/[0.02] interactive transition-all"
          >
            <svg 
              className="w-3.5 h-3.5 fill-current" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span>PROJECT CODEBASE</span>
          </a>
        </div>
      </div>
    </div>
  );
};
