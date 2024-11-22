import { useEffect, useState } from 'react';

const BusinessesSlider = () => {
  return (
    <div className="w-full py-10 overflow-hidden bg-white">
      <h2 className="text-center text-2xl mb-8">We work with local businesses</h2>
      
      <div className="relative flex">
        <div className="flex animate-slide">
          <div className="flex items-center justify-center min-w-[250px] px-4">
            <img src="/google-logo.png" alt="Business Logo" className="w-32 h-auto opacity-30" />
          </div>
          <div className="flex items-center justify-center min-w-[250px] px-4">
            <img src="/google-logo.png" alt="Business Logo" className="w-32 h-auto opacity-30" />
          </div>
          <div className="flex items-center justify-center min-w-[250px] px-4">
            <img src="/google-logo.png" alt="Business Logo" className="w-32 h-auto opacity-30" />
          </div>
          <div className="flex items-center justify-center min-w-[250px] px-4">
            <img src="/google-logo.png" alt="Business Logo" className="w-32 h-auto opacity-30" />
          </div>
        </div>
        
        <div className="flex animate-slide">
          <div className="flex items-center justify-center min-w-[250px] px-4">
            <img src="/google-logo.png" alt="Business Logo" className="w-32 h-auto opacity-30" />
          </div>
          <div className="flex items-center justify-center min-w-[250px] px-4">
            <img src="/google-logo.png" alt="Business Logo" className="w-32 h-auto opacity-30" />
          </div>
          <div className="flex items-center justify-center min-w-[250px] px-4">
            <img src="/google-logo.png" alt="Business Logo" className="w-32 h-auto opacity-30" />
          </div>
          <div className="flex items-center justify-center min-w-[250px] px-4">
            <img src="/google-logo.png" alt="Business Logo" className="w-32 h-auto opacity-30" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessesSlider; 