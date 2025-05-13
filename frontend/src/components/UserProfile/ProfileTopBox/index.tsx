/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Camera, Pencil } from 'lucide-react';

import { FlexColumn } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import founderImg from '@Assets/images/founder.jpg';
const ProfileTopBox = () => {
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);
  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 max-md:items-center lg:flex-row lg:items-center">
          <div className="relative h-fit w-fit rounded-full">
            <img
              src={founderImg}
              alt=""
              className="aspect-square h-32 w-32 rounded-full border-4 border-primary-500 bg-primary-500 lg:h-36 lg:w-36"
            />
            <div className="absolute bottom-0 right-0 flex h-8 w-8 -translate-y-2 cursor-pointer items-center justify-center rounded-full bg-gray-200 transition-all duration-200 hover:bg-gray-200">
              <Camera fill="#1f2937" className="h-7 w-7 text-gray-200" />
            </div>
          </div>
          <div className="flex flex-col max-md:gap-4 md:flex-row md:items-end md:justify-between">
            <FlexColumn className="w-full gap-2">
              <p className="text-xl font-semibold max-md:text-center md:text-2xl lg:text-4xl">
                Bijay Rauniyar
              </p>
              <p className="max-md:text-center">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae,
                quis.
              </p>
            </FlexColumn>
            <Button
              variant="primary"
              onClick={() => setIsProfileEditorOpen(true)}
            >
              <Pencil className="h-4 w-4 md:h-5 md:w-5" />
              Edit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTopBox;
