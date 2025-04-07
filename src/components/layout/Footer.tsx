
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MERN MarketHub</h3>
            <p className="text-gray-600 text-sm">
              Your one-stop shop for all your needs. Browse through our catalog and find the perfect product for you.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-brand-blue text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-brand-blue text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-600 hover:text-brand-blue text-sm">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-600 hover:text-brand-blue text-sm">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-brand-blue text-sm">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-brand-blue text-sm">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-600 text-sm mb-2">
              Email: support@mernmarkethub.com
            </p>
            <p className="text-gray-600 text-sm mb-2">
              Phone: +1 (555) 123-4567
            </p>
            <p className="text-gray-600 text-sm">
              Address: 123 Market Street, San Francisco, CA 94103
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} MERN MarketHub. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-brand-blue">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-brand-blue">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
