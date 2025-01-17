import { useState, useRef } from 'react';

const Slider = ({ images }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const containerRef = useRef(null);

  const scroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  const openModal = (venue) => {
    setSelectedVenue(venue);
  };

  const closeModal = () => {
    setSelectedVenue(null);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="relative max-w-[85%] mx-auto p-6">
      <div className="relative">
        {/* Left scroll button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {images.map((image, index) => (
            <div 
              key={index} 
              className="flex-none cursor-pointer"
              onClick={() => openModal(image)}
            >
              <div className="w-[280px] hover:opacity-90 transition-opacity">
                <div className="aspect-[4/3] mb-3">
                  <img
                    src={`images/${image.url}`}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = '/images/default-venue.jpg';
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">{image.subtitle}</p>
                  <h3 className="font-medium text-gray-900">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Modal */}
      {selectedVenue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedVenue.title}</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <img
                src={`images/${selectedVenue.url}`}
                alt={selectedVenue.alt}
                className="w-full h-64 object-cover rounded-lg mb-4"
                onError={(e) => {
                  e.target.src = '/images/default-venue.jpg';
                }}
              />
              
              <div className="space-y-3">
                <p className="text-lg text-gray-600">{selectedVenue.subtitle}</p>
                <div className="space-y-2">
                  {selectedVenue.fullDetails ? (
                    <>
                      <p><span className="font-semibold">Address:</span> {selectedVenue.fullDetails.address}</p>
                      <p><span className="font-semibold">Phone:</span> {selectedVenue.fullDetails.phone}</p>
                      <p><span className="font-semibold">Hours:</span> {selectedVenue.fullDetails.hours}</p>
                      {selectedVenue.fullDetails.email && selectedVenue.fullDetails.email !== 'N/A' && (
                        <p><span className="font-semibold">Email:</span> {selectedVenue.fullDetails.email}</p>
                      )}
                      {selectedVenue.fullDetails.website && (
                        <p>
                          <span className="font-semibold">Website:</span>{' '}
                          <a 
                            href={selectedVenue.fullDetails.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Visit Website
                          </a>
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <p><span className="font-semibold">Address:</span> {selectedVenue.address || 'N/A'}</p>
                      <p><span className="font-semibold">Phone:</span> {selectedVenue.phone || 'N/A'}</p>
                      {selectedVenue.email && selectedVenue.email !== 'N/A' && (
                        <p><span className="font-semibold">Email:</span> {selectedVenue.email}</p>
                      )}
                      {selectedVenue.website && (
                        <p>
                          <span className="font-semibold">Website:</span>{' '}
                          <a 
                            href={selectedVenue.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Visit Website
                          </a>
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;
