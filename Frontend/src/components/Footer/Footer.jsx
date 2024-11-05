import React from 'react';
import { Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='max-w-[1300px] mx-auto'>
      <div className="py-4 ">
        <div className=" space-y-2 px-4 ">
          <p className="text-sm text-gray-600">Follow us</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-8 px-4 ">
        <div className=" mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Links */}
            <div className="flex flex-wrap justify-center space-x-4 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors">
                Terms and conditions
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Licensing
              </a>
            </div>

            <div className="text-sm text-gray-600">
              Copyright © App. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
