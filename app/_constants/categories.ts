import { Category } from '@/_types/GameTypes';

export const sampleCategories: Category[] = [
  {
    id: 'classic',
    name: 'Classic',
    questions: [
      'Name a European city',
      'Name an American president',
      'Name a famous landmark',
      'Name a popular movie from the 90s',
      'Name a type of fruit',
    ],
  },
  {
    id: 'sports',
    name: 'Sports',
    questions: [
      'Name a famous athlete',
      'Name a sports team',
      'Name an Olympic sport',
      'Name a sports equipment',
      'Name a sports championship',
    ],
  },
  {
    id: 'politics',
    name: 'Politics',
    questions: [
      'Name a political system',
      'Name a former world leader',
      'Name a political party',
      'Name a famous political speech',
      'Name a historic political event',
    ],
  },
  {
    id: 'nerds',
    name: 'Nerds',
    questions: [
      'Name a programming language',
      'Name a superhero',
      'Name a sci-fi movie',
      'Name a video game character',
      'Name a famous scientist',
    ],
  },
  {
    id: 'spicy',
    name: 'Spicy',
    questions: [
      "What's your most embarrassing moment?",
      "What's a weird food combination you enjoy?",
      "What's your most irrational fear?",
      "What's the worst gift you've ever received?",
      "What's the strangest dream you've had?",
    ],
  },
];

export default function CategoriesPlaceholder() {
  return null;
}
