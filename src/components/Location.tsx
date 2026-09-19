import React from 'react';
import { Mail, MapPin, ExternalLink } from 'lucide-react';
const Location = () => {
  return <section id="location" className="py-10 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">LOCATION_&_CONTACT</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="bg-secondary/50 p-6 rounded-lg h-full cyberpunk-border">
                <h3 className="text-xl font-bold mb-4 font-mono">VENUE</h3>
                <p className="text-lg font-medium mb-2">TBD</p>
                <p className="text-muted-foreground mb-6">Location to be announced</p>
                
                <h3 className="text-xl font-bold mb-4 font-mono">CONTACT</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-wildai-mint mr-2" />
                    <a href="mailto:jake@wildai.us" className="text-foreground hover:text-wildai-mint transition-colors">
                      jake@wildai.us
                    </a>
                  </div>
                  <div className="flex items-center">
                    <ExternalLink className="w-5 h-5 text-wildai-mint mr-2" />
                    <a href="https://www.meetup.com/wild-ai/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-wildai-mint transition-colors">
                      Wild AI Meetup Page
                    </a>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium mb-2">Getting There:</h4>
                  <p className="text-muted-foreground mb-3">Located in Northeast Minneapolis, free lot parking and street parking is available in the area.</p>
                  <p className="text-muted-foreground">
                    The venue is accessible via various bus routes and is near the University of Minnesota.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="cyberpunk-border rounded-lg overflow-hidden h-[400px]">
               <div className="flex items-center justify-center h-full bg-secondary/30">
                <p className="text-muted-foreground font-mono">MAP_COMING_SOON</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground">
              Look for our WILD_AI signs when you arrive.
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default Location;