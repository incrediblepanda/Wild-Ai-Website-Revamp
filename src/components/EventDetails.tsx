import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, MessageSquare, Coffee, Youtube } from 'lucide-react';
const EventDetails = () => {
  return <section id="event" className="py-10 md:py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">EVENT_DETAILS</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-secondary p-6 rounded-lg cyberpunk-border">
              <h3 className="text-xl font-bold mb-4 font-mono">UPCOMING EVENT</h3>
              <p className="text-2xl font-bold text-wildai-mint mb-2">August 17, 2026</p>
              <p className="text-muted-foreground mb-4">6:00 PM</p>
              <p className="font-medium">Improving Minneapolis</p>
              <p className="text-muted-foreground">3033 Excelsior Boulevard, Suite 180</p>
              <p className="text-muted-foreground mb-4">Minneapolis, MN 55416</p>
            </div>
            
            <div className="bg-gradient-to-br from-wildai-mint/20 to-accent/20 p-6 rounded-lg cyberpunk-border">
              <h3 className="text-xl font-bold mb-4 font-mono">WHAT TO EXPECT</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-wildai-mint mr-2">→</span>
                  <span>Cutting-edge AI discussions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-wildai-mint mr-2">→</span>
                  <span>Connect with local AI professionals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-wildai-mint mr-2">→</span>
                  <span>Share your projects and ideas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-wildai-mint mr-2">→</span>
                  <span>Casual, inclusive environment</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-secondary/50 p-8 rounded-lg mb-10">
            <h3 className="text-xl font-bold mb-6 font-mono text-center">MEETUP SCHEDULE</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-wildai-mint/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-wildai-mint" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">6:00 PM</h4>
                  <p className="text-muted-foreground">Arrival, mingling, and drinks.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-wildai-mint/20 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-wildai-mint" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">6:40 - 7:00 PM</h4>
                  <p className="text-muted-foreground">Speaker sessions begin (5-minute talks, no slides).</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-wildai-mint/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-wildai-mint" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">7:00 - 8:00 PM</h4>
                  <p className="text-muted-foreground">Open networking, connecting with speakers and fellow innovators.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-lg mb-4">
              First time? Don't worry — we're a friendly bunch.
            </p>
            <p className="text-muted-foreground">
              Just show up, grab a drink, and start chatting about what excites you in AI.
            </p>
          </div>
          
          <div className="flex justify-center">
            <a href="https://www.youtube.com/@WildAI-US" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-3 px-6 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-foreground">
              <Youtube className="w-5 h-5 text-wildai-mint" />
              <span>Check out our past events on YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </section>;
};
export default EventDetails;