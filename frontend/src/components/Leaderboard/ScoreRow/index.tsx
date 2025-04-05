import React from 'react';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import Icon from '@Components/common/Icon';
import { getFallBackImage } from '@Utils/index';

type ScoreRowProps = {
  image: string;
  name: string;
  score: number;
  rank: number;
  previous_rank: number;
};
const ScoreRow = ({
  image,
  name,
  score,
  rank,
  previous_rank,
}: ScoreRowProps) => {
  return (
    <FlexRow className="w-full select-none items-center justify-between rounded-lg border border-gray-300 bg-[#fbfbfb] px-4 py-2 shadow-sm">
      <FlexRow className="items-center gap-2">
        <p className="w-4 text-base font-semibold text-primary-600">{rank}</p>
        <img
          src={image || getFallBackImage()}
          alt=""
          className="h-12 w-12 rounded-full"
        />
        <FlexColumn className="gap-1">
          <p className="text-base font-semibold leading-4">{name}</p>
        </FlexColumn>
      </FlexRow>
      <FlexColumn className="place-items-end">
        <p className="text-md font-medium tracking-tighter">{score}</p>
        <Icon
          className={`flex items-center justify-center p-0 !text-md ${previous_rank >= rank ? 'text-green-600' : 'text-red-700'}`}
          name={`${previous_rank > rank ? 'arrow_drop_up' : previous_rank === rank ? 'equal' : 'arrow_drop_down'}`}
        />
      </FlexColumn>
      {/* <Icon className="text-primary-700" name="arrow_drop_up" /> */}
    </FlexRow>
  );
};

export default ScoreRow;
