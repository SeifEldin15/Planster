import React from 'react';
import { useNavigate } from 'react-router-dom';
import eventImage from './21.jpg'; // Add this import
import musicImage from './music.jpg';
import corporateImage from './corporate.jpg';
import partiesImage from './party1.jpg';

const EventCard = ({ title, imageSrc }) => (
  <div className="flex flex-col items-center">
    <div className="w-64 h-64 overflow-hidden rounded-lg mb-4 transition-transform duration-300 hover:scale-105">
      <img 
        src={imageSrc} 
        alt={`${title} event`} 
        className="w-full h-full object-cover"
      />
    </div>
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
);

const EventBookingSection = () => {
  const navigate = useNavigate();

  const events = [
    {
      title: "Weddings",
      imageSrc: eventImage,  // Use the imported image
    },
    {
      title: "Parties",
      imageSrc: partiesImage,
    },
    {
      title: "Music Events",
      imageSrc: musicImage,
    },
    {
      title: "Corporate",
      imageSrc: corporateImage,
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold mb-2">
          Begin Booking For Your {" "}
          <span className="text-indigo-600">Event</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {events.map((event) => (
          <EventCard
            key={event.title}
            title={event.title}
            imageSrc={event.imageSrc}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => navigate('/event')}
          className="bg-[var(--primary-color)] text-white px-12 py-3 rounded-lg 
                   hover:opacity-90 transition-colors duration-300
                   text-lg font-medium w-64"
          style={{
            boxShadow: '0 0 20px rgba(106, 108, 196, 0.4)'
          }}
        >
          Start Your Event
        </button>
      </div>
    </div>
  );
};

export default EventBookingSection;
