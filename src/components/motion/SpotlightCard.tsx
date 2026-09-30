import React from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  [key: string]: unknown;
}

/** Bordered card surface with a restrained hover lift. */
const SpotlightCard = ({ as, className, children, ...rest }: SpotlightCardProps) => {
  const Tag = (as ?? 'div') as React.ElementType;
  return (
    <Tag className={cn('surface surface-interactive', className)} {...rest}>
      {children}
    </Tag>
  );
};

export default SpotlightCard;
