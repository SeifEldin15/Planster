import React from 'react';
import { MessageCircleHeart, Users, Building2 } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center bg-white p-8">
      {/* Background Cards */}
      <div className="absolute left-16 top-1/4 transform -rotate-12">
        <div className="bg-purple-700 rounded-xl p-6 w-48 h-48 flex flex-col justify-end">
          <Users className="text-white mb-2 w-8 h-8" />
          <p className="text-white text-sm">Find event holders</p>
        </div>
      </div>
      
      <div className="absolute left-4 top-16">
        <div className="bg-purple-800 rounded-xl p-6 w-48 h-48 flex flex-col justify-end">
          <Building2 className="text-white mb-2 w-8 h-8" />
          <p className="text-white text-sm">Support local businesses</p>
        </div>
      </div>
      
      <div className="absolute right-16 top-1/3 transform rotate-12">
        <div className="bg-purple-400 rounded-xl p-6 w-48 h-48 flex flex-col justify-end">
          <MessageCircleHeart className="text-white mb-2 w-8 h-8" />
          <p className="text-white text-sm">See the reviews</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto text-center z-10">
        <h1 className="text-5xl font-bold mb-6">
          Event Planning Simplified with{' '}
          <span className=""
          style={{
            color: 'var(--primary-color)',
          }}
          >
            AI-Powered
          </span>
          {' '}Vendor Connections
        </h1>
        
        <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
          Find, compare, and book the best vendors with our AI-powered platform. Save time, reduce stress, and plan your perfect event in just a few clicks.
        </p>
        
        <button className="px-8 py-3 rounded-lg text-lg font-medium hover:bg-purple-100 transition-colors border"
          style={{
            backgroundColor: 'var(--secondary-color)',
            color: 'var(--primary-color)',
            borderColor: 'var(--primary-color)',
            boxShadow: '0 0 20px rgba(106, 108, 196, 0.4)'
          }}
        >
          Start Your Event
        </button>
      </div>
    </div>
  );
};

export default HeroSection;