import React from 'react';

import Icon from '@Components/common/Icon';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { getFallBackImage } from '@Utils/index';
import { useTypedSelector } from '@Store/hooks';

type ScoreRowProps = {
  image: string;
  name: string;
  score: number;
  rank: number;
  previous_rank: number;
  user_id: number;
};
const ScoreRow = ({
  image,
  name,
  score,
  rank,
  previous_rank,
  user_id,
}: ScoreRowProps) => {
  const userProfile = useTypedSelector(state => state.commonSlice.userProfile);
  return (
    <FlexRow
      className={`w-full select-none items-center justify-between rounded-lg border border-gray-300 bg-[#fbfbfb] px-2 py-2 shadow-sm md:px-4 ${userProfile?.id === user_id ? 'sticky bottom-0 top-0 bg-primary-100' : ''}`}
    >
      <FlexRow className="items-center gap-2">
        <Icon
          className={`flex items-center justify-center p-0 text-lg md:text-xl ${previous_rank > rank ? 'text-green-600' : previous_rank === rank ? 'text-gray-400' : 'text-red-700'}`}
          name={`${previous_rank > rank ? 'arrow_drop_up' : previous_rank === rank ? 'check_indeterminate_small' : 'arrow_drop_down'}`}
        />
        <p className="w-4 text-base font-semibold text-primary-600">{rank}</p>
        <img
          src={image || getFallBackImage()}
          alt=""
          className="h-10 w-10 rounded-full md:h-12 md:w-12"
        />
        <FlexRow className="items-center gap-2">
          <p className="text-md font-semibold leading-4 md:text-base">
            {name.split(' ')[0]}
          </p>
          {userProfile.id === user_id && (
            <div className="rounded-full bg-primary-50 px-2 py-1 text-sm">
              You
            </div>
          )}
        </FlexRow>
      </FlexRow>
      <FlexColumn className="items-center">
        <p className="text-md font-medium leading-3 tracking-tighter">
          {score}
        </p>
      </FlexColumn>
      {/* <Icon className="text-primary-700" name="arrow_drop_up" /> */}
    </FlexRow>
  );
};

export default ScoreRow;
