import Skeleton from '@Components/radix/Skeleton';
import { v4 as uuidv4 } from 'uuid';

interface IFormSkeletonProps {
  numRows?: number;
  className?: string;
}

const FormSkeleton = ({ numRows = 1, className }: IFormSkeletonProps) => {
  const skeletonRows = Array.from({ length: numRows });
  return (
    <>
      <div className="flex h-full w-full max-w-full flex-col rounded-lg py-5">
        <div className="w-full space-y-4">
          {skeletonRows.map(() => (
            <div key={uuidv4()} className="space-y-2">
              <Skeleton className="h-4 w-[15%] border border-gray-200" />

              <Skeleton
                className={`h-10 w-[80%] border border-gray-200 ${className}`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FormSkeleton;
