import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card1 from '../../assets/card1.svg';
import Card2 from '../../assets/card2.svg';
import Card3 from '../../assets/card3.svg';
import { useState } from 'react';

const HeroSection = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // Navigate to results page with search parameters
      navigate(`/results?keyword=${encodeURIComponent(searchValue)}&category=Wedding venue`);
    }
  };

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
        <div className="absolute left-16 top-1/4 transform -rotate-12 background-card">
          <img src={Card1} alt="Card 1" className="rounded-xl p-6 w-64 h-64 flex flex-col justify-end" />
        </div>
        
        <div className="absolute left-4 top-16 background-card">
          <img src={Card2} alt="Card 2" className="rounded-xl p-6 w-64 h-64 flex flex-col justify-end" />
        </div>
        
        <div className="absolute right-16 top-1/3 transform rotate-12 background-card">
          <img src={Card3} alt="Card 3" className="rounded-xl p-6 w-64 h-64 flex flex-col justify-end" />
        </div>

        <div className="max-w-3xl mx-auto text-center z-10">
          <h1 className="text-4xl font-bold mb-6">
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
          
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Find, compare, and book the best vendors with our AI-powered platform. Save time, reduce stress, and plan your perfect event in just a few clicks.
          </p>
          
          <div className="relative max-w-md mx-auto">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search Location..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-4 py-2 rounded-full text-base border border-gray-300 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--primary-color)', width: '36px', height: '36px' }}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;