import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [news, setNews] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [articleStatus, setArticleStatus] = useState('');
  const [tags, setTags] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState(null);
   const authdetail=useSelector(state=>state.auth)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://techservice.myhealthgainer.in/article/${id}`,{
                             headers: {
         Authorization: `Bearer ${authdetail.token}`
   }
        });
        const article = response.data;
        setNews(article);
        setTitle(article.title);
        setContent(article.content);
        setShortDescription(article.shortDescription);
        setArticleStatus(article.articleStatus);
        setTags(article.tags);
        setCategoryId(article.categoryId);
      } catch (err) {
        setError('Failed to fetch news article.');
        console.error(err);
      }
    };

    fetchNews();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`https://techservice.myhealthgainer.in/article/${id}`, {
        title,
        content,
        shortDescription,
        articleStatus,
        tags,
        categoryId,
      },{
                           headers: {
         Authorization: `Bearer ${authdetail.token}`
   }
      });
      navigate('/admin/all-article'); 
    } catch (err) {
      setError('Failed to update news article.');
      console.error(err);
    }
  };

  if (!news) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit News Article</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="p-2 border rounded w-full mb-2"
      />
      <input
        type="text"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        placeholder="Short Description"
        className="p-2 border rounded w-full mb-2"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="p-2 border rounded w-full mb-2"
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value.split(','))}
        placeholder="Tags (comma-separated)"
        className="p-2 border rounded w-full mb-2"
      />
      <input
        type="text"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        placeholder="Category ID"
        className="p-2 border rounded w-full mb-2"
      />
      <select
        value={articleStatus}
        onChange={(e) => setArticleStatus(e.target.value)}
        className="p-2 border rounded w-full mb-2"
      >
        <option value="DRAFT">Draft</option>
        <option value="PUBLISHED">Published</option>
        <option value="ARCHIVED">Archived</option>
      </select>
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update News
      </button>
    </div>
  );
};

export default EditNews;
