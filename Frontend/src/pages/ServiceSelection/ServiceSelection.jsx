import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const ServiceSelection = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = searchParams.get('location');
  const eventType = searchParams.get('category');
  const [selectedServices, setSelectedServices] = useState([]);

  const services = {
    party: [
      { id: 'venue', label: 'Venue', icon: '🏰' },
      { id: 'catering', label: 'Catering', icon: '🍽️' },
      { id: 'entertainment', label: 'Entertainment', icon: '🎵' },
      { id: 'decoration', label: 'Decoration', icon: '🎨' }
    ],
    wedding: [
      { id: 'venue', label: 'Venue', icon: '🏰' },
      { id: 'catering', label: 'Catering', icon: '🍽️' },
      { id: 'chairHire', label: 'Chair Hire', icon: '💺' },
      { id: 'photographer', label: 'Photographer', icon: '📸' },
      { id: 'decoration', label: 'Decoration', icon: '🎨' },
      { id: 'officiant', label: 'Officiant', icon: '👔' },
      { id: 'transport', label: 'Transport', icon: '🚗' },
      { id: 'makeup', label: 'Makeup', icon: '💄' }
    ],
    corporate: [
      { id: 'venue', label: 'Venue', icon: '🏢' },
      { id: 'catering', label: 'Catering', icon: '🍽️' },
      { id: 'av-equipment', label: 'AV Equipment', icon: '🎥' },
      { id: 'decoration', label: 'Decoration', icon: '🎨' }
    ],
    music: [
      { id: 'venue', label: 'Venue', icon: '🏟️' },
      { id: 'sound-system', label: 'Sound System', icon: '🔊' },
      { id: 'lighting', label: 'Lighting', icon: '💡' },
      { id: 'security', label: 'Security', icon: '👮' }
    ]
  };

  const currentServices = services[eventType?.toLowerCase()] || services.wedding;

  const toggleService = (serviceId) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleNext = () => {
    if (selectedServices.length > 0) {
      navigate(`/results?keyword=${encodeURIComponent(location)}&category=${encodeURIComponent(eventType)}&services=${encodeURIComponent(selectedServices.join(','))}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="py-6 bg-white rounded-lg shadow-sm max-w-[1300px] mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6">Let's see what you need...</h1>
        <p className="text-gray-600 mb-8">
          There are 1082 results for your location
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {currentServices.map((service) => (
            <button
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`p-4 rounded-lg text-left transition-all ${
                selectedServices.includes(service.id)
                  ? 'bg-indigo-500 text-white'
                  : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
              }`}
            >
              <span className="text-2xl mr-2">{service.icon}</span>
              <span className="font-medium">{service.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selectedServices.length === 0}
          className={`flex items-center px-6 py-3 rounded-md transition-all ${
            selectedServices.length === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-500 text-white hover:bg-indigo-600'
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ServiceSelection; 