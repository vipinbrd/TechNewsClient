import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comments';

const ArticleDetails = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const response = await fetch(`https://techservice.myhealthgainer.in/article/${id}`); // Fixed backticks for template string
        if (!response.ok) throw new Error('Failed to fetch article details');
        const data = await response.json();
        setArticle(data);  // This now includes both article details and comments
      } catch (error) {
        console.error('Error fetching article details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticleDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-4">Loading article details...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-2 md:p-6 lg:p-8">
      {article ? (
        <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg ">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center md:text-left">
            {article.title}
          </h1>
          <div className="text-gray-600 text-xs md:text-sm mb-4 text-center md:text-left">
            Published on: {new Date(article.publishedDate).toLocaleDateString('en-GB')}
          </div>
          <div className="text-black font-semibold text-base md:text-base mb-4 md:text-left">
            {article.shortDescription}
          </div>
          {article.media?.length > 0 && ( // Ensure article.media is defined
            <div className="flex justify-center mb-4">
              <img
                src={article.media[0]?.url}
                alt={article.title}
                className="rounded-lg shadow-md"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '400px',
                }}
              />
            </div>
          )}
          <div
            className="article-content text-black font-medium text-sm md:text-base lg:text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      ) : (
        <div className="text-center py-4">No article found.</div>
      )}
      {/* Pass the comments directly from the article data */}
      {article?.comments && <Comments comments={article.comments} articleId={article.id} />}
    </div>
  );
};

export default ArticleDetails;
