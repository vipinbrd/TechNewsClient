import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SiGnuprivacyguard } from "react-icons/si"; 
import { IoMdClose } from "react-icons/io"; 
import SearchNews from '../../Pages/MainApp/SearchNews'; 
import SearchedNews from '../../Pages/MainApp/SearchedNews'; 
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [categories, setCategories] = useState([]); 
  const menuRef = useRef(null);

  useEffect(() => {
    const registeredStatus = localStorage.getItem('isRegistered') === 'true';
    setIsRegistered(registeredStatus);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://techservice.myhealthgainer.in/category/all');
        const data = response.data.map(category => ({
          name: category.name,
          subCategories: category.subCategories.map(sub => sub.name),
        }));
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="bg-gray-800 text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-4 relative">
          {/* Mobile View */}
          <div className="lg:hidden flex items-center w-full space-x-4">
            {/* Logo */}
            <div className="text-2xl font-bold flex-shrink-0">
              <Link to="/">Tech News</Link>
            </div>

            {/* SearchNews Component */}
            <div className="flex-grow">
              <SearchNews />
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Desktop View */}
          <div className="hidden lg:flex items-center justify-between space-x-4 w-full">
            {/* Logo */}
            <div className="text-2xl font-bold">
              <Link to="/">Tech News</Link>
            </div>

            {/* SearchNews Component */}
            <div className="w-[30%] mx-auto">
              <SearchNews />
            </div>

            {/* Menu Links */}
            <ul className="flex justify-between gap-6 px-8 items-center ml-auto">
              <li>
                <Link to="/" className="block text-lg font-medium hover:text-red-500" onClick={handleLinkClick}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="block text-lg font-medium hover:text-red-500" onClick={handleLinkClick}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="block text-lg font-medium hover:text-red-500" onClick={handleLinkClick}>
                  Contact
                </Link>
              </li>
            </ul>

            {/* Hide signup icon if user is registered */}
            {!isRegistered && (
              <Link to="/register" className="hover:text-gray-300 ml-4">
                <SiGnuprivacyguard />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } fixed top-0 right-0 h-full w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out lg:hidden z-50`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white focus:outline-none"
          onClick={() => setIsOpen(false)}
        >
          <IoMdClose className="w-8 h-8" />
        </button>

        <ul className="space-y-4 text-left mt-12">
          <li>
            <Link to="/" className="block hover:text-red-500" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="block hover:text-red-500" onClick={handleLinkClick}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="block hover:text-red-500" onClick={handleLinkClick}>
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Render SearchedNews below the search bar */}
      <SearchedNews />
    </>
  );
};

export default Navbar;
