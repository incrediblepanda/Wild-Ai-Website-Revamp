import React from 'react';

const LoonCafeMap = () => {
  return (
    <div className="cyberpunk-border rounded-lg overflow-hidden h-[400px]">
      <iframe 
        src="https://www.google.com/maps?saddr=345+Washington+St,+St+Paul,+MN+55102&daddr=426+Saint+Peter+St,+Saint+Paul,+MN+55102&dirflg=w&output=embed" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen={false} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade" 
        title="Walking Route from Ordway Theater to Loon Cafe" 
        className="transition-all duration-500"
      />
    </div>
  );
};

export default LoonCafeMap;
