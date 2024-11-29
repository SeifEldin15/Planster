import React from 'react';
import Card1 from '../../assets/card1.svg';
import Card2 from '../../assets/card2.svg';
import Card3 from '../../assets/card3.svg';

const HeroSection = () => {
  return (
    <>
      <style>
        {`
          @media screen and (max-width: 1200px) {
            .background-card {
              display: none;
            }
          }
        `}
      </style>
      
      <div className="relative min-h-[600px] flex items-center justify-center bg-white p-8">
        {/* Background Cards */}
        <div className="absolute left-16 top-1/4 transform -rotate-12 background-card">
          <img src={Card1} alt="Card 1" className="rounded-xl p-6 w-64 h-64 flex flex-col justify-end" />
        </div>
        
        <div className="absolute left-4 top-16 background-card">
          <img src={Card2} alt="Card 2" className="rounded-xl p-6 w-64 h-64 flex flex-col justify-end" />
        </div>
        
        <div className="absolute right-16 top-1/3 transform rotate-12 background-card">
          <img src={Card3} alt="Card 3" className="rounded-xl p-6 w-64 h-64 flex flex-col justify-end" />
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
    </>
  );
};

export default HeroSection;