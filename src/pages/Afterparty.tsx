import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import Footer from '@/components/Footer';
import LoonCafeMap from '@/components/LoonCafeMap';
import { MapPin } from 'lucide-react';
const Afterparty = () => {
  const isMobile = useIsMobile();
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-8 md:pt-24 md:pb-12 flex items-center relative">
        <div className="absolute top-16 left-0 w-full flex justify-center">
          <img src="/lovable-uploads/4b758e76-3d87-4964-9506-d66b3fa83e25.png" alt="Wild AI Logo" className={`${isMobile ? 'h-32 max-w-full' : 'h-48 md:h-64'} w-auto object-contain mix-blend-lighten`} />
        </div>
        
        <div className={`container mx-auto px-4 ${isMobile ? 'mt-36' : 'mt-56 md:mt-64'}`}>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gradient">Wild AI Afterparty</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join us after <a href="https://events.humanitix.com/minnedemo41?c=wildai" target="_blank" rel="noopener noreferrer" className="text-wildai-mint underline hover:underline">Minnedemo</a> to keep the conversation going!
            </p>

            <div className="inline-block px-6 py-3 bg-secondary/60 rounded-lg mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-wildai-mint" />
                <span className="text-sm font-mono text-wildai-mint">4 minute walk from Ordway Theater</span>
              </div>
              <p className="text-sm md:text-base text-muted-foreground font-mono text-center">
                <span className="block md:inline">December 15, 2025</span>
                <span className="hidden md:inline"> • </span>
                <span className="block md:inline">10:00 PM</span>
                <span className="hidden md:inline"> • </span>
                <span className="block md:inline">Loon Cafe, St. Paul MN</span>
                <span className="hidden md:inline"> </span>
                <span className="block md:inline text-xs md:text-sm">(after Minnedemo)</span>
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <LoonCafeMap />
            </div>
          </div>
        </div>
      </section>

      {/* About WildAI Section */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title mb-6">About Wild AI</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-4">
              Wild AI is a community where Minnesota's top AI builders and entrepreneurs come together each month to share, challenge, and sharpen ideas.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              We spotlight three people each month — no slides, no demos, just a mic. Speakers share who they are, what they're working on, or a perspective they bring. After the talks, it's all conversation and connection over a beer.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              This is where engineers, founders, students, and researchers push AI forward, and where new ideas and companies take shape.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              AI is still wild — an uncharted frontier — and the best way to explore it is together.
            </p>
            <a href="https://www.meetup.com/wild-ai/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-wildai-mint hover:bg-wildai-mint/90 text-wildai-teal text-lg">
                Visit Our Meetup Page
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Startup Spotlight Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-title text-center mb-6">Community Startup Spotlight</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              These are the amazing startups from our Wild AI community. Click a logo to learn more.
            </p>
            
            {/* Premier Featured Startup */}
            <div className="mb-16">
              <div className="flex justify-center">
                <a href="http://attentio.ai/" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="bg-secondary/60 p-12 rounded-lg cyberpunk-border hover:bg-secondary/80 transition-all duration-300 flex flex-col items-center justify-center min-h-[300px] max-w-md w-full animate-fade-in">
                    <img src="/lovable-uploads/attentio-logo.png" alt="Attentio" className="h-40 w-auto object-contain mb-6 group-hover:scale-110 transition-transform" />
                    <p className="text-center font-mono text-xl text-wildai-mint">
                      Attentio
                    </p>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[{
              name: 'Skail',
              logo: '/lovable-uploads/skail-logo.svg',
              url: 'https://skail.ai/'
            }, {
              name: 'Ovul',
              logo: '/lovable-uploads/ovul-logo.png?v=2',
              url: 'https://ovul.ai/'
            }, {
              name: 'Submitta',
              logo: '/lovable-uploads/submitta-logo.png?v=2',
              url: 'https://www.linkedin.com/company/submitta/'
            }, {
              name: 'Simplify AI Solutions',
              logo: '/lovable-uploads/simplifyai-logo.png',
              url: 'https://www.simplifyaisolutions.com/'
            }, {
              name: 'VirtualGo',
              logo: '/lovable-uploads/virtualgo-logo.png',
              url: 'https://www.virtualgoreality.com/'
            }, {
              name: 'Remarketspace',
              logo: '/lovable-uploads/remarketspace-logo.png?v=2',
              url: 'https://www.remarketspace.com/'
            }, {
              name: 'Boardwalk Health',
              logo: '/lovable-uploads/boardwalk-logo.png?v=2',
              url: 'https://mymeddefend.com/'
            }, {
              name: 'LifeFx',
              logo: '/lovable-uploads/lifefx-logo.png?v=2',
              url: 'https://www.lifefxmn.com/'
            }, {
              name: 'Crucible Energy',
              logo: '/lovable-uploads/crucible-logo.png?v=2',
              url: 'https://crucible.energy/'
            }, {
              name: 'Adile Diagnostic',
              logo: '/lovable-uploads/adile-logo.png?v=2',
              url: 'https://www.linkedin.com/company/adile-diagnostic-inc/'
            }, {
              name: 'Ever Just',
              logo: '/lovable-uploads/everjust-logo.png?v=2',
              url: 'https://www.linkedin.com/company/ever-just/'
            }, {
              name: 'UST Nexus',
              logo: '/lovable-uploads/ustnexus-logo.png?v=3',
              url: 'https://ustnexus.club/'
            }, {
              name: 'BData',
              logo: '/lovable-uploads/bdata-logo.png?v=2',
              url: 'https://bdatainc.com/'
            }, {
              name: 'Chosn',
              logo: '/lovable-uploads/chosn-logo.png?v=2',
              url: 'https://www.chosn.io/'
            }, {
              name: 'FlowDevs',
              logo: '/lovable-uploads/flowdevs-logo.png?v=2',
              url: 'https://www.flowdevs.io/'
            }, {
              name: 'Caparra',
              logo: '/lovable-uploads/caparra-logo.png?v=4',
              url: 'https://caparra.ai/'
            }].map((startup, index) => <a key={index} href={startup.url} target="_blank" rel="noopener noreferrer" className="group">
                  <div className="bg-secondary/40 p-6 rounded-lg cyberpunk-border hover:bg-secondary/60 transition-all duration-300 flex flex-col items-center justify-center min-h-[200px]">
                    <img src={startup.logo} alt={startup.name} className="h-24 w-auto object-contain mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-center font-mono text-sm text-muted-foreground group-hover:text-wildai-mint transition-colors">
                      {startup.name}
                    </p>
                  </div>
                </a>)}
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center mb-12">Working on something cool? sign up to speak at a future meetup</h2>
            
            <div className="text-center mb-12">
              <a href="/#register">
                <Button size="lg" className="bg-wildai-mint hover:bg-wildai-mint/90 text-wildai-teal text-lg mb-8">
                  Sign Up to Speak
                </Button>
              </a>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Afterparty;