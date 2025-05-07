import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@Components/radix/alert-dialog';

interface IConfirmationDialogProps {
  triggerChildren?: React.ReactNode;
  title?: string;
  description?: string;
  handleConfirm?: () => void;
  handleCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}
export function ConfirmationDialog({
  triggerChildren,
  description,
  handleCancel,
  handleConfirm,
  confirmText = 'Continue',
  cancelText = 'Cancel',
  title = 'Are you absolutely sure?',
}: IConfirmationDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {triggerChildren || 'Show'}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white max-sm:w-11/12 rounded-lg">
        <AlertDialogHeader>
          <p className='text-base md:text-lg font-semibold leading-3 md:leading-normal lg:text-xl'> {title}</p>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className=''>
          <AlertDialogCancel
            onClick={() => {
              if (handleCancel) handleCancel();
            }}
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (handleConfirm) handleConfirm();
            }}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
