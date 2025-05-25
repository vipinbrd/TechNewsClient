import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';   

const CategoryArticles = () => {
  const { categoryId } = useParams(); // Get the category ID from the URL
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if categoryId is valid
    if (!categoryId) {
      console.error('Category ID is undefined or invalid');
      setError('Category ID is missing');
      setLoading(false);
      return;
    }

    const fetchArticles = async () => {
      console.log(`Fetching articles for category ID: ${categoryId}`); // Log category ID

      try {
        const response = await fetch(`https://techservice.myhealthgainer.in/category/${categoryId}`);
        if (!response.ok) {
          const errorData = await response.json(); // Log the full response for debugging
          console.error('Error Response:', errorData);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched Articles:', data); // Log fetched articles to console
        setArticles(data); // Set articles directly based on the response
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
        setError(error.message); // Set the error message to display
        setLoading(false);
      }
    };

    fetchArticles();
  }, [categoryId]);

  if (loading) {
    return <div className="text-center py-4">Loading articles...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 py-4 px-2 md:px-6 lg:px-20">
      <div className="container mx-auto">
        <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mb-4">
          Articles 
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.length > 0 ? (
            articles.map((article) => (
              <div key={article.id} className="bg-white p-3 md:p-4 border border-gray-200 rounded shadow">
                <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-2">
                  {article.title}
                </h2>
                <p className="text-sm md:text-base text-gray-700">
                  {article.shortDescription}
                </p>
                <Link
                  to={`/news/${article.id}`}
                  className="text-blue-500 hover:underline mt-2 block text-sm md:text-base"
                >
                  Read more
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center py-4">No articles found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryArticles;
