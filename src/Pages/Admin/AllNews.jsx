// src/components/admin/NewsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const authdetail=useSelector(state=>state.auth);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://techservice.myhealthgainer.in/article/all',{
                             headers: {
         Authorization: `Bearer ${authdetail.token}`
   }
        });
        const sortedNews = response.data.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
        setNews(sortedNews);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news articles.');
      }
    };
  
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await axios.delete(`https://techservice.myhealthgainer.in/article/remove/${id}`,{
                             headers: {
         Authorization: `Bearer ${authdetail.token}`
   }
        });
        setNews(news.filter((article) => article.id !== id)); // Remove deleted article from the list
      } catch (err) {
        setError('Failed to delete the article.');
        console.error(err);
      }
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">All News Articles</h2>
      {error && <p className="text-red-500">{error}</p>}
      
      {news.length === 0 ? (
        <p>No news articles available.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Tags</th>
              <th className="py-2 px-4 border">Published Date</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((article) => (
              <tr key={article.id} className="border-b">
                <td className="py-2 px-4 border">{article.title}</td>
                <td className="py-2 px-4 border">{article.shortDescription}</td>
                <td className="py-2 px-4 border">{article.articleStatus}</td>
                <td className="py-2 px-4 border">{article.tags.join(', ')}</td>
                <td className="py-2 px-4 border">{new Date(article.publishedDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">
                  <Link
                    to={`/admin/all-article/edit/${article.id}`}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NewsList;
