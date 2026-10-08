export interface PortfolioItem {
  id: string;
  title: string;
  category: 'social' | 'novias' | 'fiesta';
  imageUrl: string;
  imageAlt: string;
  description?: string;
}

export type PortfolioCategory = PortfolioItem['category'];

export const PORTFOLIO_CATEGORY_LABELS: Record<PortfolioCategory, string> = {
  social: 'Social',
  novias: 'Novias',
  fiesta: 'Fiesta',
};
