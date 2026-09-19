import React, { useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          region: string;
          portalId: string;
          formId: string;
          target: string | HTMLElement;
          formInstanceId?: string;
          cssClass?: string;
        }) => void;
      };
    };
  }
}

const RsvpForm = () => {
  const { toast } = useToast();
  const formCreatedRef = useRef(false);
  
  useEffect(() => {
    // Check if form already exists and clear it if needed
    const formContainer = document.getElementById('hubspotForm');
    if (formContainer) {
      formContainer.innerHTML = '';
    }
    
    // Prevent duplicate form creation
    if (formCreatedRef.current) {
      return;
    }

    // Load HubSpot form script
    const script = document.createElement('script');
    script.src = "//js.hsforms.net/forms/v2.js";
    script.async = true;
    script.onload = () => {
      console.log("HubSpot script loaded successfully");
      
      // Check if hbspt is available and form hasn't been created yet
      if (window.hbspt && !formCreatedRef.current) {
        console.log("Creating HubSpot form...");
        
        // Create the form using HubSpot's standard method
        window.hbspt.forms.create({
          region: "na1",
          portalId: "44877409",
          formId: "00ec190a-b631-4175-9eba-66825c06fcaa",
          target: "#hubspotForm",
          cssClass: "full-width-form" // Add custom CSS class for styling
        });
        
        formCreatedRef.current = true;
      } else if (!window.hbspt) {
        console.error("HubSpot forms object not available");
        toast({
          title: "Form Error",
          description: "There was a problem loading the registration form. Please refresh and try again.",
          variant: "destructive",
        });
      }
    };
    
    script.onerror = () => {
      console.error("Failed to load HubSpot script");
      toast({
        title: "Form Error",
        description: "Failed to load the registration form. Please try again later.",
        variant: "destructive",
      });
    };
    
    document.body.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      
      // Reset the form creation flag when component unmounts
      formCreatedRef.current = false;
      
      // Remove any HubSpot forms that were created
      if (formContainer) {
        formContainer.innerHTML = '';
      }
    };
  }, [toast]);
  
  return (
    <section id="register" className="py-10 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">Register</h2>
          
          <div className="bg-secondary/50 p-6 md:p-8 rounded-lg cyberpunk-border shadow-lg">
            <h3 className="text-xl font-bold mb-4 font-mono text-center">
              SECURE YOUR SPOT
            </h3>
            
            <div id="hubspotForm" className="min-h-[450px] w-full overflow-x-hidden">
              <Skeleton className="w-full h-[450px]" />
            </div>
            
            <p className="text-center text-sm text-muted-foreground mt-4">
              By registering, you'll be added to our event mailing list.
              We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
      </div>

      {/* Add custom styles for HubSpot form to make it fit better */}
      <style>{`
        .full-width-form .hs-form {
          width: 100%;
          max-width: 100%;
        }
        
        .full-width-form .hs-form .hs-input {
          width: 100% !important;
          max-width: 100% !important;
          padding: 0.75rem !important;
          border-radius: 0.375rem !important;
          background-color: rgba(10, 53, 56, 0.6) !important;
          border: 1px solid rgba(168, 240, 200, 0.2) !important;
          color: white !important;
        }
        
        .full-width-form .hs-form .hs-button {
          background-color: hsl(150, 70%, 80%) !important;
          color: hsl(175, 67%, 13%) !important;
          border: none !important;
          padding: 0.75rem 1.5rem !important;
          border-radius: 0.375rem !important;
          font-weight: 500 !important;
          cursor: pointer !important;
          transition: all 0.2s !important;
          width: 100% !important;
        }
        
        .full-width-form .hs-form .hs-button:hover {
          background-color: rgba(168, 240, 200, 0.9) !important;
        }
        
        .full-width-form .hs-form .hs-error-msgs {
          color: hsl(var(--destructive)) !important;
        }
        
        .full-width-form .hs-form fieldset {
          max-width: 100% !important;
        }
        
        .full-width-form .hs-form .hs-form-field {
          margin-bottom: 1rem !important;
        }
        
        .full-width-form .hs-form label {
          color: hsl(var(--foreground)) !important;
          margin-bottom: 0.25rem !important;
          display: block !important;
        }
        
        .full-width-form .hs-form-iframe {
          width: 100% !important;
          min-width: 100% !important;
        }
        
        .full-width-form .input {
          width: 100% !important;
        }
        
        /* Fix any potential overflow issues */
        .full-width-form form {
          margin: 0 !important;
          padding: 0 !important; 
        }
        
        /* Make sure form fields stretch properly */
        .full-width-form .hs-form-field div:not(.hs-error-msgs) {
          width: 100% !important;
        }
        
        /* Ensure any potential iframe is 100% width */
        #hubspotForm iframe {
          width: 100% !important;
          min-width: 100% !important;
        }
      `}</style>
    </section>
  );
};

export default RsvpForm;
