import { FlexRow } from '@Components/common/Layouts';

type FromStepperProps = {
  currentQuestion: boolean[];
  questionCount: number;
  questionData: { id: number; question: string; options: string[] }[];
};
const FromStepper = ({
  currentQuestion,
  questionCount,
  questionData,
}: FromStepperProps) => {
  const getGradientClass = (index: number) => {
    // Only apply colors for segments before the current active question
    if (index + 1 === questionCount) {
      if (currentQuestion[index] === true) {
        return 'bg-gradient-to-r from-green-400 to-gray-200 animate-pulse'; // Solved to in-progress
      }
      if (currentQuestion[index] === false) {
        return 'bg-gradient-to-r from-yellow-400 to-gray-200 animate-pulse'; // Skipped to in-progress
      }
    }
    if (index >= questionCount - 1) return 'bg-gray-200';

    const prevQuestion = currentQuestion[index];
    const nextQuestion = currentQuestion[index + 1];

    if (prevQuestion === false && nextQuestion === false) {
      return 'bg-yellow-400'; // Both skipped
    }
    if (prevQuestion === true && nextQuestion === true) {
      return 'bg-green-400'; // Both solved
    }
    if (prevQuestion === true && nextQuestion === false) {
      return 'bg-gradient-to-r from-green-400 to-yellow-400'; // Solved to skipped
    }
    if (prevQuestion === false && nextQuestion === true) {
      return 'bg-gradient-to-r from-yellow-400 to-green-400'; // Skipped to solved
    }

    return 'bg-gray-200'; // Default gray
  };
  return (
    <div className="mx-auto w-full md:w-4/5">
      <FlexRow className="flex-wrap justify-between sm:flex-nowrap md:justify-start">
        {questionData.map((_, index) => {
          return (
            <FlexRow
              className={`group w-fit items-center md:w-full md:last:w-fit`}
              key={index}
            >
              <FlexRow
                className={`h-2 w-2 cursor-pointer items-center ${questionCount === index ? 'animate-glow' : ''} justify-center rounded-[50%] border ${
                  currentQuestion[index] === false
                    ? 'border-yellow-400'
                    : currentQuestion[index] === true
                      ? 'border-green-400'
                      : 'border-gray-200'
                } bg-white p-4 shadow-sm sm:p-5 md:p-4 lg:p-6`}
              >
                <p>{`Q${index + 1}`}</p>
              </FlexRow>

              {/* Apply the logic for the line color based on currentQuestion */}
              {index !== questionData.length - 1 && (
                <div
                  className={`hidden h-1 w-full md:block ${getGradientClass(index)}`}
                />
              )}
            </FlexRow>
          );
        })}
      </FlexRow>
    </div>
  );
};

export default FromStepper;
