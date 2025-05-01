import React from 'react';

import MCQBox from '@Components/MCQSection';
import { MCQProvider } from '@Components/MCQSection/Context/MCQProvider';

const MCQPage = () => {
  return (
    <MCQProvider>
      <MCQBox />
    </MCQProvider>
  );
};

export default MCQPage;
