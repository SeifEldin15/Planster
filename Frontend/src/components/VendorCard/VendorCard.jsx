import React from 'react';
import testimg from '../../assets/testimg.jpg';

const VendorCard = ({ name, address, rating }) => {
    const renderStars = (rating) => {
      const ratingInt = Math.round(rating);
      return Array(5).fill(0).map((_, index) => (
        <svg
          key={index}
          className={`w-6 h-6 ${index < ratingInt ? 'text-yellow-300' : 'text-gray-200'}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ));
    };
  
    return (
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-6">
          <img 
            src={testimg}
            alt={name} 
            className="w-28 h-20 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-xl font-medium text-gray-900">{name}</h3>
            <p className="text-gray-500 mt-1">{address}</p>
          </div>
        </div>
        
        <div className="flex items-end flex-col gap-8">
          <div className='flex gap-2'>
            <p className="text-gray-400 mb-1">Google Rating</p>
            <div className="flex gap-1">{renderStars(rating)}</div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="px-6 py-2 text-sm border border-gray-200 rounded-full hover:bg-gray-50">
              Contact
            </button>
            <button className="px-6 py-2 text-sm border border-gray-200 rounded-full hover:bg-gray-50">
              View
            </button>
          </div>
        </div>
      </div>
    );
  };

export default VendorCard;