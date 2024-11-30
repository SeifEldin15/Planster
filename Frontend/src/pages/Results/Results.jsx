import React, { useState, useEffect } from 'react';
import VendorCard from '../../components/VendorCard/VendorCard';
import Navbar from '../../components/Navbar/Navbar'
import Slider from '../../components/Slider/Slider'
import SearchSection from '../../components/SearchSection/SearchSection'
// import Footer from '../../components/Footer/Footer'
import testimg from '../../assets/testimg.jpg';
import { useSearchParams } from 'react-router-dom';
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
];
const Results = () => {
  const [searchParams] = useSearchParams();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);  // Track current page
  const [hasMore, setHasMore] = useState(true);  // Track if more results exist
  const VENUES_PER_PAGE = 10;  // Number of venues to load per page
  
  // Get search parameters from URL
  const initialKeyword = searchParams.get('keyword') || '';
  const initialCategory = searchParams.get('category') || 'Wedding venue';
  
  const [searchTerm, setSearchTerm] = useState(initialKeyword);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const fetchVenues = async (pageNum, keyword = '', category = 'Wedding venue') => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/venues?limit=${VENUES_PER_PAGE}&page=${pageNum}&keyword=${keyword}&category=${category}`, // Include category in the request
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

  return (
    <>
    <Navbar />
    <SearchSection 
      onSearch={handleSearch} 
      initialSearchTerm={searchTerm} 
      initialCategory={selectedCategory}
    />
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
      {hasMore && (
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
    {/* <Footer /> */}
    </>
  );
};

export default Results;