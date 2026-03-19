'use client';

import {
  AlertDialog as SHAlertDialog, AlertDialogAction,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { AlertState, hideAlert } from '@/lib/stores/alert.slice';
import { useAppDispatch } from '@/lib/stores/hooks';
import { useTranslations } from 'next-intl';

export const ErrorDialog = (props: AlertState) => {
  const t = useTranslations('common');
  const dispatch = useAppDispatch();

  const handleConfirm = () => {
    dispatch(hideAlert());
  };

  return (
    <SHAlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleConfirm}>
            {props.confirmText || t('alert.ok')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </SHAlertDialog>
  );
};
