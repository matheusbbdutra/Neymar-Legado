import santosImg from '../assets/santos.webp';
import barcelonaImg from '../assets/Barcelona.jpg';
import psgImg from '../assets/psg.webp';
import brasilImg from '../assets/brasil.jpg';

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

export interface StatDetail {
  label: string;
  value: number;
  max: number;
  tooltip: string;
  context?: string;
  hoverLabel: string;
}

export interface CareerEra {
  id: string;
  name: string;
  eraTitle: string;
  period: string;
  role: string;
  description: string;
  stats: EraStats;
  statsDetails: StatDetail[];
  sources: string[];
  theme: EraTheme;
  image: string; // Will hold the resolved Vite asset URL
}

export const careerData: CareerEra[] = [
  {
    id: 'santos',
    name: 'SANTOS FC',
    eraTitle: 'THE WONDERKID',
    period: '2009 - 2013',
    role: 'O Nascimento do Gênio',
    description: 'A Vila Belmiro testemunhou o surgimento de um talento geracional. Dribles desconcertantes, a ousadia natural e a conquista histórica da América (Libertadores 2011), além do prêmio Puskás de 2011 por seu gol memorável contra o Flamengo, colocaram Neymar no radar global.',
    stats: { games: 225, goals: 136, assists: 64 },
    statsDetails: [
      { label: 'Games', value: 225, max: 250, tooltip: 'Partidas oficiais registradas no Santos FC.', hoverLabel: 'Official Games', context: 'Estreia aos 17 anos' },
      { label: 'Goals', value: 136, max: 150, tooltip: 'Gols oficiais marcados no clube santista.', hoverLabel: 'Santos Goals', context: 'Prêmio Puskás 2011' },
      { label: 'Assists', value: 64, max: 100, tooltip: 'Assistências servidas em partidas competitivas.', hoverLabel: 'Goal Assists' }
    ],
    sources: ['SantosFC.com.br', 'CBF', 'FIFA.com'],
    theme: {
      bg: 'from-[#e0e0e0] via-[#ffffff] to-[#d4d4d4]',
      text: 'text-black',
      accent: 'bg-black',
      textAccent: 'text-black',
      gradientBlob: 'radial-gradient(circle at 80% 50%, rgba(0,0,0,0.08) 0%, transparent 60%)'
    },
    image: santosImg
  },
  {
    id: 'barcelona',
    name: 'FC BARCELONA',
    eraTitle: 'THE MAGICIAN',
    period: '2013 - 2017',
    role: 'A Consagração Europeia',
    description: 'Parte do lendário MSN (Messi, Suárez e Neymar). No Camp Nou, evoluiu para a realeza do futebol mundial, culminando no topo da Europa em Berlim (Champions 2015) e liderando a histórica virada de 6-1 contra o PSG.',
    stats: { games: 186, goals: 105, assists: 76 },
    statsDetails: [
      { label: 'Games', value: 186, max: 250, tooltip: 'Jogos oficiais competitivos em todas as competições.', hoverLabel: 'Official Games', context: '186 Aparições na Europa' },
      { label: 'Goals', value: 105, max: 150, tooltip: 'Gols marcados por competições oficiais (La Liga, Champions, Copa).', hoverLabel: 'Blaugrana Goals', context: 'Artilheiro da Champions 14/15' },
      { label: 'Assists', value: 76, max: 100, tooltip: 'Passes para gol em 4 temporadas no Barça.', hoverLabel: 'Key Assists' }
    ],
    sources: ['FCBarcelona.com', 'UEFA.com'],
    theme: {
      bg: 'from-[#004D98] via-[#111827] to-[#A50044]',
      text: 'text-white',
      accent: 'bg-[#DB0030]',
      textAccent: 'text-[#FDEC00]',
      gradientBlob: 'radial-gradient(circle at 20% 60%, rgba(165,0,68,0.4) 0%, transparent 60%)'
    },
    image: barcelonaImg
  },
  {
    id: 'psg',
    name: 'PARIS SG',
    eraTitle: 'THE SUPERSTAR',
    period: '2017 - 2023',
    role: 'A Estrela Global',
    description: 'A maior transferência da história do futebol. Assumiu a camisa 10 na capital francesa, conquistou múltiplos campeonatos nacionais e levou a equipe até a final inédita da UEFA Champions League em 2020.',
    stats: { games: 173, goals: 118, assists: 77 },
    statsDetails: [
      { label: 'Games', value: 173, max: 250, tooltip: 'Partidas pelo PSG por torneios locais e europeus.', hoverLabel: 'Official Games', context: 'Transferência Recorde €222M' },
      { label: 'Goals', value: 118, max: 150, tooltip: 'Gols oficiais marcados pelo clube de Paris.', hoverLabel: 'Parisian Goals', context: 'Média de 0.68 gol/jogo' },
      { label: 'Assists', value: 77, max: 100, tooltip: 'Assistências registradas pelo PSG.', hoverLabel: 'Goal Assists' }
    ],
    sources: ['PSG.fr', 'LFP.fr', 'UEFA.com'],
    theme: {
      bg: 'from-[#001c3c] via-[#000a18] to-[#001224]',
      text: 'text-white',
      accent: 'bg-[#DA291C]',
      textAccent: 'text-[#CEAB5D]',
      gradientBlob: 'radial-gradient(circle at 70% 30%, rgba(218,41,28,0.15) 0%, transparent 60%)'
    },
    image: psgImg
  },
  {
    id: 'brasil',
    name: 'SELEÇÃO BRASILEIRA',
    eraTitle: 'THE LEADER',
    period: '2010 - PRESENTE',
    role: 'A Coroa de Ouro',
    description: 'O peso da camisa amarela transformado em arte. Superou Pelé na contagem oficial da FIFA, carregou a esperança nacional rumo ao inédito Ouro Olímpico no Rio 2016 e conquistou a Copa das Confederações de 2013.',
    stats: { games: 128, goals: 79, assists: 59 },
    statsDetails: [
      { label: 'Games', value: 128, max: 250, tooltip: 'Partidas oficiais pela Seleção Brasileira Principal.', hoverLabel: 'Capitan Appearances', context: 'Estreia sob comando de Mano Menezes' },
      { label: 'Goals', value: 79, max: 150, tooltip: 'Maior artilheiro de todos os tempos da Seleção Masculina nas contas da FIFA.', hoverLabel: 'Brazil Top Scorer*', context: 'Maior Artilheiro Masculino*' },
      { label: 'Assists', value: 59, max: 100, tooltip: 'Passes diretos para gol com a camisa amarelinha.', hoverLabel: 'Brazil Assists' }
    ],
    sources: ['CBF.com.br', 'FIFA.com', 'Olympics.com'],
    theme: {
      bg: 'from-[#009B3A] via-[#002710] to-[#FEDF00]',
      text: 'text-white',
      accent: 'bg-[#FEDF00]',
      textAccent: 'text-[#FEDF00]',
      gradientBlob: 'radial-gradient(circle at 50% 50%, rgba(254,223,0,0.2) 0%, transparent 70%)'
    },
    image: brasilImg
  }
];
