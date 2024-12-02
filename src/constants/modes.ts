import climbingLadderImg from '@Assets/images/climbing_ladder.png';
import rapidModeImg from '@Assets/images/rapid_mode.png';
import practiceModeImg from '@Assets/images/practice_mode.png';

export const modesData = [
  {
    id: 1,
    modeTitle: 'Ranked Mode',
    modeDescription:
      'Compete with students from all over the world and climb the leaderboard',
    imageUrl: climbingLadderImg,
  },
  {
    id: 2,
    modeTitle: 'Practice Mode',
    modeDescription:
      'Test your knowledge and improve your skills with our practice mode',
    imageUrl: rapidModeImg,
  },
  {
    id: 3,
    modeTitle: 'Rapid Mode',
    modeDescription:
      'Solve questions in a limited time and improve your speed and accuracy',
    imageUrl: practiceModeImg,
  },
];
