import { format } from 'date-fns';
import { Book } from 'lucide-react';

import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { capitalizeFirstLetter } from '@Utils/capitalizeFirstLetter';
import { SessionsBoxProps } from '@Constants/Types/myStats';

const SessionsBox = ({
  title,
  score,
  elapsed_time,
  created_at,
  stream_name,
}: SessionsBoxProps) => {
  return (
    <FlexRow className="w-full justify-between flex-wrap gap-2 border-b border-b-gray-200 px-4 py-4">
      <FlexRow className="items-center gap-2">
        <div className="rounded-lg bg-primary-100 p-2">
          <Book className="h-3 w-3 text-primary-700 md:h-4 md:w-4" />
        </div>
        <span className="text-sm font-medium capitalize text-primary-700 md:text-md">
          {stream_name}
        </span>
      </FlexRow>
      {/* <FlexRow className="items-center justify-between"> */}
      <FlexRow className="items-center justify-between max-md:w-full">
        <p className="text-ellipsis text-sm font-medium leading-4 md:w-[8rem] md:text-md">
          {capitalizeFirstLetter(title)}
        </p>
        <p className="text-sm font-medium md:hidden">
          {created_at ? format(new Date(created_at), 'MMMM dd, yyyy') : ''}
        </p>
      </FlexRow>
      <FlexColumn className="w-fit items-start gap-1 md:items-end md:gap-2">
        <p className="text-sm font-medium leading-3 text-primary-700 md:text-md">
          {score}
        </p>
        <p className="text-xs leading-3 tracking-tight text-matt-200 md:text-sm">
          Score
        </p>
      </FlexColumn>
      <FlexColumn className="w-fit items-end gap-1 md:gap-2">
        <p className="text-sm font-medium leading-3 text-primary-700 md:text-md">
          {elapsed_time}
        </p>
        <p className="text-xs leading-3 tracking-tight text-matt-200 md:text-sm">
          Time Elapsed
        </p>
      </FlexColumn>
      <p className="text-sm font-medium max-md:hidden">
        {created_at ? format(new Date(created_at), 'MMMM dd, yyyy') : ''}
      </p>
    </FlexRow>
  );
};

export default SessionsBox;
