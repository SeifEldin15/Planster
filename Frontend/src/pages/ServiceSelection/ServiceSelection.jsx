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
      { id: 'Wedding venue', label: 'Venue' },
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
      <div className="max-w-[1300px] mx-auto px-8 py-12">
    <div className="flex items-center mb-12">

    <h1 className="text-4xl">
          {eventType || 'Wedding'}
        </h1>

        <div className="bg-[var(--secondary-color)] rounded-full  inline-block ml-4 flex items-center mt-3">
          <p className="text-[var(--primary-color)] px-6 py-1">
            There are 1082 results for your location
          </p>
        </div>
    </div>
        <h2 className="text-4xl text-gray-600 mb-8">Let's see what you need...</h2>
        <div className="grid grid-cols-6 gap-3 mb-12">
          {currentServices.map((service) => (
            <button
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`
                px-4 py-2 rounded-lg text-base transition-colors border border-[var(--primary-color)]
                ${selectedServices.includes(service.id)
                  ? 'bg-[var(--primary-color)] text-white'
                  : 'bg-[var(--secondary-color)] text-[var(--primary-color)]'
                }
              `}
            >
              {service.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selectedServices.length === 0}
          className={`
            px-6 py-2 rounded-lg text-base flex items-center gap-2 border border-[var(--primary-color)]
            ${selectedServices.length === 0 
              ? 'bg-[var(--secondary-color)] text-[var(--primary-color)] opacity-50 cursor-not-allowed'
              : 'bg-[var(--secondary-color)] text-[var(--primary-color)]'
            }
          `}
        >
          Next
          <span className="text-lg">→</span>
        </button>
      </div>
    </>
  );
};

export default ServiceSelection; 