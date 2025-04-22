/* eslint-disable no-unused-vars */
import React from 'react';

import { FlexColumn } from '@Components/common/Layouts';
import { optionsLabel } from '@Constants/QuestionsBox';

import MCQButton from '../MCQButton';
import { QuestionType } from '..';

interface IQuestionProps {
  questionData: QuestionType
  questionCount: number;
  selectedOption: Record<string, any>[];
  handleOptionClick?: (id: number) => void;
}
const Question = ({
  questionCount,
  questionData,
  handleOptionClick,
  selectedOption,
}: IQuestionProps) => {
  return (
    <FlexColumn className="gap-5">
      <p className="text-md font-medium leading-5 md:text-base">
        {questionData.question}
      </p>
      <div className="grid select-none grid-cols-1 gap-4 md:grid-cols-2">
        {questionData.options.map(({ id, value }, subIndex) => {
          const isOptionSelected = selectedOption[questionCount]?.id === id;
          return (
            <button
              className={`flex cursor-pointer items-center justify-start gap-4 rounded-lg border bg-white p-2 shadow-sm transition-all duration-200 ease-in-out hover:border-primary-400 md:p-4 ${isOptionSelected ? 'border-primary-400' : 'border-gray-200'}`}
              key={subIndex}
              onClick={() => {
                if (!handleOptionClick) return;
                handleOptionClick(id);
              }}
            >
              <MCQButton label={optionsLabel[subIndex]} value={value} />
            </button>
          );
        })}
      </div>
    </FlexColumn>
  );
};

export default Question;
