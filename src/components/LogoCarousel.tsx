import React from 'react';
import Marquee from '@/components/motion/Marquee';
import Reveal from '@/components/motion/Reveal';
import { logos, type CompanyLogo } from '@/data/companyLogos';

const DARK_BG_LOGOS = new Set(['Gullview Tech', 'Attentio']);

const LogoTile = ({ company }: { company: CompanyLogo }) => (
  <a
    href={company.url}
    target="_blank"
    rel="noopener noreferrer"
    title={company.name}
    className="group mx-2 flex h-20 w-36 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-card/40 px-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-card/80 md:h-24 md:w-44"
  >
    <img
      src={company.logo}
      alt={company.name}
      loading="lazy"
      draggable={false}
      className={`max-h-10 w-auto max-w-full object-contain opacity-55 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:max-h-12 ${
        DARK_BG_LOGOS.has(company.name) ? 'rounded bg-secondary p-1' : 'rounded bg-foreground/85 p-1.5'
      }`}
    />
  </a>
);

/** Two counter-scrolling rows of companies represented at Wild AI events. */
const LogoCarousel = () => {
  const half = Math.ceil(logos.length / 2);
  const rows = [logos.slice(0, half), logos.slice(half)];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <Reveal>
          <p className="kicker mb-6 text-center">Builders here work at</p>
        </Reveal>
      </div>

      <Reveal delay={80} className="space-y-3">
        <Marquee speed={62}>
          {rows[0].map((company) => (
            <LogoTile key={company.name} company={company} />
          ))}
        </Marquee>
        <div className="[&_.animate-marquee]:[animation-direction:reverse]">
          <Marquee speed={74}>
            {rows[1].map((company) => (
              <LogoTile key={company.name} company={company} />
            ))}
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
};

export default LogoCarousel;
