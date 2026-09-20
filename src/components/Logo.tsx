import React from 'react';
import { cn } from '@/lib/utils';

export const LOGO_SRC =
  'https://cdn.builder.io/api/v1/image/assets%2F52185cbc63e544f6abfcb901069ce1f1%2F4d61595e1afd4fb2b93eff06a8c7b61e?format=webp&width=800';

interface LogoProps {
  className?: string;
  /** Sits the mark on a deep-green plate so it holds up on light bands too. */
  plated?: boolean;
}

const Logo = ({ className, plated = false }: LogoProps) => {
  const image = (
    <img
      src={LOGO_SRC}
      alt="Wild AI"
      className={cn('w-auto object-contain', plated ? 'h-6' : 'h-8', className)}
    />
  );

  if (!plated) return image;

  return (
    <span className="inline-flex items-center rounded-md bg-primary px-2.5 py-1.5">{image}</span>
  );
};

export default Logo;
