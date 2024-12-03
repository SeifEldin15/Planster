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
      { id: 'venue', label: 'Venue' },
      { id: 'catering', label: 'Catering' },
      { id: 'entertainment', label: 'Entertainment' },
      { id: 'decoration', label: 'Decoration' }
    ],
    wedding: [
      { id: 'venue', label: 'Venue' },
      { id: 'catering', label: 'Catering' },
      { id: 'chairHire', label: 'Chair Hire' },
      { id: 'photographer', label: 'Photographer' },
      { id: 'decoration', label: 'Decoration' },
      { id: 'officiant', label: 'Officiant' },
      { id: 'transport', label: 'Transport' },
      { id: 'makeup', label: 'Makeup' }
    ],
    corporate: [
      { id: 'venue', label: 'Venue' },
      { id: 'catering', label: 'Catering' },
      { id: 'av-equipment', label: 'AV Equipment' },
      { id: 'decoration', label: 'Decoration' }
    ],
    music: [
      { id: 'venue', label: 'Venue' },
      { id: 'sound-system', label: 'Sound System' },
      { id: 'lighting', label: 'Lighting' },
      { id: 'security', label: 'Security' }
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

        <div className="flex gap-2 flex-wrap mb-8">
          {currentServices.map((service) => (
            <button
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedServices.includes(service.id)
                  ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--hover-color)]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {service.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selectedServices.length === 0}
          className={`flex items-center px-4 py-2 rounded-md transition-colors ${
            selectedServices.length === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-[var(--primary-color)] text-white hover:bg-[var(--hover-color)]'
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ServiceSelection; 