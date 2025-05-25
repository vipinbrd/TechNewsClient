import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SubCategory = () => {
  const { id } = useParams(); // Extract the subcategory ID from the URL
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Subcategory ID:', id); // Log the ID to verify it's being passed correctly
    if (!id) {
      setError('Invalid subcategory ID');
      setLoading(false);
      return;
    }

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://techservice.myhealthgainer.in/article/sub/${id}`);
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
  }, [id]);

  return (
    <div className="container mx-auto py-8 px-4 lg:px-8">
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">Error: {error}</div>
      ) : articles.length === 0 ? (
        <div className="text-center text-gray-600">No articles available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="border border-gray-200 rounded-lg shadow-md bg-white p-4"
            >
              <img
                src={article.media[0]?.url || 'https://via.placeholder.com/600x400'}
                alt={article.title}
                className="w-full h-60 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-700 text-sm">
                {article.shortDescription || `${article.content.substring(0, 100)}...`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubCategory;
