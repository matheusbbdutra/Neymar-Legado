export interface BrandItem {
  id: string;
  name: string;
  info: string;
  drops: string[];
}

export const brandsData: BrandItem[] = [
  { id: 'puma', name: 'PUMA', info: '2020 - LONG TERM', drops: ['The King Returns', 'Instituto Collection', 'Future Z Drop'] },
  { id: 'redbull', name: 'RED BULL', info: 'GLOBAL PARTNER', drops: ['Neymar Jr\'s Five', 'Out of the Box Series'] },
  { id: 'pokerstars', name: 'POKERSTARS', info: 'CULTURAL AMBASSADOR', drops: ['Mindset Campaigns', 'Global Tournaments'] }
];
