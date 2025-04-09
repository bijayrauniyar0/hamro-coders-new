export const optionsLabel = ['A', 'B', 'C', 'D'];

export const modesDescription: { [key: string]: string } = {
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
