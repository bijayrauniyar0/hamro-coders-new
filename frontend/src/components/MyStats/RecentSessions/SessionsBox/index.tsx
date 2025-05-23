import { format } from 'date-fns';

import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { capitalizeFirstLetter } from '@Utils/capitalizeFirstLetter';
import { SessionsBoxProps } from '@Constants/Types/myStats';

const SessionsBox = ({
  title,
  score,
  elapsed_time,
  created_at,
}: SessionsBoxProps) => {
  const sessionBoxStatsKeys = [
    {
      title: 'Score',
      value: score,
    },
    {
      title: 'Time Elapsed',
      value: elapsed_time,
    },
  ];

  // const chipStatus = mode === 'ranked' ? 'success' : 'info';

  return (
    <div className="flex w-full max-md:gap-6 border-b border-b-gray-200 px-4 py-4 max-md:flex-col md:items-center md:justify-between">
      {/* <FlexRow className="items-center justify-between"> */}
      <FlexRow className="max-md:w-full items-center justify-between">
        <p className="md:w-[8rem] text-ellipsis text-sm md:text-md font-medium leading-5">
          {capitalizeFirstLetter(title)}
        </p>
        <p className="text-sm font-medium md:hidden">
          {created_at ? format(new Date(created_at), 'MMMM dd, yyyy') : ''}
        </p>
      </FlexRow>
      <FlexRow className="justify-between md:w-1/2">
        {/* <StatusChip status={chipStatus} label={mode} /> */}
        {sessionBoxStatsKeys.map(stat => (
          <FlexColumn key={stat.title} className="w-fit items-end gap-2">
            <p className="text-sm font-medium leading-3 text-gray-700 md:text-md">
              {stat.value}
            </p>
            <p className="text-xs leading-3 tracking-tight text-matt-200 md:text-sm">
              {stat.title}
            </p>
          </FlexColumn>
        ))}
      </FlexRow>
      <p className="text-sm font-medium max-md:hidden">
        {created_at ? format(new Date(created_at), 'MMMM dd, yyyy') : ''}
      </p>
    </div>
  );
};

export default SessionsBox;
