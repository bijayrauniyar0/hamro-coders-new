import React from 'react';
import { SendHorizonal as SendHorizontal } from 'lucide-react';

import { Input } from '@Components/common/FormUI';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { discussions } from '@Constants/MockTests';

const Discussions = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="px-4 py-4">
        <p className="text-md text-gray-700 lg:text-base">Discussions</p>
      </div>
      <div className="h-[calc(100vh-14rem)] overflow-y-auto">
        <FlexColumn className="items-start gap-3 px-4 py-4">
          {discussions.map(({ isMe, image, message }, index) => (
            <FlexRow
              key={`discussion-${index}`}
              className={`w-full ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <FlexRow className="items-center gap-4">
                {!isMe && (
                  <img src={image} alt="" className="h-8 w-8 rounded-full" />
                )}
                <div
                  className={`rounded-full px-2 py-1 ${isMe ? 'bg-blue-100' : 'bg-gray-100'}`}
                >
                  <p className="text-sm lg:text-md">{message}</p>
                </div>
              </FlexRow>
            </FlexRow>
          ))}
        </FlexColumn>
      </div>
      <FlexRow className="items-center gap-2 px-4 py-4">
        <Input
          className="!h-fit rounded-full !p-0 !px-4 !py-1 text-md"
          placeholder="Aa"
        />
        <SendHorizontal className="text-primary-600" />
      </FlexRow>
    </div>
  );
};

export default Discussions;
