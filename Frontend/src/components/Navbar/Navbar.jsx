import React from 'react';

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white  py-3">
      <div className="mx-auto flex max-w-[1300px] items-center justify-between">
        {/* Logo and brand name */}
        <div className="flex items-center space-x-2">
          <svg
            className="h-6 w-6 text-indigo-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M7 8h10M7 12h10M7 16h10" />
          </svg>
          <span className="text-xl font-semibold text-indigo-500">Planster</span>
        </div>

        {/* Navigation links */}
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