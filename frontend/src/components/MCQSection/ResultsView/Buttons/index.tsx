import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FlexRow } from '@Components/common/Layouts';
import { useMCQContext } from '@Components/MCQSection/Context/MCQContext';
import { Button } from '@Components/radix/Button';

const ResultsViewButtons = () => {
  const navigate = useNavigate();
  const { setViewMode } = useMCQContext();
  return (
    <FlexRow className="gap-2">
      <Button
        onClick={() => {
          setViewMode('answers');
        }}
        variant="secondary"
        className="w-full md:w-fit"
      >
        Preview Answers
      </Button>
      <Button
        onClick={() => {
          // disableBeforeUnload();
          navigate(0);
        }}
        className="w-full md:w-fit"
      >
        Try Again
      </Button>
    </FlexRow>
  );
};

export default ResultsViewButtons;
