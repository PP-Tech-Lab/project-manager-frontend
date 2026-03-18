import { OverlayLoaderContainer } from '@/components/loader/styled';
import { LoaderCircle } from 'lucide-react';

export const OverlayLoader = () => {
  return  (
    <OverlayLoaderContainer>
      <LoaderCircle/>
    </OverlayLoaderContainer>
  )
}
