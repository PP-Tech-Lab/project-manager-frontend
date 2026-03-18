'use client';

import { OverlayLoaderContainer } from '@/components/loader/styled';
import { LoaderCircle } from 'lucide-react';
import { useAppSelector } from '@/lib/stores/hooks';

export const OverlayLoader = () => {
  const { isOpen, message } = useAppSelector((state) => state.ui.loader);

  if (!isOpen) return null;

  return (
    <OverlayLoaderContainer>
      <div className="flex flex-col items-center gap-4">
        <LoaderCircle className="animate-spin" size={48} />
        {message && <p className="text-white font-medium text-lg">{message}</p>}
      </div>
    </OverlayLoaderContainer>
  );
};
