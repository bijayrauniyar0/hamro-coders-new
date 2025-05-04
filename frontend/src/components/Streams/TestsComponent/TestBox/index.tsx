import { Book, ChevronRight, Flame, Info, Users } from 'lucide-react';

import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import { ITestBoxProps } from '@Constants/Types/academics';

const TestBox = ({ title, stream_name }: ITestBoxProps) => {
  return (
    <div className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:border-primary-200 hover:shadow-lg">
      <FlexColumn className="items-start gap-4 px-6 py-5">
        <FlexRow className="w-full items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary-50 p-2">
              <Book size={16} className="text-primary-700" />
            </div>
            <span className="text-xs font-medium capitalize text-primary-700">
              {stream_name}
            </span>
          </div>
          <Info
            size={18}
            className="cursor-pointer text-gray-400 hover:text-primary-500"
          />
        </FlexRow>

        <p className="text-md font-semibold text-gray-700 transition-colors duration-200 group-hover:text-primary-600 md:text-base">
          {title}
        </p>

        <div className="flex items-center">
          <Users size={14} className="mr-1 text-gray-400" />
          <span className="text-xs text-gray-500">45 students</span>
        </div>

        <div className="flex w-full items-center justify-between border-t border-gray-100 pt-4">
          <Flame size={20} className="text-orange-500" />
          <Button className="inline-flex items-center font-medium">
            Play
            <ChevronRight
              size={14}
              className="transition group-hover:translate-x-1"
            />
          </Button>
        </div>
      </FlexColumn>
    </div>
  );
};

export default TestBox;
