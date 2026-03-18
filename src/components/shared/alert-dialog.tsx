'use client';

import {
  AlertDialog as SHAlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { useTranslations } from 'next-intl';

interface Props {
  show: boolean;
  onClose: () => void;
}

export const AlertDialog = ({ show, onClose }: Props) => {
  const t = useTranslations("auth")

  return (
    <SHAlertDialog open={show} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('failed-login.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('failed-login.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogAction>{t('failed-login.confirm')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </SHAlertDialog>
  );
};
