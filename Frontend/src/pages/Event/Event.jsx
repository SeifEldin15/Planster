import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import locationData from '../../Data/locations.json';

const Event = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState('party');
  const dropdownRef = useRef(null);
  const [filteredLocations, setFilteredLocations] = useState([]);

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
    { id: 'Wedding venue', label: 'Wedding' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'music', label: 'Music Event' }
  ];

  const filterLocations = (searchText) => {
    if (!searchText) {
      setFilteredLocations([]);
      return;
    }

    // First filter matching locations
    const filtered = locationData.filter(loc => 
      loc.place_name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Remove exact duplicates while keeping similar but different names
    const uniqueLocations = filtered.reduce((acc, current) => {
      const exactMatch = acc.find(item => 
        item.place_name.toLowerCase() === current.place_name.toLowerCase()
      );
      if (!exactMatch) {
        acc.push(current);
      }
      return acc;
    }, []);

    // Limit to 5 results
    setFilteredLocations(uniqueLocations.slice(0, 5));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    setShowDropdown(true);
    filterLocations(value);
  };

  const handleNext = () => {
    if (location.trim()) {
      const defaultServices = {
        party: ['venue', 'catering', 'entertainment', 'decoration'],
        'Wedding venue': ['Wedding venue', 'catering', 'photographer', 'decoration'],
        corporate: ['venue', 'catering', 'av-equipment', 'decoration'],
        music: ['venue', 'sound-system', 'lighting', 'security']
      };

      const services = defaultServices[selectedEventType].join(',');
      navigate(`/results?keyword=${encodeURIComponent(location)}&category=${encodeURIComponent(selectedEventType)}&services=${encodeURIComponent(services)}`);
    }
  };

  return (
    <>
    <Navbar />
    <div className="py-6 px-4 sm:px-6 bg-white rounded-lg shadow-sm max-w-[1300px] mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6">Create an event</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Type of event
          </label>
          <div className="flex gap-1 sm:gap-2 flex-wrap">
            {eventTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedEventType(type.id)}
                className={`
                  px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base transition-colors border border-[var(--primary-color)]
                  ${type.id === selectedEventType
                    ? 'bg-[var(--primary-color)] text-white'
                    : 'bg-[var(--secondary-color)] text-[var(--primary-color)]'
                  }
                `}
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
                onChange={handleInputChange}
                onFocus={() => setShowDropdown(true)}
                placeholder="Sydney CBD"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
            
            {showDropdown && filteredLocations.length > 0 && (
              <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
                {filteredLocations.map((loc) => (
                  <div
                    key={loc.postcode}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setLocation(loc.place_name);
                      setShowDropdown(false);
                    }}
                  >
                    {loc.place_name}
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
          className={`
            px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base flex items-center gap-2 border border-[var(--primary-color)]
            ${!location.trim()
              ? 'bg-[var(--secondary-color)] text-[var(--primary-color)] opacity-50 cursor-not-allowed'
              : 'bg-[var(--secondary-color)] text-[var(--primary-color)]'
            }
          `}
        >
          Next
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
    </>
  );
};

export default Event;