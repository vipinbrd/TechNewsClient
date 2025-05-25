import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-sm leading-relaxed">
              We bring you the latest and most relevant news from around the world. Stay informed with our up-to-date and accurate news articles.
            </p>
          </div>

   
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

       
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <ul className="flex justify-center sm:justify-start space-x-6">
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  Facebook
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  Twitter
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>

    
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Tech News. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  