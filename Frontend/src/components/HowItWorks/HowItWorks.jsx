import React from 'react';
import sideimg from '../../assets/2b4 - Copy.jpg';
const HowItWorks = () => {
  return (
    <div className="flex flex-col md:flex-row items-start justify-between max-w-6xl mx-auto p-8 gap-12 mt-12">
      <div className="flex-1">
        <div className="mb-8">
          <span className="bg-[var(--secondary-color)] text-[var(--primary-color)] px-6 py-1 rounded-full text-sm">
            How It Works
          </span>
        </div>

        <h2 className="text-3xl font-medium mb-8">Customized Search</h2>

        <div className="space-y-8 relative">
          <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-[var(--secondary-color)] border border-[var(--primary-color)] flex items-center justify-center text-[var(--primary-color)] text-lg font-semibold">
              1
              <div className="absolute top-[calc(100%+4px)] h-[24px] w-[1px] bg-gray-300" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Choose Your Type Of Event</h3>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-[var(--secondary-color)] border border-[var(--primary-color)] flex items-center justify-center text-[var(--primary-color)] text-lg font-semibold">
              2
              <div className="absolute top-[calc(100%+4px)] h-[24px] w-[1px] bg-gray-300" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Select Your Required Vendors</h3>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--secondary-color)] border border-[var(--primary-color)] flex items-center justify-center text-[var(--primary-color)] text-lg font-semibold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Find And Contact Local</h3>
              <p className="text-gray-500">
                We will select several local business we recommend will suit your event, so you can book them in.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full md:w-auto">
        <img 
          src={sideimg} 
          alt="How it works demonstration" 
          className="w-full h-auto rounded-xl"
        />
      </div>
    </div>
  );
};

export default HowItWorks;