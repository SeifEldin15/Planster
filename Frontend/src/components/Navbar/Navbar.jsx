import React, { useState, useEffect } from 'react';
import logo from '../../assets/the logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Add this new function to handle FAQ click
  const handleFAQClick = (e) => {
    e.preventDefault();
    const currentPath = window.location.pathname;
    
    if (currentPath === '/') {
      // If on home page, just scroll to FAQ section
      const faqElement = document.getElementById('faq');
      if (faqElement) {
        faqElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on home page, navigate to home and set a flag in sessionStorage
      sessionStorage.setItem('scrollToFAQ', 'true');
      window.location.href = '/#faq';
    }
  };

  // Add useEffect to handle scroll after navigation
  useEffect(() => {
    const shouldScrollToFAQ = sessionStorage.getItem('scrollToFAQ');
    if (shouldScrollToFAQ) {
      sessionStorage.removeItem('scrollToFAQ');
      setTimeout(() => {
        const faqElement = document.getElementById('faq');
        if (faqElement) {
          faqElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <nav className="border-b border-gray-200 bg-white py-3">
      <div className="mx-auto flex max-w-[1300px] items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <a href="/">
            <img 
              src={logo} 
              alt="Planster Logo" 
              className="max-w-[120px]"
            />
          </a>
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
          <a href="/faq" className="text-gray-700 hover:text-gray-900" onClick={handleFAQClick}>
            FAQ
          </a>
          <a 
            href="/results"
            className="rounded-full bg-indigo-100 px-6 py-2 text-black hover:bg-indigo-200"
            style={{
              backgroundColor: 'var(--secondary-color)',
            }}
          >
            View Vendors
          </a>
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
            <a href="/faq" className="text-gray-700 hover:text-gray-900" onClick={handleFAQClick}>
              FAQ
            </a>
            <a 
              href="/results"
              className="rounded-full bg-indigo-100 px-6 py-2 text-black hover:bg-indigo-200 w-full"
              style={{
                backgroundColor: 'var(--secondary-color)',
              }}
            >
              View Vendors
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;