import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import NetworkField from '@/components/NetworkField';

const Hero = () => {
  return <section className="editorial-hero relative overflow-hidden border-b border-border/60">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-[1.08fr_.92fr] gap-10 lg:gap-16 items-center">
          <div className="relative z-10">
    <p className="signal-label mb-5">Wild AI Minneapolis</p>
            <h1 className="display-title mb-7">
              The room where <em>AI builders</em> show their work.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-9 max-w-xl leading-relaxed">Hear from local AI leaders. Network with researchers and builders. Share ideas that shape what's next.</p>
            <div className="flex flex-col sm:flex-row gap-3">
            <a href="#register">
              <Button size="lg" className="w-full sm:w-auto">Register now <ArrowRight /></Button>
            </a>
              <Link to="/events"><Button variant="outline" size="lg" className="w-full sm:w-auto">Explore events</Button></Link>
            </div>
            <div className="mt-10 pt-5 border-t border-border flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
              <span>Every third Monday</span><span>5 minute fire talks</span><span>No slides</span>
            </div>
          </div>
          <NetworkField />
        </div>
      </div>
    </section>;
};
export default Hero;