import { ReactNode } from 'react';
import { Tooltip as BaseTooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface TooltipProps {
  children: ReactNode;
  content: string;
}

export const Tooltip = (props: TooltipProps) => {
  return (
    <BaseTooltip>
      <TooltipTrigger asChild>
        {props.children}
      </TooltipTrigger>
      <TooltipContent>
        <p>{props.content}</p>
      </TooltipContent>
    </BaseTooltip>
  );
};
