import { PortfolioItem } from '../models/portfolio-item';

export const PORTFOLIO_ITEMS: readonly PortfolioItem[] = [
  {
    id: 'social-luz', title: 'Luz natural', category: 'social',
    imageUrl: 'images/portfolio/social-luz.webp',
    imageAlt: 'Retrato de una mujer con sombras doradas y naranjas y labios en tono natural.',
    description: 'Inspiración en tonos cálidos y un acabado luminoso.',
  },
  {
    id: 'novia-radiante', title: 'Novia radiante', category: 'novias',
    imageUrl: 'images/portfolio/novia-radiante.webp',
    imageAlt: 'Profesional aplicando maquillaje con una brocha a una novia con vestido blanco.',
    description: 'Una referencia de maquillaje elegante para el día de la boda.',
  },
  {
    id: 'fiesta-color', title: 'Un toque de color', category: 'fiesta',
    imageUrl: 'images/portfolio/fiesta-color.webp',
    imageAlt: 'Mujer con sombras amarillas, delineado artístico y labios rojos.',
    description: 'Color y definición para un look expresivo.',
  },
  {
    id: 'social-sesion', title: 'Detalles que realzan', category: 'social',
    imageUrl: 'images/portfolio/social-sesion.webp',
    imageAlt: 'Maquilladora trabajando en los ojos de una mujer durante una sesión.',
    description: 'Inspiración para realzar la mirada con atención al detalle.',
  },
  {
    id: 'novia-preparacion', title: 'Un momento especial', category: 'novias',
    imageUrl: 'images/portfolio/novia-preparacion.webp',
    imageAlt: 'Novia recibiendo los últimos detalles de maquillaje antes de su boda.',
    description: 'La preparación de un look para una ocasión inolvidable.',
  },
  {
    id: 'fiesta-mirada', title: 'Mirada protagonista', category: 'fiesta',
    imageUrl: 'images/portfolio/fiesta-mirada.webp',
    imageAlt: 'Retrato de una mujer con maquillaje de ojos de colores intensos y labios definidos.',
    description: 'Una propuesta de inspiración con carácter y color.',
  },
];
