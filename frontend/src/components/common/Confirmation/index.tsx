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
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <p className='text-base font-semibold'> {title}</p>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
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
