import React from 'react';
import logo from '../../assets/Group 111 logo.svg';

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white py-3">
      <div className="mx-auto flex max-w-[1300px] items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src={logo} 
            alt="Planster Logo" 
            className="h-12 w-12"
          />
        </div>

        <div className="flex items-center space-x-8">
          <a href="/" className="text-gray-700 hover:text-gray-900">
            Home
          </a>
          <a href="/faq" className="text-gray-700 hover:text-gray-900">
            FAQ
          </a>
          <button className="rounded-full bg-indigo-100 px-6 py-2 text-black hover:bg-indigo-200"
          style={{
            backgroundColor: 'var(--secondary-color)',
          }}
          >
            View Vendors
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;