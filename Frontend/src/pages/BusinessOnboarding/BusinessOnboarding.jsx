import React, { useState } from 'react';

const BusinessOnboarding = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  
  const serviceCategories = [
    'Venue', 'Catering', 'Chair Hire', 'Photographer', 'Decoration',
    'Officiant', 'Transport', 'Makeup', 'Activities', 'DJ',
    'Event Help', 'Party Help', 'Lighting'
  ];

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen relative">
      {/* Background split */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-gradient-to-b from-indigo-400 to-indigo-300 flex items-center justify-center">
          <div className="bg-white rounded-lg px-12 py-16 w-full max-w-xl m-8">
            {/* Left Panel Content */}
            <h2 className="text-indigo-600 text-2xl mb-6">
              Our platform is made to increase your bookings.
            </h2>
            
            <ul className="space-y-4 my-12">
              <li className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-indigo-600 rounded-full"/>
                By signing up with us your business will be to increase visibility
              </li>
              <li className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-indigo-600 rounded-full"/>
                Clients will be able direct to your past contact.
              </li>
              <li className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-indigo-600 rounded-full"/>
                We'll keep you updated on how many clicks you have
              </li>
            </ul>

            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <span className="text-orange-500">💡</span>
                <p className="text-orange-800 font-medium text-md">
                  This service is offered for free
                </p>
              </div>
              <p className="text-orange-700 text-md mt-1">
                We take no charge in helping your local business grow.
              </p>
            </div>
          </div>
        </div>
        
        <div className="w-1/2  flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-xl m-8">
            {/* Right Panel Content */}
            <h2 className="text-2xl font-semibold mb-6">Get on board with us.</h2>

            {/* Tags */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {serviceCategories.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-1 rounded-full text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Google Page
                </label>
                <input
                  type="url"
                  placeholder="https://google/businesslisting.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Contact Email
                  </label>
                  <input
                    type="email"
                    placeholder="business@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Location
                  </label>
                  <input
                    type="text"
                    placeholder="Sydney, NSW"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-indigo-100 text-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-200 transition-colors flex items-center gap-2"
              >
                Submit
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOnboarding;
