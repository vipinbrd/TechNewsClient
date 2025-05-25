import React from 'react';
import { useParams } from 'react-router-dom';

const NewsPage = () => {
  const { slug } = useParams();
  // Normally, you would fetch news details based on the slug
  const newsDetails = {
    title: 'News Title',
    content: 'Detailed content about the news will go here.',
  };

  return (
    <div className="container mx-auto my-10 p-5">
      <h1 className="text-3xl font-bold mb-5">{newsDetails.title}</h1>
      <p className="text-gray-700">{newsDetails.content}</p>
    </div>
  );
};

export default NewsPage;
