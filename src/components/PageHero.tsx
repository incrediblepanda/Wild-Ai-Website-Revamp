import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface PageHeroProps {
  eyebrow?: string;
  icon?: LucideIcon;
  title: React.ReactNode;
  lede?: React.ReactNode;
  aside?: React.ReactNode;
  children?: React.ReactNode;
}

/** Shared opening band for every page other than the homepage. */
const PageHero = ({ eyebrow, icon: Icon, title, lede, aside, children }: PageHeroProps) => (
  <section className="page-hero">
    <div className="page-hero__wash" aria-hidden="true" />
    <div className="hero-grain" aria-hidden="true" />

    <div className="container relative mx-auto px-4">
      <div className="grid gap-10 lg:grid-cols-[1.5fr_auto] lg:items-end">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="signal-label mb-5">
              {Icon && <Icon />}
              {eyebrow}
            </p>
          )}
          <h1 className="page-hero__title">{title}</h1>
          {lede && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {lede}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>}
        </div>
        {aside && <div className="page-hero__aside">{aside}</div>}
      </div>
    </div>
  </section>
);

export default PageHero;
