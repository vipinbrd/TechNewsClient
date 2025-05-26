import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://techservice.myhealthgainer.in/category/all');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  if (loading) {
    return <div className="text-center py-4">Loading categories...</div>;
  }

  return (
    <div className="relative bg-gray-900 py-3 px-4 md:px-10">
  
      <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />

      <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />

      <div
        ref={containerRef}
        className="relative z-0 flex overflow-x-auto no-scrollbar space-x-4 py-2"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md text-sm md:text-base"
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
