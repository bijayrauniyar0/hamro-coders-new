import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import Skeleton from '@Components/radix/Skeleton';

const MCQSkeleton = () => {
  return (
    <div className="">
      <FlexColumn className="h-[calc(100dvh-7rem)] md:h-[calc(100dvh-10rem)] w-full gap-3 md:gap-5">
        <div className="flex w-full flex-wrap justify-between gap-2 border-b border-gray-300 pb-4">
          <Skeleton className="h-6 w-[8rem] md:h-8 md:w-[10rem]" />

          <FlexRow className="items-center justify-between gap-4 max-sm:w-full md:justify-end">
            <Skeleton className="h-4 w-[14rem] md:h-6 md:w-[16rem]" />
            <Skeleton className="h-4 w-[6rem] rounded-full md:h-6" />
          </FlexRow>
        </div>
        <FlexRow className="z-10 w-full items-center justify-between gap-4 bg-white">
          <Skeleton className="h-6 w-[6rem] md:h-8" />
          <FlexRow className="items-center gap-2">
            <Skeleton className="h-6 w-6 md:h-8 md:w-8" />
            <Skeleton className="h-6 w-6 md:h-8 md:w-8" />
            <Skeleton className="h-6 w-[6rem] md:h-8" />
          </FlexRow>
        </FlexRow>
        <FlexColumn className="gap-4">
          <Skeleton className="h-16 w-full md:h-20" />
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
            {[...Array(4).keys()].map(key => (
              <Skeleton key={key} className="h-8 w-full md:h-10" />
            ))}
          </div>
          {[...Array(3).keys()].map(key => (
            <Skeleton className="h-16 w-full md:h-20" key={key} />
          ))}
        </FlexColumn>
      </FlexColumn>
      <FlexRow className="justify-between">
        <Skeleton className="h-8 w-[5rem] md:h-10 md:w-[7rem]" />
        <FlexRow className="gap-2">
          {[...Array(2).keys()].map(key => (
            <Skeleton className="h-8 w-[5rem] md:h-10 md:w-[7rem]" key={key} />
          ))}
        </FlexRow>
      </FlexRow>
    </div>
  );
};

export default MCQSkeleton;
