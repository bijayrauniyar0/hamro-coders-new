import React from 'react';

import { FlexRow } from '@Components/common/Layouts';

import { useMCQContext } from '../Context/MCQContext';

const OverviewMode = () => {
  const {
    questionsChunk,
    setVisibleQuestionChunkIndex,
    visibleQuestionChunkIndex,
  } = useMCQContext();

  return (
    <FlexRow
      className={`scrollbar !max-h-[32rem] w-full cursor-pointer flex-wrap justify-between gap-2 overflow-y-auto p-4`}
    >
      {questionsChunk.map((_, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setVisibleQuestionChunkIndex(index);
            }}
            className={`flex min-h-6 min-w-6 flex-1 items-center justify-center rounded-lg border md:min-h-10 md:min-w-10 ${visibleQuestionChunkIndex === index ? 'border-primary-500 shadow-[3px_3px_3px_rgba(170,139,211,0.4)]' : ''}`}
          >
            {/* <FlexColumn className="items-center justify-start"> */}
            <p className="text-sm md:text-md">{index + 1}</p>
            {/* </FlexColumn> */}
          </div>
        );
      })}
    </FlexRow>
  );
};

export default OverviewMode;
