import { Category } from '@/_types/GameTypes';

// Collect all available questions based on selected category IDs
export function getAvailableQuestions(
  categories: Category[],
  selectedCategoryIds: string[]
): { category: string; question: string }[] {
  try {
  return categories
    .filter(cat => selectedCategoryIds.includes(cat.id))
    .flatMap(cat =>
      cat.questions.map(q => ({ category: cat.name, question: q }))
    );
  } catch (error) {
    console.error('Error in getAvailableQuestions:', error);
    return [];
  }
}

// Pick a random question from available questions
export function getRandomQuestion(
  available: { category: string; question: string }[]
): { category: string; question: string } {
  const idx = Math.floor(Math.random() * available.length);
  return available[idx];
}

// Generate random explosion time in seconds between min and max
export function generateRandomTime(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function GameUtilsPlaceholder() {
  return null;
}