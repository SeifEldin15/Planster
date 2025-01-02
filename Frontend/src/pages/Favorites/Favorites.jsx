import React, { useState, useEffect } from 'react';
import VendorCard from '../../components/VendorCard/VendorCard';
import Navbar from '../../components/Navbar/Navbar';
import SearchSection from '../../components/SearchSection/SearchSection';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token);

        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('https://planster.com.au:5000/api/favorites', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch favorites');
        }

        const data = await response.json();
        console.log('Fetched favorites:', data);
        setFavorites(data);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError(err.message);
        
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    console.log('Current favorites state:', favorites);
  }, [favorites]);

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6">Loading...</div>;
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-red-500">Error: {error}</div>
          <div className="mt-4 text-gray-600">
            Please try refreshing the page or logging in again.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <SearchSection />
      <div className="max-w-[85%] mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">My Favorites</h2>
        {favorites.length === 0 ? (
          <div className="text-center text-gray-500">
            No favorites yet. Start exploring venues to add some!
          </div>
        ) : (
          <div className="divide-y divide-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {favorites.map((favorite) => {
              console.log('Rendering favorite:', favorite);
              return (
                <VendorCard 
                  key={favorite.vendor._id}
                  id={favorite.vendor._id}
                  name={favorite.vendor.name}
                  address={favorite.vendor.address}
                  rating={favorite.vendor.rating}
                  images={favorite.vendor.images}
                  email={favorite.vendor.email}
                  phone={favorite.vendor.phone}
                  isFavorite={true}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;