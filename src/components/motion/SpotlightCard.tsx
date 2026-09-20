import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  [key: string]: unknown;
}

/** Card surface with a soft accent glow that follows the cursor. */
const SpotlightCard = ({ as: Tag = 'div', className, children, ...rest }: SpotlightCardProps) => {
  const handleMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    target.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  }, []);

  return (
    <Tag
      onMouseMove={handleMove}
      className={cn('surface surface-interactive spotlight', className)}
      {...rest}
    >
      <div className="relative z-10 h-full">{children}</div>
    </Tag>
  );
};

export default SpotlightCard;
