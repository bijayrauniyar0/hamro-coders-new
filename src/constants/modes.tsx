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
    modeTitle: 'Rapid Mode',
    modeDescription:
      'Solve questions in a limited time and improve your speed and accuracy',
    imageUrl: rapidModeImg,
  },
  {
    id: 3,
    modeTitle: 'Practice Mode',
    modeDescription:
      'Test your knowledge and improve your skills with our practice mode',
    imageUrl: practiceModeImg,
  },
];

const CustomArrow = ({ className, style, onClick, direction }: any) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        top: '50%', // Center vertically
        transform: 'translateY(-50%)',
        left: direction === 'left' ? '2px' : 'unset', // Adjust position
        right: direction === 'right' ? '2px' : 'unset',
      }}
      onClick={onClick}
    />
  );
};

export const reactSlickSettings = {
  dots: true,
  infinite: true,
  speed: 200,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  centerPadding: '60px',
  className: 'center',
  adaptiveHeight: true,
  prevArrow: <CustomArrow direction="left" />,
  nextArrow: <CustomArrow direction="right" />,
};
