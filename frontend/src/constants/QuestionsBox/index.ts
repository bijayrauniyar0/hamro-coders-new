export const optionsLabel = ['A', 'B', 'C', 'D'];

export const questions = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: [
      'Berlin',
      'Madrid',
      'Paris',
      'Lorem ipsum dolor sit amet consectetur adipisicing',
    ],
    answer: 'Paris',
  },
  {
    id: 2,
    question: 'Which programming language is used for web development?',
    options: ['Python', 'JavaScript', 'C++', 'Ruby'],
    answer: 'JavaScript',
  },
  {
    id: 3,
    question: 'What is the largest planet in the Solar System?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    answer: 'Jupiter',
  },
  {
    id: 4,
    question: 'Which country won the FIFA World Cup in 2018?',
    options: ['Germany', 'Brazil', 'France', 'Argentina'],
    answer: 'France',
  },
  {
    id: 5,
    question: 'What is the boiling point of water at sea level?',
    options: ['90°C', '100°C', '110°C', '120°C'],
    answer: '100°C',
  },
  {
    id: 6,
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: [
      'William Shakespeare',
      'Charles Dickens',
      'Mark Twain',
      'Jane Austen',
    ],
    answer: 'William Shakespeare',
  },
  {
    id: 7,
    question: 'Which is the smallest continent by land area?',
    options: ['Australia', 'Europe', 'Antarctica', 'South America'],
    answer: 'Australia',
  },
  {
    id: 8,
    question: 'What is the chemical symbol for gold?',
    options: ['Au', 'Ag', 'Go', 'Gd'],
    answer: 'Au',
  },
  {
    id: 9,
    question: 'Which animal is known as the King of the Jungle?',
    options: ['Lion', 'Tiger', 'Elephant', 'Cheetah'],
    answer: 'Lion',
  },
  {
    id: 10,
    question: 'What is the square root of 64?',
    options: ['6', '7', '8', '9'],
    answer: '8',
  },
];

export const modesDescription = {
  practice:
    'No pressure, just practice! In this mode, you can take all the time you need to answer questions. Perfect for sharpening your skills and learning at your own pace.',
  rapid:
    'In this mode, you’ll need to think fast! You have just 10 seconds to answer each question. Test your speed and accuracy as you race against the clock!',
  ranked:
    'Challenge yourself with 120 seconds in total for each question. Every correct answer earns you 1 point, but be careful—each wrong answer will cost you -0.5 points. Can you rise to the top and make your mark on the leaderboard?',
};

export const endStats = [
  {
    name: 'done',
    color: 'text-green-400',
    text: 'answers were correct',
    keyName: 'right',
  },
  {
    name: 'close',
    color: 'text-red-400',
    text: 'answers were wrong',
    keyName: 'wrong',
  },
];
