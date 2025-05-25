import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const NewsCardSlider = ({ categoryId }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (!categoryId) {
      setError('Invalid category ID');
      setLoading(false);
      return;
    }

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://techservice.myhealthgainer.in/category/${categoryId}`);
        if (!response.ok) throw new Error('Failed to fetch articles');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [categoryId]);

  // Slider settings with auto-play and responsive breakpoints
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Default to show 3 articles at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Move slider every 2 seconds
    responsive: [
      {
        breakpoint: 1024, // Tablets and below
        settings: {
          slidesToShow: 2, // Show 2 articles on tablets
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Mobile large
        settings: {
          slidesToShow: 1, // Show 1 article on mobile
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Mobile small
        settings: {
          slidesToShow: 1, // Ensure 1 article is shown on small mobile
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Handler for clicking on a news card
  const handleCardClick = (articleId) => {
    navigate(`/news/${articleId}`); // Navigate to the article details page
  };

  return (
    <div className="w-full max-w-full md:max-w-3xl lg:max-w-6xl mx-auto py-8 px-2 lg:px-4 overflow-x-hidden">
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">Error: {error}</div>
      ) : articles.length === 0 ? (
        <div className="text-center text-gray-600">No articles available.</div>
      ) : (
        <Slider {...settings} className="w-full">
          {articles.map((article) => (
            <div
              key={article.id}
              onClick={() => handleCardClick(article.id)} // Call handleCardClick on click
              className="w-11/12 md:w-1/2 lg:w-1/3 p-4 mx-auto lg:mx-4 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
              style={{
                backdropFilter: 'blur(10px)', // Blur effect
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', // Modern shadow effect
              }}
            >
              <img
                src={article.media[0]?.url || 'https://via.placeholder.com/600x400'}
                alt={article.title}
                className="w-full h-60 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-lg font-semibold mb-2 overflow-hidden text-ellipsis line-clamp-2">
                {article.title}
              </h2>
              <p className="text-gray-700 text-sm">
                {article.shortDescription || `${article.content.substring(0, 100)}...`}
              </p>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default NewsCardSlider;
