import React from 'react';
import { Check } from 'lucide-react';

import { ConfirmationDialog } from '@Components/common/Confirmation';
import { FlexRow } from '@Components/common/Layouts';
import { useMCQContext } from '@Components/MCQSection/Context/MCQContext';
import { Button } from '@Components/radix/Button';

const QuestionsViewButtons = () => {
  const {
    solvedCount,
    mcqData,
    handleSubmit,
    visibleQuestionChunkIndex,
    setVisibleQuestionChunkIndex,
    questionsChunk,
    viewMode,
    setViewMode,
  } = useMCQContext();

  const submitButton: { [key: string]: React.ReactNode } = {
    questions: (
      <>
        {solvedCount !== mcqData.questions_count ? (
          <ConfirmationDialog
            title="Are you sure you want to submit?"
            description="There are unanswered questions!"
            confirmText="Submit"
            triggerChildren={
              <Button
                className="text-xs max-md:h-fit max-md:px-3 max-md:py-2 md:text-sm"
                variant="secondary"
              >
                <Check className="h-4 w-4 md:h-5 md:w-5" />
                Submit
              </Button>
            }
            handleConfirm={() => {
              handleSubmit();
            }}
          />
        ) : (
          <Button
            className="text-xs max-md:h-fit max-md:px-3 max-md:py-2 md:text-sm"
            variant="secondary"
            onClick={() => {
              handleSubmit();
            }}
          >
            <Check className="h-4 w-4 md:h-5 md:w-5" />
            Submit
          </Button>
        )}
      </>
    ),
    answers: (
      <Button
        className="text-xs max-md:h-fit max-md:px-3 max-md:py-2 md:text-sm text-nowrap"
        onClick={() => {
          setViewMode('answers');
        }}
        variant="secondary"
      >
        Preview Answers
      </Button>
    ),
  };
  return (
    <FlexRow className="w-full items-center justify-between">
      {submitButton[viewMode]}

      <FlexRow className="w-full justify-end gap-4">
        <Button
          variant="outline"
          className="text-xs max-md:h-fit max-md:px-3 max-md:py-2 md:text-sm"
          onClick={() => {
            if (visibleQuestionChunkIndex === 0) return;
            setVisibleQuestionChunkIndex(visibleQuestionChunkIndex - 1);
          }}
          disabled={visibleQuestionChunkIndex === 0}
        >
          PREV
        </Button>
        <Button
          className="text-xs max-md:h-fit max-md:px-3 max-md:py-2 md:text-sm"
          onClick={() => {
            if (visibleQuestionChunkIndex === questionsChunk.length - 1) return;
            setVisibleQuestionChunkIndex(visibleQuestionChunkIndex + 1);
          }}
          disabled={visibleQuestionChunkIndex === questionsChunk.length - 1}
        >
          NEXT
        </Button>
      </FlexRow>
    </FlexRow>
  );
};

export default QuestionsViewButtons;
