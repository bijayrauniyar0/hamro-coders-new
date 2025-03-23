import React from 'react';
import crown from '@Assets/images/crown.png';
import { FlexColumn } from '@Components/common/Layouts';
import { getFallBackImage } from '@Utils/index';

type LeaderBoxProps = {
  className?: string;
  rank: number;
  name?: string;
  score?: number;
};
const LeaderBox = ({ className, rank, name, score }: LeaderBoxProps) => {
  const size =
    rank === 1 ? 'sm:h-24 sm:w-24 h-16 w-16' : 'sm:h-20 sm:w-20 w-12 h-12';

  const rankOutlineColors: { [key: number]: string } = {
    1: 'outline-primary-400',
    2: 'outline-blue-400',
    3: 'outline-green-400',
  };

  const rankColors: { [key: number]: string } = {
    1: 'bg-primary-400',
    2: 'bg-blue-400',
    3: 'bg-green-400',
  };

  const roundedCorners: { [key: number]: string } = {
    1: 'rounded-t-[15%] top-[5.925rem] h-[10rem] bg-gray-200',
    2: 'rounded-tl-[25%] top-[2rem] h-[8rem] bg-gray-100',
    3: 'rounded-tr-[25%] top-[2rem] h-[8rem] bg-gray-100',
  };

  return (
    <div className="relative h-full w-full">
      <FlexColumn className="relative h-full w-full items-center">
        {rank === 1 && (
          <img
            src={crown}
            alt=""
            className="h-12 w-12 -translate-x-[1.75rem] translate-y-[0.75rem] rotate-[-32deg] object-contain sm:-translate-x-[3rem] sm:translate-y-[1.5rem] sm:rotate-[-47deg]"
          />
        )}
        <div className="relative h-fit w-fit px-4 pb-4">
          <div
            className={`w-fit select-none rounded-full outline outline-4 ${rankOutlineColors[rank]}`}
          >
            <img
              src={getFallBackImage()}
              alt=""
              className={`${size} rounded-full ${className}`}
            />
            <div
              className={`absolute bottom-0 left-1/2 flex h-6 w-6 translate-x-[-50%] items-center justify-center rounded-full ${rankColors[rank]} p-2`}
            >
              <p className="text-sm text-white">2</p>
            </div>
          </div>
        </div>
      </FlexColumn>
      <div
        className={`absolute -z-10 w-full select-none ${roundedCorners[rank]}`}
      >
        <FlexColumn className="h-full w-full items-center justify-center pt-[50%]">
          <p className="text-xs sm:text-md ">{name}</p>
          <p className="text-sm md:text-lg font-semibold text-blue-400">{score}</p>
        </FlexColumn>
      </div>
    </div>
  );
};

export default LeaderBox;
