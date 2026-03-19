'use client';

import { ErrorDialog } from '@/components/shared/alert/components/error-dialog';
import { useAppSelector } from '@/lib/stores/hooks';

export const AlertDialog = () => {
  const alertData = useAppSelector((state) => state.alert);

  if (!alertData.open) return;
  if (alertData.type === 'error') return <ErrorDialog {...alertData}/>;
};
