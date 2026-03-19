import { AlertDialogProps } from '@/components/shared/alert/types/alert-dialog-props.interface';
import { ErrorDialog } from '@/components/shared/alert/components/error-dialog';

export const AlertDialog = (props: AlertDialogProps) => {

  if (!props.show) return;
  if (props.type === 'error') return <ErrorDialog {...props}/>;
};
