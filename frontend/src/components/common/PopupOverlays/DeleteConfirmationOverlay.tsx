import { Button } from '@Components/radix/Button';
import { IOverlayComponentProps } from '@Constants/interface';
import Icon from '../Icon';
import Alert from '../Alert';

interface IDeleteConfirmationOverlayProps extends IOverlayComponentProps {
  onDelete: () => any;
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
}
export default function DeleteConfirmationOverlay({
  onClose,
  onDelete,
  isLoading,
  isError,
  error,
}: IDeleteConfirmationOverlayProps) {
  return (
    <div
      id="file-editor"
      className="w-min-h-[9.625rem] absolute left-1/2 top-1/2 flex min-w-[32rem] -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg border border-gray-300 bg-white p-6 transition-all duration-200"
    >
      <div className="content flex flex-col gap-4">
        <div className="head flex flex-col gap-2">
          <h5 className="!font-bold text-matt-200">Delete</h5>
          <p className="body-md font-normal text-matt-200">
            Are you sure want to delete?
          </p>
        </div>
        <div className="actions flex w-full items-center justify-end gap-1">
          <Button
            variant="link"
            onClick={e => {
              e.stopPropagation();
              // onDelete();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="!bg-other-red flex gap-2 hover:bg-red-700 hover:font-bold"
            isLoading={isLoading}
            onClick={e => {
              e.stopPropagation();
              onDelete();
              // onClose();
            }}
          >
            <Icon name="delete" />
            <p className="button">Delete</p>
          </Button>
        </div>
        {isError && <Alert message={error?.message} error />}
      </div>
    </div>
  );
}
