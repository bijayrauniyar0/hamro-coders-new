import { FlexColumn } from '@Components/common/Layouts';
import Skeleton from '@Components/radix/Skeleton';

const MCQSkeleton = () => {
  return (
    <FlexColumn className="gap-6">
      <Skeleton className="h-20 w-full" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[...Array(4).keys()].map(key => (
          <Skeleton key={key} className="h-16 w-full" />
        ))}
      </div>
    </FlexColumn>
  );
};

export default MCQSkeleton;
