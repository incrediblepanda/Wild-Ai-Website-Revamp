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
    <>
      <div className="glass flex h-full flex-col p-6 md:p-8">
        <p className="kicker">Reserve a seat</p>
        <h3 className="mt-3 font-display text-xl font-semibold">Register for the meetup</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Save your spot and we&apos;ll send the lineup plus a reminder before doors open.
        </p>

        {/* HubSpot renders its own themed form, so it gets a deliberate plate. */}
        <div className="glass-plate mt-6 flex-grow overflow-hidden p-2">
          <div id="hubspotForm" className="min-h-[450px] w-full overflow-x-hidden">
            <Skeleton className="w-full h-[450px]" />
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          By registering, you&apos;ll be added to our event mailing list. We respect your privacy
          and will never share your information.
        </p>
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
          border-radius: 0.75rem !important;
          background-color: hsl(var(--surface-deep) / 0.7) !important;
          border: 1px solid hsl(var(--input)) !important;
          color: hsl(var(--foreground)) !important;
        }
        
        .full-width-form .hs-form .hs-button {
          background-color: hsl(var(--primary)) !important;
          color: hsl(var(--primary-foreground)) !important;
          border: none !important;
          padding: 0.85rem 1.5rem !important;
          border-radius: 9999px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.2s !important;
          width: 100% !important;
        }
        
        .full-width-form .hs-form .hs-button:hover {
          background-color: hsl(179 62% 19%) !important;
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
    </>
  );
};

export default RsvpForm;
