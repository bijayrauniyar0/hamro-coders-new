import React from 'react';

import info from '@Assets/images/info.svg';
import { cn } from '@Utils/index';

interface IToolTipProps {
  tooltipInfo: Record<string, any>[];
  className?: string;
}

const FormTooltip = ({ tooltipInfo, className }: IToolTipProps) => {
  return (
    <div
      className={cn(
        'scrollbar h-full overflow-y-auto rounded-2xl bg-white px-5 pb-5 md:px-6',
        className,
      )}
    >
      <div className="flex flex-col">
        <div className="sticky top-0 flex items-center justify-start space-x-3 bg-white py-6">
          <img
            src={info}
            className="h-[2rem] w-[2rem]"
            alt=""
            style={{ objectFit: 'cover' }}
          />
          <h6 className="text-matt-100">Info</h6>
        </div>
        <div className="flex flex-col items-start justify-start gap-4">
          {tooltipInfo.map((tooltip: Record<string, any>, index: number) => (
            <div key={index} className="flex flex-col gap-3">
              <span className="body-btn text-matt-100">{tooltip.title}</span>
              <span className="body-sm text-matt-200">
                {tooltip.description}
              </span>

              {index !== tooltipInfo.length - 1 && (
                <div className="w-full border-b-[0.5px] border-[#D6D6D5]">
                  <></>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormTooltip;
