import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Category = () => {
  const [showMore, setShowMore] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const navigate = useNavigate(); // Hook to navigate programmatically

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
    <div className="bg-gray-500  md:py-4 lg:py-4 md:px-4 lg:px-16">
      <div 
        className="container mx-auto flex justify-start items-center overflow-x-auto space-x-4 no-scrollbar" 
        ref={containerRef}
      >
        {/* Display Categories in one row for mobile, sliding right for overflow */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className=" text-white text-lg font-medium hover:text-black px-4 py-2 rounded-md transition-transform duration-300 transform "
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
