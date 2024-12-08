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
    value: 'ranked',
  },
  {
    id: 2,
    modeTitle: 'Rapid Mode',
    modeDescription:
      'Solve questions in a limited time and improve your speed and accuracy',
    imageUrl: rapidModeImg,
    value: 'rapid',
  },
  {
    id: 3,
    modeTitle: 'Practice Mode',
    modeDescription:
      'Test your knowledge and improve your skills with our practice mode',
    imageUrl: practiceModeImg,
    value: 'practice',
  },
];

export const RightCustomArrow = ({ className, style, onClick }: any) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        top: '50%', // Center vertically
        transform: 'translateY(-50%)',
        right: '2px',
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
};
export const LeftCustomArrow = ({ className, style, onClick }: any) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        top: '50%', // Center vertically
        transform: 'translateY(-50%)',
        left: '2px',
      }}
      onClick={onClick}
    />
  );
};
