import {
  AlertDialog as SHAlertDialog, AlertDialogAction,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { AlertDialogProps } from '@/components/shared/alert/types/alert-dialog-props.interface';

//t('failed-login.title')
//t('failed-login.description')
//t('failed-login.confirm')
export const ErrorDialog = (props: AlertDialogProps) => {
  return (
    <SHAlertDialog open={props.show} onOpenChange={(open) => !open && !!props.onClose && props.onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>{props.confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </SHAlertDialog>
  );
};
