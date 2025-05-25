import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import NewsCardSlider from './NewsCardSlider';
import SubCategory from './SubCategory';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const styles = {
    animateLightOnOff: {
      animation: 'lightOnOff 1s infinite'
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://techservice.myhealthgainer.in/article/all');
        if (!response.ok) throw new Error('Failed to fetch articles');
        const data = await response.json();
        const sortedArticles = data.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
        setArticles(sortedArticles);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchArticles();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Categories Navbar */}
      
      {/* <NewsCardSlider categoryId={2}/> */}
      <Categories />

      <div className="container mx-auto p-4 flex-grow">
        {/* Articles Section */}
        <h2 className="text-2xl font-bold mb-4" style={styles.animateLightOnOff}>
        Latest News
      </h2>
      <style>
        {`
          @keyframes lightOnOff {
            0% {
              color: black;
            }
            50% {
              color: red;
            }
            100% {
              color: black;
            }
          }

          .animateLightOnOff {
            animation: lightOnOff 2s infinite;
          }
        `}
      </style>
        
        {loading ? (
          <p>Loading articles...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {articles.map(article => (
              <Link
                key={article.id}
                to={`/news/${article.id}`}  // Navigate to article details page
                className="flex border p-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-200"
              >
                {/* Article Image */}
                <img
                  src={article.media[0]?.url || 'https://via.placeholder.com/150'}
                  alt={article.title}
                  className="w-24 h-32 object-cover rounded-lg mr-4 md:w-32 md:h-40 lg:w-48 lg:h-56"
                />

                {/* Article Content */}
                <div className="flex flex-col justify-between text-justify">
                  <h3 className="text-base font-semibold text-black ">{article.title}</h3>
                  
                  {/* Published Date in dd/mm/yy format */}
                  <span className="text-xs text-gray-500">
                    Published on: {new Date(article.publishedDate).toLocaleDateString('en-GB')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* <SubCategory/> */}
    </div>
  );
};

export default Home;
