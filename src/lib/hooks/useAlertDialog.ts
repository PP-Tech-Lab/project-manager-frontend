import { AlertState, hideAlert, showAlert } from '@/lib/stores/alert.slice';
import { useAppDispatch } from '@/lib/stores/hooks';

export const useAlertDialog = () => {
  const dispatch = useAppDispatch();

  const openDialog = (dialogData: Omit<AlertState, 'open'>) => {
    dispatch(showAlert(dialogData));
  };

  const closeDialog = () => {
    dispatch(hideAlert());
  };

  return {
    openDialog,
    closeDialog
  };
};
