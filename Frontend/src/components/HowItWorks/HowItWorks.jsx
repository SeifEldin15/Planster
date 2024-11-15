import React from 'react';
import sideimg from '../../assets/2b4 - Copy.jpg';
const HowItWorks = () => {
  return (
    <div className="flex items-start justify-between max-w-6xl mx-auto p-8 gap-12">
      {/* Left Section */}
      <div className="flex-1">
        <div className="mb-8">
          <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm">
            How It Works
          </span>
        </div>

        <h2 className="text-3xl font-bold mb-8">Customized Search</h2>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
              1
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Choose Your Type Of Event</h3>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
              2
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Select Your Required Vendors</h3>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
              3
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Find And Contact Local</h3>
              <p className="text-gray-500">
                We will select several local business we recommend will suit your event, so you can book them in.
              </p>
            </div>
          </div>

          {/* Vertical line connecting numbers */}
          <div className="absolute left-[3.1rem] top-[12rem] h-32 w-px bg-purple-100" />
        </div>
      </div>

      {/* Right Section - Custom Image */}
      <div className="flex-1">
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