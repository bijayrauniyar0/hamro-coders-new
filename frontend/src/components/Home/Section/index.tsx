import React from 'react';

import { FlexColumn } from '@Components/common/Layouts';

interface ISectionProps {
  header: string;
  description: string;
  children: React.ReactNode;
}
const Section = ({ header, description, children }: ISectionProps) => {
  return (
    <FlexColumn className="relative z-[9] gap-4 overflow-hidden px-1 pb-8 md:gap-6 md:pb-12 lg:pb-16">
      <div>
        <p className="text-center text-xl font-bold md:text-2xl lg:text-3xl">
          {header}
        </p>
        <p className="text-center text-md text-gray-600 md:text-base">
          {description}
        </p>
      </div>
      {children}
    </FlexColumn>
  );
};

export default Section;
