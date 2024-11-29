import React from 'react';

const PrimaryButton = ({ children, onClick, className = '' }) => {
  return (
    <button 
      className={`px-8 py-3 rounded-lg text-lg font-medium hover:bg-purple-100 transition-colors border ${className}`}
      onClick={onClick}
      style={{
        backgroundColor: 'var(--secondary-color)',
        color: 'var(--primary-color)',
        borderColor: 'var(--primary-color)',
        boxShadow: '0 0 20px rgba(106, 108, 196, 0.4)'
      }}
    >
      {children}
    </button>
  );
};

export default PrimaryButton; 