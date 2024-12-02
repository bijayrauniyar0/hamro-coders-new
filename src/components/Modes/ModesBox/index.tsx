import React, { useState } from 'react';
import timeImg from '@Assets/images/time.jpg';
import Icon from '@Components/common/Icon';
import { FlexColumn } from '@Components/common/Layouts';
import Modal from '@Components/common/Modal';
import Portal from '@Components/common/Layouts/Portal';
const ModeBox = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <>
      <FlexColumn className="gap-2">
        <div className="relative h-[12rem] w-full rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:grayscale-[0.5] hover:backdrop-blur-[1px]">
          <div className="h-full w-full">
            <img
              src={timeImg}
              alt=""
              className="h-full w-full object-contain"
            />
          </div>
          <Icon
            name="info"
            className="absolute right-2 top-2 z-50"
            onClick={() => {
              setIsPopoverOpen(true);
            }}
          />
        </div>
        <p className="text-base font-semibold">Rapid Mode</p>
      </FlexColumn>
      {isPopoverOpen && (
        <Portal className="w-full">
          <Modal
            onClose={() => setIsPopoverOpen(false)}
            show
            title="Rapid Mode"
            titleClassName="text-[1.5rem]"
            className="border shadow-lg"
          >
            <div>
              <p>Some content</p>
            </div>
          </Modal>
        </Portal>
      )}
    </>
  );
};

export default ModeBox;
