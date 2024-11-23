import React, { useState } from 'react';
import logo from '../../assets/Group 111 logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 bg-white py-3">
      <div className="mx-auto flex max-w-[1300px] items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <img 
            src={logo} 
            alt="Planster Logo" 
            className="h-12 w-12"
          />
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-gray-700 hover:text-gray-900">
            Home
          </a>
          <a href="/faq" className="text-gray-700 hover:text-gray-900">
            FAQ
          </a>
          <button 
            className="rounded-full bg-indigo-100 px-6 py-2 text-black hover:bg-indigo-200"
            style={{
              backgroundColor: 'var(--secondary-color)',
            }}
          >
            View Vendors
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`absolute top-16 left-0 right-0 bg-white border-b border-gray-200 md:hidden transform transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="flex flex-col space-y-4 px-4 py-4">
            <a href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </a>
            <a href="/faq" className="text-gray-700 hover:text-gray-900">
              FAQ
            </a>
            <button 
              className="rounded-full bg-indigo-100 px-6 py-2 text-black hover:bg-indigo-200 w-full"
              style={{
                backgroundColor: 'var(--secondary-color)',
              }}
            >
              View Vendors
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;