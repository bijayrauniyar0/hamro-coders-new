import React from 'react';
import {
  Bookmark,
  Clock,
  ListOrdered,
  PercentCircle,
  Star,
  Users,
} from 'lucide-react';

import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import StatusChip from '@Components/common/StatusChip';
import { Button } from '@Components/radix/Button';
import { TestInfoProps } from '@Constants/Types/academics';

const TestInfo = ({
  description,
  rating,
  stream_name,
  students_count,
  title,
  duration,
  total_questions,
  full_marks,
  negative_marking,
  bookmark,
}: TestInfoProps) => {
  const testMetaData = [
    {
      id: 1,
      label: 'Time',
      icon: Clock,
      icon_color: 'text-blue-300',
      value: duration,
    },
    {
      id: 2,
      label: 'Full Marks',
      icon: Star,
      icon_color: 'text-yellow-400',
      value: full_marks,
    },
    {
      id: 4,
      label: 'Negative Marking',
      icon: PercentCircle,
      icon_color: 'text-red-400',
      Value: negative_marking,
    },
    {
      id: 5,
      label: 'Number of Questions',
      value_key: 'total_questions',
      icon: ListOrdered,
      icon_color: 'text-green-400',
      value: total_questions,
    },
  ];

  return (
    <div className="relative w-full rounded-lg border border-gray-200 bg-white px-3 py-4 shadow-sm">
      <Bookmark
        fill={bookmark ? 'currentColor' : 'none'}
        className="absolute right-4 top-[-3px] h-6 w-6 cursor-pointer text-primary-600 md:h-8 md:w-8"
      />
      <FlexColumn className="gap-8">
        <FlexColumn className="gap-4">
          <p className="font-medium text-gray-700 sm:text-md md:text-base">
            {title}
          </p>
          <StatusChip label={stream_name} status="info" />
        </FlexColumn>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FlexColumn className="gap-4">
            <p className="flex-1 text-md">{description}</p>
            <div className="w-full rounded-md border border-gray-200 bg-white px-3 py-2">
              <FlexRow className="flex-wrap items-center justify-between">
                <FlexRow className="items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <FlexColumn>
                    <p className="text-base font-medium">Rating</p>
                    <p className="text-md font-normal text-gray-500">
                      {rating}
                    </p>
                  </FlexColumn>
                </FlexRow>
                <FlexRow className="items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  <FlexColumn>
                    <p className="text-base font-medium">Students</p>
                    <p className="text-md font-normal text-gray-500">
                      {students_count}
                    </p>
                  </FlexColumn>
                </FlexRow>
                <FlexRow className="items-center gap-2">
                  <Star className="h-5 w-5 text-purple-500" />
                  <FlexColumn>
                    <p className="text-base font-medium">Reviews</p>
                    <p className="text-md font-normal text-gray-500">
                      {students_count}
                    </p>
                  </FlexColumn>
                </FlexRow>
              </FlexRow>
            </div>
            <Button>Start Test</Button>
          </FlexColumn>
          <div className="w-full rounded-md border border-gray-200 bg-white px-3 py-2">
            {testMetaData.map(
              ({ id, label, value, icon: Icon, icon_color }) => {
                return (
                  <FlexRow
                    key={id}
                    className="items-center justify-between border-b py-2 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`h-5 w-5 ${icon_color}`} />
                      <p className="text-sm font-medium">{label}</p>
                    </div>
                    <p className="text-sm font-normal text-gray-500">{value}</p>
                  </FlexRow>
                );
              },
            )}
          </div>
        </div>
      </FlexColumn>
    </div>
  );
};

export default TestInfo;
