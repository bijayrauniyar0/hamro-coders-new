import React from 'react';

import Icon from '@Components/common/Icon';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import crown from '@Assets/images/crown.png';
import { getAvatar } from '@Constants/UserProfile';

type LeaderBoxProps = {
  className?: string;
  rank: number;
  name?: string;
  score: number;
  previous_rank: number;
  imageClassName?: string;
  outlineColor?: string;
  rankClassName?: string;
  image?: string;
};
const LeaderBox = ({
  className,
  rank,
  name,
  score,
  previous_rank,
  imageClassName,
  outlineColor = 'outline-blue-400',
  rankClassName,
  image,
}: LeaderBoxProps) => {
  return (
    <FlexColumn className="w-fit gap-4">
      <div className="w-full p-1">
        <FlexColumn
          className={`w-fit select-none rounded-full outline outline-4 ${outlineColor} relative z-10 h-fit w-fit items-center`}
        >
          {rank === 1 && (
            <img
              src={crown}
              alt=""
              className="absolute h-12 w-12 -translate-x-[2.25rem] -translate-y-[2rem] rotate-[-42deg] object-contain sm:-translate-x-[3rem] sm:-translate-y-[1.5rem] sm:rotate-[-47deg]"
            />
          )}
          <img
            src={getAvatar(image || 'bear')}
            alt=""
            className={`${imageClassName} rounded-full ${className}`}
          />
          <div
            className={`absolute bottom-[-1rem] left-1/2 flex h-6 w-6 translate-x-[-50%] items-center justify-center rounded-full ${rankClassName} p-2`}
          >
            <p className="text-sm text-white">{rank}</p>
          </div>
        </FlexColumn>
      </div>
      <FlexColumn className="h-full w-full items-center justify-center">
        <p className="text-xs sm:text-md">{name}</p>
        <FlexRow className="items-center gap-1">
          <p className="text-sm font-semibold text-blue-400 md:text-base">
            {score}
          </p>
          <Icon
            className={`flex items-center justify-center p-0 !text-lg ${previous_rank > rank ? 'text-green-600' : previous_rank === rank ? 'text-gray-400' : 'text-red-700'}`}
            name={`${previous_rank > rank ? 'arrow_drop_up' : previous_rank === rank ? 'check_indeterminate_small' : 'arrow_drop_down'}`}
          />
        </FlexRow>
      </FlexColumn>
    </FlexColumn>
  );
};

export default LeaderBox;
