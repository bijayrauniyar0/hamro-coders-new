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
  const getButtonLabelClassName = (
    view: ViewMode,
    isOptionSelected: boolean,
    isCorrectAnswer: boolean,
  ): string => {
    if (view === 'questions' && isOptionSelected) {
      return 'border-white bg-primary-400 border-[3px]';
    }

    if (view === 'answers') {
      if (isCorrectAnswer) {
        return 'bg-green-700 border-white border-[3px]';
      }

      if (isOptionSelected && !isCorrectAnswer) {
        return 'bg-red-700 border-white border-[3px]';
      }
    }

    return 'bg-primary-500';
  };

  return (
    <button
      className={`flex cursor-pointer items-center justify-start gap-2 rounded-md border p-2 transition-all duration-200 ease-in-out md:gap-4 md:p-3 ${getButtonClassName(viewMode, isOptionSelected, isAnswerCorrect)} ${viewMode === 'questions' ? 'hover:border-primary-500' : ''}`}
      onClick={onClick}
    >
      <div className="relative">
        <div
          className={`h-3 w-3 rounded-full md:h-4 md:w-4 ${getButtonLabelClassName(viewMode, isOptionSelected, isAnswerCorrect)}`}
          style={{
            transition:
              'border-width 100ms ease-in-out, background-color 300ms ease-in-out',
          }}
        />
      </div>
      <p
        className={`text-start text-sm leading-4 lg:text-md ${isOptionSelected && viewMode === 'questions' ? 'text-white' : 'text-gray-700'}`}
      >
        {value}
      </p>
    </button>
  );
};

export default MCQButton;
