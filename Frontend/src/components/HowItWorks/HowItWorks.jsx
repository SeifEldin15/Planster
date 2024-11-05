import React from 'react';

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

      {/* Right Section - Example UI */}
      <div className="flex-1">
        <div className="bg-purple-50 p-6 rounded-xl">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Your Wedding</h3>
            
            {/* Filter Tags */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {['Venue', 'Photographer', 'Event Host', 'Decoration', 'DJ/Live', 'Reception'].map((tag) => (
                <span key={tag} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>

            {/* Venue Card */}
            <div className="border rounded-lg p-4 mb-4">
              <div className="flex gap-4">
                <img
                  src="/api/placeholder/200/150"
                  alt="Venue"
                  className="w-48 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">Oakwood Wedding Venue, Sydney</h4>
                      <p className="text-gray-500 text-sm">Sydney, Australia</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★★★★★</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vendor List */}
            <h4 className="font-semibold mb-3">Local Vendors</h4>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 border rounded-lg p-3">
                  <img
                    src="/api/placeholder/100/100"
                    alt="Vendor"
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h5 className="font-medium">Newstead Wedding Property</h5>
                    <p className="text-gray-500 text-sm">Sydney, Australia</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-purple-600 text-sm">Contact</button>
                    <button className="text-purple-600 text-sm">View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;