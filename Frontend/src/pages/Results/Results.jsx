import React, { useState, useEffect } from 'react';
import VendorCard from '../../components/VendorCard/VendorCard';
import Navbar from '../../components/Navbar/Navbar'
import Slider from '../../components/Slider/Slider'
import SearchSection from '../../components/SearchSection/SearchSection'
import { useSearchParams } from 'react-router-dom';

const Results = () => {
  const [searchParams] = useSearchParams();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);  // Track current page
  const [hasMore, setHasMore] = useState(true);  // Track if more results exist
  const VENUES_PER_PAGE = 10;  // Number of venues to load per page
  const [topVenues, setTopVenues] = useState([]);
  const [topVenuesLoading, setTopVenuesLoading] = useState(true);
  
  // Get search parameters from URL
  const initialKeyword = searchParams.get('keyword') || '';
  const initialCategory = searchParams.get('category') || 'Wedding venue';
  
  const [searchTerm, setSearchTerm] = useState(initialKeyword);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Add services to the state
  const initialServices = searchParams.get('services')?.split(',') || [];
  const [selectedServices, setSelectedServices] = useState(initialServices);

  const fetchVenues = async (pageNum, keyword = '', category = 'Wedding venue') => {
    try {
      setLoading(true);
      const servicesParam = selectedServices.length > 0 ? `&services=${selectedServices.join(',')}` : '';
      const response = await fetch(
        `http://localhost:5000/api/venues?limit=${VENUES_PER_PAGE}&page=${pageNum}&keyword=${keyword}&category=${category}${servicesParam}`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch venues');
      }
      
      const data = await response.json();
      
      // Update hasMore based on backend response
      setHasMore(data.hasMore);

      // Append new venues to existing ones
      setVenues(prevVenues => pageNum === 1 ? data.venues : [...prevVenues, ...data.venues]);
    } catch (err) {
      console.error('Error fetching venues:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update search when URL parameters change
  useEffect(() => {
    const keyword = searchParams.get('keyword') || '';
    const category = searchParams.get('category') || 'Wedding venue';
    setSearchTerm(keyword);
    setSelectedCategory(category);
    setPage(1);
    fetchVenues(1, keyword, category);
  }, [searchParams]); // Dependencies include searchParams

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchVenues(nextPage, searchTerm, selectedCategory);
  };

  const handleSearch = (term, category) => {
    setSearchTerm(term);
    setSelectedCategory(category); // Set selected category
    setPage(1);
    fetchVenues(1, term, category);
  };

  // Add new function to fetch top rated venues
  const fetchTopVenues = async () => {
    try {
        setTopVenuesLoading(true);
        const response = await fetch(
            `http://localhost:5000/api/venues/top-rated?category=${encodeURIComponent(selectedCategory)}`,
            {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch top venues');
        }

        setTopVenues(data);
    } catch (err) {
        console.error('Error fetching top venues:', err);
        setTopVenues([]);
    } finally {
        setTopVenuesLoading(false);
    }
  };

  // Add useEffect to fetch top venues when category changes
  useEffect(() => {
    fetchTopVenues();
  }, [selectedCategory]);

  return (
    <>
      <Navbar />
      <SearchSection 
        onSearch={handleSearch} 
        initialSearchTerm={searchTerm} 
        initialCategory={selectedCategory}
      />
      {!topVenuesLoading && topVenues.length > 0 && <Slider images={topVenues} />}
      
      {/* Full page loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="text-center">
            <div className="w-full text-center mb-4 text-lg text-purple-600">
              We are currently searching for results for your wedding...
            </div>
            <div className="w-48 h-1 bg-gray-200 rounded-full mx-auto">
              <div className="w-1/3 h-1 bg-purple-600 rounded-full animate-[loading_1s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[85%] mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">Local Vendors</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 items-start">
          {venues.map((venue) => (
            <VendorCard 
              key={venue._id}
              id={venue._id}
              name={venue.name}
              address={venue.address}
              rating={venue.rating}
              images={[venue.image_url]}
              email={venue.email}
              phone={venue.phone}
              original_url={venue.original_url}
            />
          ))}
        </div>

        {/* Show load more button only when not loading and has more results */}
        {!loading && hasMore && (
          <div className="flex justify-center mt-8">
            <button 
              onClick={handleLoadMore} 
              className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--hover-color)] text-white rounded-md transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Results;