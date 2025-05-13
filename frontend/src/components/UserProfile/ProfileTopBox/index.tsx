import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Camera, Pencil, Settings } from 'lucide-react';

import Avatar from '@Components/common/Avatar';
import { ConfirmationDialog } from '@Components/common/Confirmation';
import { FlexColumn } from '@Components/common/Layouts';
import Modal from '@Components/common/Modal';
import { Button } from '@Components/radix/Button';
import { DialogFooter } from '@Components/radix/Dialog';
import { getInitialsFromName } from '@Utils/index';
import { resizeImageToFile } from '@Utils/resizeImage';
import useAuthStore from '@Store/auth';
import { useCommonStore } from '@Store/common';
import { useUserProfileUpdate } from '@Api/User';
const ProfileTopBox = () => {
  const toggleModal = useCommonStore(state => state.toggleModal);
  const [avatar, setAvatar] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>('');
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const queryClient = useQueryClient();
  const userProfile = useAuthStore(state => state.userProfile);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      resizeImageToFile(file, (dataUrl, file) => {
        setPreviewImage(dataUrl);
        setAvatar(file);
      });
      setShowImageUploadModal(true);
    }
    e.target.value = ''; // Reset the input value
  };

  const handleCancel = () => {
    setAvatar(undefined);
    setPreviewImage('');
    setShowImageUploadModal(false);
    setShowConfirmationDialog(false);
  };
  const { mutate, isPending } = useUserProfileUpdate({
    onSuccess: () => {
      setShowImageUploadModal(false);
      setAvatar(undefined);
      setPreviewImage('');
      queryClient.invalidateQueries({ queryKey: ['getUserProfile'] });
    },
  });

  const handleSubmit = () => {
    if (avatar) {
      mutate({ avatar });
    }
  };

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 max-sm:items-center lg:flex-row lg:items-center">
          <div className="relative h-fit w-fit shrink-0 rounded-full">
            <Avatar
              src={userProfile?.avatar}
              alt=""
              className="h-32 w-32 bg-primary-500 lg:h-36 lg:w-36"
              fallback={getInitialsFromName(userProfile.name)}
            />
            <button className="absolute bottom-0 right-0 flex h-8 w-8 -translate-y-2 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200 transition-all duration-200 hover:bg-gray-200">
              <input
                type="file"
                name="profile"
                id="profile"
                className="absolute cursor-pointer opacity-0"
                onChange={handleImageChange}
              />
              <Camera fill="#1f2937" className="h-7 w-7 text-gray-200" />
            </button>
          </div>
          <div className="flex w-full flex-col max-sm:gap-4 sm:flex-row sm:items-end sm:justify-between">
            <FlexColumn className="w-full gap-2">
              <p className="text-xl font-semibold max-sm:text-center md:text-2xl lg:text-4xl">
                Bijay Rauniyar
              </p>
              <p className="max-sm:text-center">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae,
                quis.
              </p>
            </FlexColumn>
            <div className="flex flex-row gap-2 sm:flex-col">
              <Button
                variant="primary"
                onClick={() => toggleModal('edit-profile')}
                className="max-md:w-full"
              >
                <Pencil className="h-4 w-4 md:h-5 md:w-5" />
                Edit
              </Button>
              <Button
                variant="outline"
                onClick={() => toggleModal('edit-profile')}
                className="max-md:w-full"
              >
                <Settings className="h-4 w-4 md:h-5 md:w-5" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Change Profile Picture"
        show={showImageUploadModal}
        onClose={() => {
          setShowConfirmationDialog(true);
        }}
      >
        <FlexColumn className="items-center gap-5">
          <div className="relative h-fit w-fit shrink-0 rounded-full">
            <img
              src={previewImage}
              alt=""
              className="aspect-square h-40 w-40 rounded-full border-4 shadow-sm lg:h-48 lg:w-48"
            />
            <button className="absolute bottom-0 right-0 flex h-8 w-8 -translate-x-2 -translate-y-4 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200 transition-all duration-200 hover:bg-gray-200">
              <input
                type="file"
                name=""
                id=""
                className="absolute cursor-pointer opacity-0"
                onChange={handleImageChange}
              />
              <Camera fill="#1f2937" className="h-7 w-7 text-gray-200" />
            </button>
          </div>
        </FlexColumn>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setShowConfirmationDialog(true);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            isLoading={isPending}
            disabled={isPending}
            onClick={() => {
              handleSubmit();
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </Modal>
      {showConfirmationDialog && (
        <div className="z-[10000]">
          <ConfirmationDialog
            overlayClassName="bg-white/70"
            title="Discard Changes?"
            description="Are you sure that you want to discard your changes?"
            confirmText="Discard"
            triggerChildren={<></>}
            handleCancel={() => {
              setShowConfirmationDialog(false);
            }}
            handleConfirm={handleCancel}
          />
        </div>
      )}
    </>
  );
};

export default ProfileTopBox;
