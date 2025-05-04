import React from 'react';

import { FlexColumn } from '@Components/common/Layouts';

interface ISectionProps {
  header: string;
  description: string;
  children: React.ReactNode;
}
const Section = ({ header, description, children }: ISectionProps) => {
  return (
    <FlexColumn className="gap-4 px-1 md:gap-6 mb-8">
      <div>
        <p className="text-center text-base font-bold md:text-lg">{header}</p>
        <p className="text-center text-md text-gray-600 md:text-base">
          {description}
        </p>
      </div>
      {children}
    </FlexColumn>
  );
};

export default Section;
