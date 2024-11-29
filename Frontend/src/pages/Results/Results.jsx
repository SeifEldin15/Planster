import React, { useState, useEffect } from 'react';
import VendorCard from '../../components/VendorCard/VendorCard';
import Navbar from '../../components/Navbar/Navbar'
import Slider from '../../components/Slider/Slider'
import SearchSection from '../../components/SearchSection/SearchSection'
// import Footer from '../../components/Footer/Footer'
import testimg from '../../assets/testimg.jpg';
const images = [
  {
    url: testimg,
    title: 'Green Tea Rabbit Hole Works',
    subtitle: 'Never Never Distilling Co.'  },
  {
    url: testimg,
    title: 'Green Tea Rabbit Hole Works',
    subtitle: 'Never Never Distilling Co.'
  },
  {
    url: testimg,
    title: 'Green Tea Rabbit Hole Works',
    subtitle: 'Never Never Distilling Co.'  },
  {
    url: testimg,
    title: 'Green Tea Rabbit Hole Works',
    subtitle: 'Never Never Distilling Co.'
  },
  {
    url: testimg,
    title: 'Green Tea Rabbit Hole Works',
    subtitle: 'Never Never Distilling Co.'  },
  {
    url: testimg,
    title: 'Green Tea Rabbit Hole Works',
    subtitle: 'Never Never Distilling Co.'
  },
  {
    url: testimg,
    title: 'Green Tea Rabbit Hole Works',
    subtitle: 'Never Never Distilling Co.'  },
  {
    url: testimg,
    title: 'Green Tea Rabbit Hole Works',
    subtitle: 'Never Never Distilling Co.'
  },
  {
    url: testimg,
    title: 'Green Tea Rabbit Hole Works',
    subtitle: 'Never Never Distilling Co.'  },
  {
    url: testimg,
    title: 'Green Tea Rabbit Hole Works',
    subtitle: 'Never Never Distilling Co.'
  },
  {
    url: testimg,
    title: 'Green Tea Rabbit Hole Works',
    subtitle: 'Never Never Distilling Co.'  },
  {
    url: testimg,
    title: 'Green Tea Rabbit Hole Works',
    subtitle: 'Never Never Distilling Co.'
  },
  {
    url: testimg,
    title: 'Green Tea Rabbit Hole Works',
    subtitle: 'Never Never Distilling Co.'  },
  {
    url: testimg,
    title: 'Green Tea Rabbit Hole Works',
    subtitle: 'Never Never Distilling Co.'
  },
  // ... more images
];
const Results = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/venues?limit=1', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch venues');
        }
        
        const data = await response.json();
        console.log('Fetched venues:', data);
        setVenues(data);
      } catch (err) {
        console.error('Error fetching venues:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6">Loading...</div>;
  }

  if (error) {
    return <div className="max-w-4xl mx-auto p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <>
    <Navbar />
    <SearchSection />
    <Slider images={images} />
    <div className="max-w-[85%] mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Local Vendors</h2>
      <div className="divide-y divide-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {venues.map((venue) => (
          <VendorCard 
            key={venue._id}
            id={venue._id}
            name={venue.name}
            address={venue.address}
            rating={venue.rating}
            images={venue.images}
            email={venue.email}
            phone={venue.phone}
          />
        ))}
      </div>
    </div>
    {/* <Footer /> */}
    </>
  );
};

export default Results;