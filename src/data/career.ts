export interface EraTheme {
  bg: string;
  text: string;
  accent: string;
  textAccent: string;
  gradientBlob: string;
}

export interface EraStats {
  games: number;
  goals: number;
  assists: number;
}

export interface CareerEra {
  id: string;
  name: string;
  period: string;
  role: string;
  description: string;
  stats: EraStats;
  theme: EraTheme;
  image: string; // Path to real editorial photo
}

export const careerData: CareerEra[] = [
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
    },
    image: '/src/assets/santos.webp'
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
    },
    image: '/src/assets/Barcelona.jpg'
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
    },
    image: '/src/assets/psg.webp'
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
    },
    image: '/src/assets/brasil.jpg'
  }
];
