import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const SearchSection = ({ onSearch, initialSearchTerm = '', initialCategory = 'Wedding venue' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [categories, setCategories] = useState([
    { name: 'Wedding venue', active: initialCategory === 'Wedding venue' },
    { name: 'Photographer', active: initialCategory === 'Photographer' },
    { name: 'Chair Hire', active: initialCategory === 'Chair Hire' },
    { name: 'Decoration', active: initialCategory === 'Decoration' },
    { name: 'Officiant', active: initialCategory === 'Officiant' },
    { name: 'Transport', active: initialCategory === 'Transport' },
  ]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    const activeCategory = categories.find(cat => cat.active)?.name || 'Wedding venue';
    onSearch(searchTerm, activeCategory);
    navigate(`/results?keyword=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(activeCategory)}`);
  };

  const handleCategoryClick = (clickedCategory) => {
    const updatedCategories = categories.map(category => ({
      ...category,
      active: category.name === clickedCategory
    }));
    setCategories(updatedCategories);
    
    // Trigger search with new category
    const activeCategory = clickedCategory;
    onSearch(searchTerm, activeCategory);
    navigate(`/results?keyword=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(activeCategory)}`);
  };

  return (
    <div className="px-4 py-6 max-w-[85%] mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Your Wedding</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm ${
                category.active 
                  ? 'bg-[var(--primary-color)] text-white'
                  : 'bg-[var(--secondary-color)] text-[var(--primary-color)] hover:bg-[var(--secondary-color)]/80'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <form onSubmit={handleSearch} className="relative w-full md:w-64 lg:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchSection; 