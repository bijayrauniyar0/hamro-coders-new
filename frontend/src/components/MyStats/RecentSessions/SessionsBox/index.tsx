import { format } from 'date-fns';

import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import StatusChip from '@Components/common/StatusChip';
import { capitalizeFirstLetter } from '@Utils/capitalizeFirstLetter';
import { SessionsBoxProps } from '@Constants/Types/myStats';

const SessionsBox = ({
  title,
  score,
  accuracy,
  elapsed_time,
  mode,
  date_time,
}: SessionsBoxProps) => {
  const sessionBoxStatsKeys = [
    {
      title: 'Score',
      value: score,
    },
    {
      title: 'Accuracy',
      value: accuracy,
    },
    {
      title: 'Time Elapsed',
      value: elapsed_time,
    },
  ];

  const chipStatus = mode === 'ranked' ? 'success' : 'info';

  return (
    <FlexColumn className="gap-6 rounded-lg border border-gray-200 px-4 py-4">
      <FlexRow className="items-center justify-between">
        <p className="text-md font-semibold">{capitalizeFirstLetter(title)}</p>
        <p className="text-sm font-medium">
          {date_time ? format(new Date(date_time), 'MMMM dd, yyyy') : ''}
        </p>
      </FlexRow>
      <FlexRow className="items-center justify-between">
        {sessionBoxStatsKeys.map(stat => (
          <FlexColumn key={stat.title} className="w-fit items-end gap-2">
            <p className="text-md font-medium leading-3 text-gray-900 md:text-lg">
              {stat.value}
            </p>
            <p className="text-xs leading-3 tracking-tight text-matt-200 md:text-sm">
              {stat.title}
            </p>
          </FlexColumn>
        ))}
      </FlexRow>
      <StatusChip status={chipStatus} label={mode} />
    </FlexColumn>
  );
};

export default SessionsBox;
