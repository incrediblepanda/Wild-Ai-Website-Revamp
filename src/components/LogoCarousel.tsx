import React from 'react';
import Marquee from '@/components/motion/Marquee';
import Reveal from '@/components/motion/Reveal';
import { logos, type CompanyLogo } from '@/data/companyLogos';

const LogoMark = ({ company }: { company: CompanyLogo }) => (
  <a
    href={company.url}
    target="_blank"
    rel="noopener noreferrer"
    title={company.name}
    className="logo-mark group flex h-14 w-28 flex-shrink-0 items-center justify-center px-3 md:h-20 md:w-44 md:px-5"
  >
    <img
      src={company.logo}
      alt={company.name}
      loading="lazy"
      draggable={false}
      className="max-h-7 w-auto max-w-full object-contain md:max-h-10"
      style={{ filter: 'url(#logo-mono' + (company.tone ? '-' + company.tone : '') + ')' }}
    />
  </a>
);

/** Two counter-scrolling rows of companies represented at Wild AI events. */
const LogoCarousel = () => {
  const half = Math.ceil(logos.length / 2);
  const rows = [logos.slice(0, half), logos.slice(half)];

  return (
    <section className="pb-10 md:pb-14">
      {/* Dark ink becomes light, white backgrounds drop out; works for opaque and transparent logos. */}
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <filter id="logo-mono" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.93  0 0 0 0 0.96  0 0 0 0 0.95  -0.34 -1.144 -0.1155 0 1.36"
            result="knock"
          />
          <feComposite in="knock" in2="SourceAlpha" operator="in" />
        </filter>
        <filter id="logo-mono-dark-bg" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.93  0 0 0 0 0.96  0 0 0 0 0.95  0.5315 1.788 0.1805 0 -0.7"
            result="knock"
          />
          <feComposite in="knock" in2="SourceAlpha" operator="in" />
        </filter>
        <filter id="logo-mono-light-ink" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.93  0 0 0 0 0.96  0 0 0 0 0.95  0.2126 0.7152 0.0722 0 0"
            result="knock"
          />
          <feComposite in="knock" in2="SourceAlpha" operator="in" />
        </filter>
        <filter id="logo-mono-deep-bg" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.93  0 0 0 0 0.96  0 0 0 0 0.95  1.7 5.72 0.58 0 -0.35"
          />
        </filter>
      </svg>
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="glass overflow-hidden">
            <div className="flex items-baseline justify-between gap-4 border-b border-border/60 px-5 py-4 md:px-8">
              <p className="font-display text-base font-semibold">Builders here work at</p>
              <span className="kicker">{logos.length} companies</span>
            </div>

            <div className="py-3 md:py-4">
              <Marquee speed={70}>
                {rows[0].map((company) => (
                  <LogoMark key={company.name} company={company} />
                ))}
              </Marquee>
              <div className="mx-5 h-px bg-border/40 md:mx-8" />
              <div className="[&_.animate-marquee]:[animation-direction:reverse]">
                <Marquee speed={82}>
                  {rows[1].map((company) => (
                    <LogoMark key={company.name} company={company} />
                  ))}
                </Marquee>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default LogoCarousel;
