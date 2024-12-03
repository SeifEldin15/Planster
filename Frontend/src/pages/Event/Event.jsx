import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const Event = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState('party');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const eventTypes = [
    { id: 'party', label: 'Party' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'music', label: 'Music Event' }
  ];

  const locations = [
    { id: 1, name: 'Sydney CBD, 22023' },
    { id: 2, name: 'Sydney Business District, 22012' },
    { id: 3, name: 'Sydney Fair, 22215' },
    { id: 4, name: 'Sydney CBD Public Space, 22121' }
  ];

  const handleNext = () => {
    if (location.trim()) {
      navigate(`/service-selection?location=${encodeURIComponent(location)}&category=${encodeURIComponent(selectedEventType)}`);
    }
  };

  return (
    <>
    <Navbar />
    <div className="py-6 bg-white rounded-lg shadow-sm max-w-[1300px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Create an event</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Type of event
          </label>
          <div className="flex gap-2 flex-wrap">
            {eventTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedEventType(type.id)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  type.id === selectedEventType 
                    ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--hover-color)]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Where is it located in Australia?
          </label>
          <div className="relative" ref={dropdownRef}>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Sydney CBD"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
            
            {showDropdown && (
              <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
                {locations.map((loc) => (
                  <div
                    key={loc.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setLocation(loc.name);
                      setShowDropdown(false);
                    }}
                  >
                    {loc.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            We use location based information to find the best local vendors for your event.
          </p>
        </div>

        <button 
          onClick={handleNext}
          className="flex items-center px-4 py-2 bg-[var(--primary-color)] text-white rounded-md hover:bg-[var(--hover-color)] transition-colors"
        >
          Next
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
    </>
  );
};

export default Event;