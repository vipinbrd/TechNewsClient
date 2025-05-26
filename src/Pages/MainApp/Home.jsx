import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Categories from './Categories';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Categories Navbar */}
      <Categories />

      <div className="container mx-auto p-4 flex-grow">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 animate-pulse text-red-600">
          Latest News
        </h2>

        {loading ? (
          <p className="text-center">Loading articles...</p>
        ) : error ? (
          <p className="text-center text-red-600">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                to={`/news/${article.id}`}
                key={article.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
              >
                {/* Article Image */}
                <img
                  src={article.media[0]?.url || 'https://via.placeholder.com/300x200'}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Article Content */}
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>

                  <span className="text-xs text-white bg-gray-800 w-fit px-2 py-0.5 rounded-md">
                    {new Date(article.publishedDate).toLocaleDateString('en-GB')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
