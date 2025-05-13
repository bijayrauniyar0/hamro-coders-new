import React from 'react';
import { Camera } from 'lucide-react';

import { FlexColumn } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';

const ProfilePicUploadModal = () => {
  return (
    <FlexColumn className="gap-5">
      <img src="" alt="" className="h-48 w-48 rounded-full" />
      <Button variant="outline">
        <Camera /> Change Image
      </Button>
    </FlexColumn>
  );
};

export default ProfilePicUploadModal;
