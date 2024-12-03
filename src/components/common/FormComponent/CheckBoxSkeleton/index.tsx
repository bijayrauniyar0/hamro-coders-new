import Skeleton from '@Components/radix/Skeleton';
import { v4 as uuidv4 } from 'uuid';

interface ICheckBoxSkeletonProps {
  numRows?: number;
  className?: string;
}

const CheckBoxSkeleton = ({
  numRows = 2,
  className,
}: ICheckBoxSkeletonProps) => {
  const skeletonRows = Array.from({ length: numRows });
  return (
    <>
      <div className="flex h-full !w-full max-w-full flex-col rounded-lg py-5">
        <div className="space-y-4">
          {skeletonRows.map(() => (
            <div
              key={uuidv4()}
              className="flex w-full flex-col justify-start space-y-4"
            >
              <div className="flex items-center justify-start space-x-2">
                <Skeleton
                  className={`h-4 w-4 border border-gray-200 ${className}`}
                />

                <Skeleton className="h-4 w-full border border-gray-200" />
              </div>
              <div className="ml-6 flex items-center justify-start space-x-2">
                <Skeleton
                  className={`h-4 w-4 border border-gray-200 ${className}`}
                />
                <Skeleton className="h-4 w-[50%] border border-gray-200" />
              </div>
              <div className="ml-6 flex items-center justify-start space-x-2">
                <Skeleton
                  className={`h-4 w-4 border border-gray-200 ${className}`}
                />
                <Skeleton className="h-4 w-[50%] border border-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CheckBoxSkeleton;
