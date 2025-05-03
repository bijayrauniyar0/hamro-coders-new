import { useMCQContext } from '../Context/MCQContext';
import { ViewMode } from '../Context/MCQContextTypes';

type MCQButtonProps = {
  value: string;
  label: string;
  onClick: () => void;
  isOptionSelected: boolean;
  isAnswerCorrect: boolean;
};
const MCQButton = ({
  value,
  onClick,
  isOptionSelected,
  isAnswerCorrect,
}: MCQButtonProps) => {
  const { viewMode } = useMCQContext();
  const getButtonClassName = (
    view: ViewMode,
    isOptionSelected: boolean,
    isCorrectAnswer: boolean,
  ): string => {
    if (view === 'questions' && isOptionSelected) {
      return 'border-primary-500 bg-primary-400';
    }

    if (view === 'answers') {
      if (isCorrectAnswer) {
        return 'bg-green-100 border-green-500';
      }

      if (isOptionSelected && !isCorrectAnswer) {
        return 'bg-red-100 border-red-500';
      }
    }

    return 'border-gray-200';
  };

  return (
    <button
      className={`flex cursor-pointer items-center justify-start gap-4 rounded-md border p-2 transition-all duration-200 ease-in-out hover:border-primary-500 md:p-3 ${getButtonClassName(viewMode, isOptionSelected, isAnswerCorrect)}`}
      onClick={onClick}
    >
      <div className="relative">
        <div
          className={`h-4 w-4 rounded-full ${isOptionSelected ? 'border-4 border-white bg-primary-500' : 'bg-primary-500'}`}
          style={{
            transition:
              'border-width 100ms ease-in-out, background-color 300ms ease-in-out',
          }}
        />
      </div>
      <p
        className={`text-start text-sm leading-4 lg:text-md ${isOptionSelected ? 'text-white' : 'text-gray-700'}`}
      >
        {value}
      </p>
    </button>
  );
};

export default MCQButton;
