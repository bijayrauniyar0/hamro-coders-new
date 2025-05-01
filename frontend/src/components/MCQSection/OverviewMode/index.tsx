import React, { useState } from 'react';

import { Grid } from '@Components/common/Layouts';
import { cn } from '@Utils/index';

import { useMCQContext } from '../Context/MCQContext';

const OverviewMode = () => {
  const {
    questionsChunk,
    setVisibleQuestionChunkIndex,
    setViewMode,
  } = useMCQContext();
  const [flippedSection, setFilledSection] = useState(1);
  let questionNumber = 0;

  return (
    <Grid
      className={`scrollbar max-[425px]-grid-cols-2 !max-h-[32rem] w-full cursor-pointer grid-cols-3 place-items-center gap-2 overflow-y-auto p-4 min-[426px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6`}
    >
      {questionsChunk.map((chunk, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              if (flippedSection === index + 1) {
                setVisibleQuestionChunkIndex(index);
                setViewMode('questions');
                return;
              }
              setFilledSection(index + 1);
            }}
            className={cn(
              'relative aspect-square w-full max-w-[8rem]',
              flippedSection === index + 1
                ? 'border-primary-400'
                : 'border-gray-200',
              flippedSection === index + 1 ? 'grid-cols-2' : 'grid-cols-1',
              'grid place-items-center gap-1 rounded-lg border bg-white p-1 shadow-sm transition-all duration-300 ease-out hover:border-primary-400 md:p-3',
            )}
          >
            <>
              <div
                className={`text-base transition ${flippedSection === index + 1 ? 'absolute opacity-0' : 'flex items-center justify-center opacity-100'}`}
              >
                {index + 1}
              </div>
              {chunk.map(question => {
                questionNumber++;
                return (
                  <div
                    key={question.id}
                    className={`${flippedSection === index + 1 ? 'flex opacity-100' : 'hidden'} h-full w-full items-center justify-center rounded-lg p-1 shadow-sm transition`}
                  >
                    <p className="text-sm lg:text-md">Q {questionNumber}</p>
                  </div>
                );
              })}
            </>
          </button>
        );
      })}
    </Grid>
  );
};

export default OverviewMode;
