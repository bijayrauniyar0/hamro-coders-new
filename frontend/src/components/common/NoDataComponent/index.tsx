import React from 'react';
import { FileQuestion, SearchX } from 'lucide-react';

import { FlexColumn } from '../Layouts';

interface NoDataComponentProps {
  variant?: 'default' | 'search' | 'empty';
}
const NoDataComponent = ({ variant = 'default' }: NoDataComponentProps) => {
  const variants = {
    default: {
      icon: <FileQuestion className="h-16 w-16 text-primary-600" />,
      title: 'No Data Found',
      description: "We couldn't find any data matching your criteria.",
    },
    search: {
      icon: <SearchX className="h-16 w-16 text-primary-600" />,
      title: 'No Search Results',
      description:
        "We couldn't find any results matching your search. Try different keywords or filters.",
    },
    empty: {
      icon: <FileQuestion className="h-16 w-16 text-primary-600" />,
      title: 'No Items Yet',
      description:
        'There are no items to display. Add your first item to get started.',
    },
  };
  const { icon, title, description } = variants[variant];
  return (
    <FlexColumn className="items-center justify-center gap-4 p-8 text-center">
      <div className="mb-4 rounded-full bg-primary-100 p-4">{icon}</div>
      <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-gray-500">{description}</p>
    </FlexColumn>
  );
};

export default NoDataComponent;
