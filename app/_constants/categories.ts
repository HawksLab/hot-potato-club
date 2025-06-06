import { Category } from '@/_types/GameTypes';

export const sampleCategories: Category[] = [
  {
    id: 'classic',
    name: 'Classic',
    questions: [
      'Name a European city not a capital',
      'Name an American president who served only one term',
      'Name a famous landmark that is also a UNESCO World Heritage site',
      'Name a popular movie from the 90s that won Best Picture',
      'Name a type of fruit that grows on a vine',
      'Name a mythological creature from Norse mythology',
      'Name a famous classical composer from the Romantic era',
      'Name a novel that has been banned in some countries',
      'Name a type of pasta that isn\'t spaghetti or penne',
      'Name one of the Seven Wonders of the Ancient World (and its location)',
      'Name a philosopher known for existentialism',
      'Name a traditional dance from South America',
      'Name a historical empire that lasted over 500 years',
      'Name a renowned female painter from before the 20th century',
      'Name a common houseplant known for its air-purifying qualities',
      'Name a Shakespearean tragedy (other than Hamlet or Romeo & Juliet)',
      'Name a famous inventor whose invention is now obsolete',
      'Name a type of cheese that is blue',
      'Name a constellation named after an animal',
      'Name a classic board game that involves strategy rather than luck',
      'What\'s a piece of "common knowledge" that is actually false?',
      'If you could witness any historical event, what would it be?',
      'Name a classic car model known for its distinctive design',
      'Name a famous opera singer',
      'Name a traditional folk tale with a moral lesson',
      'Name a famous historical speech that inspired change',
      'Name a type of bread from a specific culture',
      'Name a famous poet and one of their well-known poems',
    ],
  },
  {
    id: 'sports',
    name: 'Sports',
    questions: [
      'Name a famous athlete who competed in multiple different sports',
      'Name a sports team that has relocated to a different city',
      'Name an Olympic sport that was discontinued',
      'Name a piece of sports equipment that has drastically changed due to technology',
      'Name a sports championship trophy by its specific name',
      'Name a sport where the defense can also score points directly',
      'Name a country known for its dominance in a niche sport',
      'Name a famous sports rivalry that spans multiple decades',
      'Name a rule in a major sport that many casual fans misunderstand',
      'Name a legendary sports commentator known for a catchphrase',
      'Name a type of athletic shoe designed for a very specific terrain',
      'Name an international sporting event that focuses on winter sports (not the Winter Olympics)',
      'Name a sport played primarily on horseback',
      'Name a famous sports stadium known for its unique architecture or history',
      'Name an individual sport that requires extreme endurance',
      'Name a sports movie that is critically acclaimed but not about a mainstream sport',
      'What\'s the most controversial call or moment in sports history you can think of?',
      'If you could add or change one rule in your favorite sport, what would it be?',
      'Name a famous coach known for their innovative tactics',
      'Name a piece of protective gear that is mandatory in a lesser-known sport',
      'Name a sport that involves judging or scoring based on aesthetics',
      'Name a sports record you believe is truly unbreakable',
      'Name a common sports superstition practiced by athletes',
      'Name a brand that sponsors an entire sports league or tournament',
      'Name an underdog story in sports that particularly inspires you',
      'Name a sport that uses an unusual type of ball or projectile',
      'Name a famous sibling duo or trio in professional sports',
      'Name a sport that has a unique or complex scoring system',
    ],
  },
  {
    id: 'politics',
    name: 'Politics',
    questions: [
      'Name a political system that is not democracy or communism',
      'Name a former world leader who was awarded the Nobel Peace Prize',
      'Name a political party from a non-Western country',
      'Name a famous political speech delivered at the United Nations',
      'Name a historic political event that led to the creation of a new country',
      'Name a type of electoral system other than "first past the post"',
      'Name a current international treaty focused on environmental protection',
      'Name a political ideology that advocates for minimal government intervention',
      'Name a famous political activist who was imprisoned for their beliefs',
      'Name a country that has a non-presidential republic system',
      'Name a form of non-violent political protest',
      'Name a controversial piece of legislation that was later repealed',
      'Name a political satire movie that accurately predicted a real event',
      'Name a fundamental human right that is often debated or violated',
      'Name a historical peace treaty that failed to prevent future conflict',
      'If you could ask one question to any current world leader, what would it be and to whom?',
      'Name a political figure known for their controversial rhetoric',
      'Name a political slogan that became iconic',
      'Name a specific type of gerrymandering',
      'Name a country that has a constitutional monarchy where the monarch has some real power',
      'What\'s a political issue you think will be critical in the next 20 years?',
      'Name a famous first spouse (First Lady/Gentleman) who had a significant political impact',
      'Name a political scandal that involved espionage',
      'Name a youth-led political movement that achieved significant change',
      'Name a concept from international relations theory (e.g., realism, liberalism)',
      'Name a country that has a multi-party political system with coalition governments being common',
      'Name a political term that is often misused or misunderstood by the public',
      'Name a famous political cartoonist',
    ],
  },
  {
    id: 'nerds',
    name: 'Nerds',
    questions: [
      'Name a programming language known for its use in AI development',
      'Name a superhero who doesn\'t have any actual superpowers',
      'Name a sci-fi movie that explores the concept of time travel in a unique way',
      'Name a video game character who is an anti-hero',
      'Name a famous scientist whose work was initially rejected or ridiculed',
      'Name a data structure that is a type of tree',
      'Name a villain from a fantasy novel series',
      'Name a retro gaming console that had a unique controller',
      'Name a Nobel Prize winner in Physics from the 21st century',
      'Name a type of algorithm used for sorting data',
      'Name a spaceship from a TV series (not Star Wars or Star Trek)',
      'Name an indie video game that won multiple awards',
      'Name a famous female mathematician and her contribution',
      'Name a subgenre of fantasy (e.g., urban fantasy, grimdark)',
      'Name a popular version control system',
      'Name a character class from Dungeons & Dragons (any edition)',
      'Name a scientific theory that fundamentally changed our understanding of the universe',
      'Name a tech company that started in a garage (other than Apple or Microsoft)',
      'Name a fictional artificial intelligence that becomes self-aware',
      'What piece of fictional technology from a book/movie do you think is most plausible in the near future?',
      'Name a major annual convention for comic book or gaming fans',
      'Name a famous ethical dilemma posed by advancing technology',
      'Name a concept from quantum mechanics',
      'Name a web framework for frontend development',
      'Name a programming paradigm other than object-oriented',
      'Name a cult classic sci-fi TV show that was cancelled too soon',
      'Name a logical fallacy often seen in online arguments',
      'Name a famous cryptographer or a significant cipher',
      'Name a type of neural network architecture',
    ],
  },
  {
    id: 'spicy',
    name: 'Spicy',
    questions: [
      "What's your most embarrassing moment involving a piece of technology?",
      "What's a weird food combination you'd defend to the death?",
      "What's your most irrational fear that you know makes no sense?",
      "What's the worst gift you've ever received, and did you pretend to like it?",
      "What's the strangest dream you've had that you can still vividly recall?",
      'What\'s a secret talent you have that would surprise most people who know you?',
      'What\'s a white lie you told that had unexpectedly big consequences?',
      'What\'s the most spontaneous trip or adventure you\'ve ever been on?',
      'What\'s a song you blast when no one is around, but would deny liking in public?',
      'What\'s a "harmless" conspiracy theory you find entertaining to think about?',
      'What\'s the cringiest fashion trend you enthusiastically participated in?',
      'What\'s a social media post you deleted almost immediately after posting?',
      'What\'s the most trouble you ever got into at school or work?',
      'What\'s a popular opinion or "hot take" that you strongly disagree with?',
      'If you could swap lives with a fictional character for a day, who would it be and why?',
      'What\'s a skill you tried to learn but hilariously failed at?',
      'What\'s the weirdest thing in your search history right now (be honest!)?',
      'What\'s a nickname you were given that you absolutely despised?',
      'What\'s one piece of advice you\'d give to your 16-year-old self?',
      'What\'s a small, everyday annoyance that makes you unreasonably angry?',
      'What\'s a movie or TV show that makes you ugly cry every single time?',
      'What\'s the most adventurous or bizarre food you\'ve ever willingly eaten?',
      'What\'s a personal "rule" you have that others might find strange?',
      'If your life had a warning label, what would it say?',
      'What\'s a belief you held very strongly in the past that you now completely disagree with?',
      'What\'s the most awkward encounter you\'ve had with a celebrity or someone famous?',
      'What\'s something you\'re secretly very competitive about?',
      'What\'s a "guilty pleasure" TV show or movie you\'d recommend?',
      'What\'s the most ridiculous excuse you\'ve ever used that actually worked?',
      'If you could have any animal as a mythical companion, what would it be and what powers would it have?',
    ],
  },
];

export default function CategoriesPlaceholder() {
  return null;
}