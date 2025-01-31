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

// <div
//                                 className={`flex cursor-pointer items-center ${isCorrectAnswer ? 'bg-[#e2ffe4]' : ''} ${isSelectedWrongAnswer ? 'bg-[#ffdbdb]' : ''} ${isSelected ? 'border-2 border-primary-400' : 'border-primary-100'} justify-start gap-4 rounded-lg border bg-white p-2 shadow-sm transition-all duration-200 ease-in-out hover:border-primary-400 md:p-4`}
//                                 onClick={() => {
//                                   setSelectedOption((prevData: string[]) => {
//                                     // Check if the option is already selected
//                                     if (prevData[questionCount] === option) {
//                                       // If selected, deselect it (remove it from the array)
//                                       return prevData.filter(
//                                         (_, index) => index !== questionCount,
//                                       );
//                                     } else {
//                                       // If not selected, add it to the array at the specific index
//                                       const updatedData = [...prevData];
//                                       updatedData[questionCount] = option;
//                                       return updatedData;
//                                     }
//                                   });
//                                 }}
//                                 key={subIndex}
//                               >
//                                 <div className="relative">
//                                   <img
//                                     src={buttonPng}
//                                     className="max-h-[3rem] max-w-[3rem]"
//                                   />
//                                   <p className="left absolute left-1/2 top-1/2 z-50 translate-x-[-50%] translate-y-[-50%] text-lg font-bold text-white">
//                                     {optionsLabel[subIndex]}
//                                   </p>
//                                 </div>
//                                 <p className="text-sm leading-4 lg:text-base">
//                                   {option}
//                                 </p>
//                               </div>

export const responseQuestions = [
  {
    question: 'Which of the following is a software development methodology?',
    options: [
      {
        id: 1,
        value: 'Waterfall',
      },
      {
        id: 2,
        value: 'Spiral',
      },
      {
        id: 3,
        value: 'Agile',
      },
      {
        id: 4,
        value: 'All of the above',
      },
    ],
    id: 26,
    answer: 4,
  },
  {
    question: 'Which is a phase in the software development life cycle?',
    options: [
      {
        id: 1,
        value: 'Design',
      },
      {
        id: 2,
        value: 'Testing',
      },
      {
        id: 3,
        value: 'Implementation',
      },
      {
        id: 4,
        value: 'All of the above',
      },
    ],
    id: 27,
    answer: 4,
  },
  {
    question:
      'Which of these is part of the software project management process?',
    options: [
      {
        id: 1,
        value: 'Risk management',
      },
      {
        id: 2,
        value: 'Code refactoring',
      },
      {
        id: 3,
        value: 'Deployment',
      },
      {
        id: 4,
        value: 'Debugging',
      },
    ],
    id: 33,
    answer: 1,
  },
];

export const questionsAnswers = [
  {
    id: 26,
    answer: 4,
  },
  {
    id: 33,
    answer: 4,
  },
  {
    id: 27,
    answer: 3,
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
