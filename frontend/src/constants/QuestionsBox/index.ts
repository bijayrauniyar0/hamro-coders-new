export const optionsLabel = ['A', 'B', 'C', 'D'];

type ModeDescriptionParams = {
  modes: string;
  timeLimit: number;
  negativeMarking: number;
  marksPerQuestion: number;
};

export const getModesDescription = ({
  modes,
}: ModeDescriptionParams) => {
  const modesData = {
    practice:
      'No pressure, just practice! In this mode, you can take all the time you need to answer questions. Perfect for sharpening your skills and learning at your own pace.',
    ranked: ``,
  };
  return modesData[modes as keyof typeof modesData] || '';
};

export const endStats = [
  {
    name: 'done',
    color: 'text-green-400',
    text: 'answers were correct',
    keyName: 'right',
    bg_color: 'bg-green-100',
  },
  {
    name: 'close',
    color: 'text-red-400',
    text: 'answers were wrong',
    keyName: 'wrong',
    bg_color: 'bg-red-100',
  },
];
