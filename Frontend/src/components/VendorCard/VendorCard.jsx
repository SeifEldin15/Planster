import React, { useState, useEffect, useRef } from 'react';

const VendorCard = ({ id, name, address, rating, email, phone, isFavorite: initialIsFavorite = false, images = [], original_url }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const cardRef = useRef(null);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Load initial favorite state from localStorage or props
  useEffect(() => {
    const favoriteVendors = JSON.parse(localStorage.getItem('favoriteVendors') || '{}');
    setIsFavorite(initialIsFavorite || favoriteVendors[id] || false);
  }, [id, initialIsFavorite]);

  const handleFavoriteClick = async () => {
    try {
      let token = localStorage.getItem('token');
      console.log('Initial token:', token);
      console.log('Vendor ID being sent:', id);

      const response = await fetch('https://planster.com.au/api/favorites/toggle', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          vendorId: id 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.message || 'Failed to toggle favorite');
      }

      const data = await response.json();
      console.log('Toggle favorite response:', data);

      if (response.ok) {
        const newFavoriteState = !isFavorite;
        setIsFavorite(newFavoriteState);
        
        // Update localStorage
        const favoriteVendors = JSON.parse(localStorage.getItem('favoriteVendors') || '{}');
        if (newFavoriteState) {
          favoriteVendors[id] = true;
        } else {
          delete favoriteVendors[id];
        }
        localStorage.setItem('favoriteVendors', JSON.stringify(favoriteVendors));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

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

  // Modified image path logic
  const displayImage = images && images.length > 0 
    ? `/images/${images[0]}` // Update path to match your folder structure
    : '/images/default-venue.jpg';

  console.log('Image path:', displayImage); // Add this for debugging

  return (
    <div 
      ref={cardRef}
      className="flex flex-col p-4 lg:p-6 transition-all duration-200 cursor-pointer bg-white shadow-sm hover:shadow-lg rounded-xl relative"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 w-full lg:w-auto">
          <img 
            src={displayImage}
            alt={name} 
            className="w-full lg:w-28 h-40 lg:h-20 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <p className="text-gray-500">{address}</p>
          </div>
        </div>
        
        <div className="flex flex-col lg:items-end gap-4 lg:gap-6 w-full lg:w-auto">
          <div className='flex flex-col lg:flex-row items-start lg:items-center gap-2'>
            <p className="text-gray-500">Google Rating</p>
            <div className="flex gap-1">{renderStars(rating)}</div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleFavoriteClick}
              className="inline-flex items-center"
            >
              <svg 
                className={`w-5 h-5 ${isFavorite ? 'text-purple-600 fill-current' : 'text-purple-400'}`} 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                fill={isFavorite ? "currentColor" : "none"}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
            </button>
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="px-4 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-full hover:bg-gray-50"
            >
              Contact
            </button>
            <a 
              href={original_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-full hover:bg-gray-50"
            >
              View
            </a>
          </div>
        </div>
      </div>

      <div 
        className={`
          absolute left-0 right-0 bg-white z-10 px-4 lg:px-6 pb-4 shadow-lg rounded-b-xl
          transition-all duration-200 
          ${isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        style={{
          top: '100%',
          transform: isExpanded ? 'translateY(0)' : 'translateY(-10px)',
        }}
      >
        <div className="pt-4 space-y-2">
          <p className="text-gray-600">
            <span className="font-medium">Location:</span> {address}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> {email}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Phone:</span> {phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;