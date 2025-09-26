import { CategoryType } from "../types/categories.type";

export const categoriesJson: CategoryType[] = [
  {
    name: 'Guitarras',
    description: 'Instrumentos de corda com corpo sólido ou acústico.',
    logoUrl: '/pictures/logos/guitar.png',
    isActive: true,
  },
  {
    name: 'Baterias',
    description: 'Instrumentos de percussão usados em bandas.',
    logoUrl: '/pictures/logos/drum.png',
    isActive: true,
  },
  {
    name: 'Teclados',
    description: 'Instrumentos de teclas, incluindo pianos e sintetizadores.',
    logoUrl: '/pictures/logos/keyboards.png',
    isActive: true,
  },
  {
    name: 'Baixos',
    description: 'Instrumentos de corda para linha de baixo.',
    logoUrl: '/pictures/logos/bass.png',
    isActive: true,
  },
  {
    name: 'Cordas clássicas',
    description: 'Violinos, violas, violoncelos e contrabaixos.',
    logoUrl: '/pictures/logos/violin.png',
    isActive: true,
  },
  {
    name: 'Sopros',
    description: 'Instrumentos de sopro, como flauta, saxofone e trompete.',
    logoUrl: '/pictures/logos/saxophone.png',
    isActive: true,
  },
  {
    name: 'Percussão leve',
    description: 'Instrumentos como tamborins, congas e pandeiros.',
    logoUrl: '/pictures/logos/percussion.png',
    isActive: true,
  },
];
