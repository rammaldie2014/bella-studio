import { MakeupService } from '../models/makeup-service';

export const MAKEUP_SERVICES: readonly MakeupService[] = [
  {
    id: 'social',
    title: 'Maquillaje Social',
    description: 'Elegancia para tus eventos especiales.',
    imageUrl: 'images/services/social.webp',
    imageAlt: 'Mujer con sombras doradas y naranjas y labios en tono natural.',
    whatsappMessage: 'Hola, estoy interesada en el servicio de Maquillaje Social de Bella Studio. ¿Podrían brindarme más información?',
  },
  {
    id: 'novia',
    title: 'Maquillaje de Novia',
    description: 'Radiante en tu día más especial.',
    imageUrl: 'images/services/novia.webp',
    imageAlt: 'Maquilladora aplicando una brocha en el rostro de una novia con vestido blanco.',
    whatsappMessage: 'Hola, estoy interesada en el servicio de Maquillaje de Novia de Bella Studio. ¿Podrían brindarme más información?',
  },
  {
    id: 'fiesta',
    title: 'Maquillaje de Fiesta',
    description: 'Un look impactante y sofisticado.',
    imageUrl: 'images/services/fiesta.webp',
    imageAlt: 'Retrato de una mujer con delineado artístico, sombras amarillas y labios rojos.',
    whatsappMessage: 'Hola, estoy interesada en el servicio de Maquillaje de Fiesta de Bella Studio. ¿Podrían brindarme más información?',
  },
  {
    id: 'asesoria',
    title: 'Asesoría Personalizada',
    description: 'Descubre el maquillaje ideal para ti.',
    imageUrl: 'images/services/asesoria.webp',
    imageAlt: 'Profesional aplicando maquillaje en los ojos de una mujer sentada durante una sesión.',
    whatsappMessage: 'Hola, estoy interesada en el servicio de Asesoría Personalizada de Bella Studio. ¿Podrían brindarme más información?',
  },
];
