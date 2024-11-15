import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const SearchSection = () => {
  const categories = [
    { name: 'Venue', active: true },
    { name: 'Photographer', active: false },
    { name: 'Chair Hire', active: false },
    { name: 'Decoration', active: false },
    { name: 'Officiant', active: false },
    { name: 'Transport', active: false },
  ];

  return (
    <div className="px-4 py-6 max-w-[85%] mx-auto flex justify-between items-center">
      
      <div className="flex flex-col flex-wrap gap-2 mb-6">
      <h1 className="text-2xl font-bold mb-6">Your Wedding</h1>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`px-4 py-2 rounded-full text-sm ${
              category.active 
                ? 'bg-indigo-500 text-white'
                : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>
    </div>
  );
};

export default SearchSection; 