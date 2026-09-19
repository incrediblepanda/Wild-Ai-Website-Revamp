import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
const logos = [
{
  name: 'Adile Diagnostic',
  logo: '/lovable-uploads/adile-logo.png',
  url: 'https://www.linkedin.com/company/adile-diagnostic-inc/'
}, {
  name: 'Amazon',
  logo: '/lovable-uploads/amazon-logo.png',
  url: 'https://www.amazon.com/'
}, {
  name: 'Attentio',
  logo: '/lovable-uploads/attentio-logo.png',
  url: 'http://attentio.ai/'
}, {
  name: 'BData',
  logo: '/lovable-uploads/bdata-logo.png',
  url: 'https://bdatainc.com/'
}, {
  name: 'BlueFolder',
  logo: '/lovable-uploads/bluefolder-logo.png',
  url: 'https://bluefolder.com/'
}, {
  name: 'Boardwalk Health',
  logo: '/lovable-uploads/boardwalk-logo.png',
  url: 'https://mymeddefend.com/'
}, {
  name: 'Brilliant',
  logo: '/lovable-uploads/brilliant-logo.png?v=2',
  url: 'https://brilliant.org/'
}, {
  name: 'C.H. Robinson',
  logo: '/lovable-uploads/chrobinson-logo.png',
  url: 'https://www.chrobinson.com/'
}, {
  name: 'Calabrio',
  logo: '/lovable-uploads/calabrio-logo.png?v=2',
  url: 'https://www.calabrio.com/'
}, {
  name: 'Caparra',
  logo: '/lovable-uploads/caparra-logo.png',
  url: 'https://caparra.ai/'
}, {
  name: 'Chosn',
  logo: '/lovable-uploads/chosn-logo.png',
  url: 'https://www.chosn.io/'
}, {
  name: 'Crucible Energy',
  logo: '/lovable-uploads/crucible-logo.png',
  url: 'https://crucible.energy/'
}, {
  name: 'Elucid',
  logo: '/lovable-uploads/elucid-logo.svg',
  url: 'https://elucid.com/'
}, {
  name: 'Ever Just',
  logo: '/lovable-uploads/everjust-logo.png',
  url: 'https://www.linkedin.com/company/ever-just/'
}, {
  name: 'EY',
  logo: '/lovable-uploads/ey-logo.png?v=2',
  url: 'https://www.ey.com/'
}, {
  name: 'FlowDevs',
  logo: '/lovable-uploads/flowdevs-logo.png',
  url: 'https://www.flowdevs.io/'
}, {
  name: 'Fulcrum Neuro',
  logo: '/lovable-uploads/fulcrumneuro-logo.png?v=2',
  url: 'https://www.fulcrumneuro.com/'
}, {
  name: 'Gullview Tech',
  logo: '/lovable-uploads/gullview-logo.png?v=2',
  url: 'https://www.gullviewtech.com/'
}, {
  name: 'Hacker Sidekick',
  logo: '/lovable-uploads/hackersidekick-logo.png',
  url: 'https://hackersidekick.com'
}, {
  name: 'Life Time',
  logo: '/lovable-uploads/lifetime-logo.png',
  url: 'https://www.lifetime.life/'
}, {
  name: 'LifeFx',
  logo: '/lovable-uploads/lifefx-logo.png',
  url: 'https://www.lifefxmn.com/'
}, {
  name: 'Medtronic',
  logo: '/lovable-uploads/medtronic-logo.png',
  url: 'https://www.medtronic.com/en-us/index.html'
}, {
  name: 'Monkey Island',
  logo: '/lovable-uploads/monkeyisland-logo.png?v=2',
  url: 'https://www.monkeyislandventures.com/'
}, {
  name: 'Ovul',
  logo: '/lovable-uploads/ovul-logo.png',
  url: 'https://ovul.ai/'
}, {
  name: 'Quantified Mechanix',
  logo: '/lovable-uploads/quantifiedmechanix-logo.png?v=2',
  url: 'https://quantifiedmechanix.com/'
}, {
  name: 'Rainmaker',
  logo: '/lovable-uploads/rainmaker-logo.png?v=2',
  url: 'https://www.rainmakergrows.com/'
}, {
  name: 'Remarketspace',
  logo: '/lovable-uploads/remarketspace-logo.png',
  url: 'https://www.remarketspace.com/'
}, {
  name: 'Simplify AI',
  logo: '/lovable-uploads/simplifyai-logo.png',
  url: 'https://www.simplifyaisolutions.com/'
}, {
  name: 'Skail',
  logo: '/lovable-uploads/skail-logo.svg',
  url: 'https://skail.ai/'
}, {
  name: 'St. Thomas',
  logo: '/lovable-uploads/stthomas-logo.png',
  url: 'https://www.stthomas.edu/'
}, {
  name: 'Submitta',
  logo: '/lovable-uploads/submitta-logo.png',
  url: 'https://www.linkedin.com/company/submitta/'
}, {
  name: 'Talknician',
  logo: '/lovable-uploads/talknician-logo.png',
  url: 'https://www.talknician.com/'
}, {
  name: 'TSL Consulting',
  logo: '/lovable-uploads/tslconsulting-logo.png?v=2',
  url: 'https://tslconsulting.in/'
}, {
  name: 'U of Minnesota',
  logo: '/lovable-uploads/umn-logo.png?v=2',
  url: 'https://www.umn.edu/'
}, {
  name: 'UMN Morris',
  logo: '/lovable-uploads/umnmorris-logo.png?v=2',
  url: 'https://www.morris.umn.edu/'
}, {
  name: 'Univ. Paris-Saclay',
  logo: '/lovable-uploads/paris-saclay-logo.png',
  url: 'http://www.universite-paris-saclay.fr/fr'
}, {
  name: 'UST Nexus',
  logo: '/lovable-uploads/ustnexus-logo.png',
  url: 'https://ustnexus.club/'
}, {
  name: 'VirtualGo',
  logo: '/lovable-uploads/virtualgo-logo.png',
  url: 'https://www.virtualgoreality.com/'
}, {
  name: 'We Network Now',
  logo: '/lovable-uploads/wenetworknow-logo.png?v=2',
  url: 'https://wenetworknow.org/'
}, {
  name: 'Withum',
  logo: '/lovable-uploads/withum-logo.png?v=2',
  url: 'https://www.withum.com/'
}, {
  name: 'Xcel Energy',
  logo: '/lovable-uploads/xcelenergy-logo.png',
  url: 'https://www.xcelenergy.com/'
}];
const LogoCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const scrollPositionRef = useRef(0);
  const dragStartRef = useRef({
    x: 0,
    scrollLeft: 0
  });
  const scrollByAmount = useCallback((amount: number) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    scrollPositionRef.current += amount;
    const singleSetWidth = scrollContainer.scrollWidth / 3;

    // Handle wrapping
    if (scrollPositionRef.current >= singleSetWidth) {
      scrollPositionRef.current = scrollPositionRef.current - singleSetWidth;
    } else if (scrollPositionRef.current < 0) {
      scrollPositionRef.current = singleSetWidth + scrollPositionRef.current;
    }
    scrollContainer.scrollTo({
      left: scrollPositionRef.current,
      behavior: 'smooth'
    });
  }, []);
  const scrollLeft = useCallback(() => {
    scrollByAmount(-200);
  }, [scrollByAmount]);
  const scrollRight = useCallback(() => {
    scrollByAmount(200);
  }, [scrollByAmount]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    setIsDragging(true);
    setIsPaused(true);
    dragStartRef.current = {
      x: e.pageX - scrollContainer.offsetLeft,
      scrollLeft: scrollContainer.scrollLeft
    };
  }, []);
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - dragStartRef.current.x) * 1.5; // Scroll speed multiplier
    const newScrollLeft = dragStartRef.current.scrollLeft - walk;
    scrollContainer.scrollLeft = newScrollLeft;
    scrollPositionRef.current = newScrollLeft;
  }, [isDragging]);
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
    setIsPaused(false);
  }, [isDragging]);
  // Auto-scroll on both desktop and mobile
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let animationId: number;
    const scrollSpeed = 1.2;
    const scroll = () => {
      if (!isPaused && !isDragging && scrollContainer) {
        scrollPositionRef.current += scrollSpeed;
        const singleSetWidth = scrollContainer.scrollWidth / 3;
        if (scrollPositionRef.current >= singleSetWidth) {
          scrollPositionRef.current = 0;
        }
        scrollContainer.scrollLeft = scrollPositionRef.current;
      }
      animationId = requestAnimationFrame(scroll);
    };
    animationId = requestAnimationFrame(scroll);
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused, isDragging]);

  // Sync scroll position when user manually scrolls (for mobile swipe)
  const handleScroll = useCallback(() => {
    if (isMobile && scrollRef.current) {
      scrollPositionRef.current = scrollRef.current.scrollLeft;
    }
  }, [isMobile]);

  // Triple the logos for seamless infinite loop
  const displayLogos = [...logos, ...logos, ...logos];
  
  return <section className="py-4 md:py-4 bg-secondary/20 overflow-x-clip overflow-y-visible">
      
      <div className="relative py-6">
        {/* Left Arrow */}
        

        {/* Right Arrow */}
        

        <div ref={scrollRef} className={`flex ${isMobile ? 'overflow-x-auto touch-pan-x' : 'overflow-x-hidden'} overflow-y-visible scrollbar-hide select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} onMouseDown={!isMobile ? handleMouseDown : undefined} onMouseMove={!isMobile ? handleMouseMove : undefined} onMouseUp={!isMobile ? handleMouseUp : undefined} onMouseLeave={!isMobile ? handleMouseLeave : undefined} onMouseEnter={() => !isDragging && !isMobile && setIsPaused(true)} onTouchStart={() => setIsPaused(true)} onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)} onScroll={handleScroll} style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex items-center gap-6 md:gap-8 px-16 md:px-20 py-4">
            {displayLogos.map((company, index) => {
              const needsDarkBg = company.name === 'Gullview Tech' || company.name === 'Attentio';
              const isHovered = hoveredIndex === index;
              
              return (
                <a 
                  key={`${company.name}-${index}`} 
                  href={company.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-shrink-0"
                  onClick={e => {
                    if (isDragging) {
                      e.preventDefault();
                    }
                  }} 
                  draggable={false}
                  onMouseEnter={() => {
                    if (!isMobile) {
                      setHoveredIndex(index);
                      setIsPaused(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      setHoveredIndex(null);
                    }
                  }}
                  style={{
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: isHovered ? 10 : 1,
                  }}
                >
                  <div 
                    className="bg-secondary/40 p-5 md:p-8 rounded-xl cyberpunk-border flex flex-col items-center justify-between w-40 md:w-52 h-40 md:h-52"
                    style={{
                      backgroundColor: isHovered ? 'hsl(var(--secondary) / 0.7)' : undefined,
                      boxShadow: isHovered ? '0 20px 40px -10px rgba(0, 255, 200, 0.15)' : 'none',
                      transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
                    }}
                  >
                    <div className="flex-1 flex items-center justify-center">
                      <img 
                        src={company.logo} 
                        alt={company.name} 
                        className={`h-16 md:h-24 w-auto object-contain pointer-events-none rounded-md p-1 ${needsDarkBg ? 'bg-gray-800' : 'bg-white/90'}`}
                        style={{
                          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                          transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        loading="lazy" 
                        draggable={false} 
                      />
                    </div>
                    <p 
                      className="text-center font-mono text-xs md:text-sm w-full leading-tight"
                      style={{
                        color: isHovered ? 'hsl(var(--wildai-mint))' : 'hsl(var(--muted-foreground))',
                        transition: 'color 0.2s ease',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        wordBreak: 'break-word',
                      }}
                    >
                      {company.name}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>;
};
export default LogoCarousel;