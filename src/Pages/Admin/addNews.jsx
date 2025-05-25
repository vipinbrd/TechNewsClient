import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';


const quillModules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['link', 'image', 'video'],
    [{ 'align': [] }],
    ['clean'],
  ],
};


const quillFormats = [
  'header', 'font', 'list', 'bullet',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'link', 'image', 'video', 'align'
];

const NewsManagement = () => {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]); 
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); 
  const [wordCount, setWordCount] = useState(0); 


  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState('Image');
  const [caption, setCaption] = useState('');
  const [priorityIndex, setPriorityIndex] = useState(1);
  const [file, setFile] = useState(null);

  const authdetail=useSelector(state=>state.auth);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://techservice.myhealthgainer.in/category/all',{
            headers: {
         Authorization: `Bearer ${authdetail.token}`
   }
        });
        setCategories(response.data.map(category => ({
          id: category.id,
          name: category.name,
          subCategories: category.subCategories 
        })));
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories.');
      }
    };
    fetchCategories();
  }, []);

  
  const handleCategoryChange = (categoryId) => {
    setCategoryId(categoryId);
    const selectedCategory = categories.find(category => category.id === parseInt(categoryId));
    setSubCategories(selectedCategory ? selectedCategory.subCategories : []);
  };

  const handleContentChange = (value) => {
    setContent(value);
    const plainText = value.replace(/<[^>]+>/g, '').trim(); 
    const words = plainText.split(/\s+/).filter(Boolean).length; 
    setWordCount(words);
  };

  const addNews = async () => {
    const newArticle = {
      title,
      shortDescription,
      content,
      authorId: 1, 
      articleStatus: 'PUBLISHED',
      tags: ['Technology', 'News'],
      categoryId: parseInt(categoryId) || 2,
      subCategoryId: subCategoryId ? parseInt(subCategoryId) : null, 
    };

    try {
     
      const newsResponse = await axios.post('https://techservice.myhealthgainer.in/article', newArticle,{
                    headers: {
         Authorization: `Bearer ${authdetail.token}`
   }
      });
      setNews([...news, newsResponse.data]);
      setTitle('');
      setContent('');
      setShortDescription('');
      setCategoryId('');
      setSubCategoryId('');

     
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('mediaType', mediaType);
        formData.append('articleId', newsResponse.data.id);
        formData.append('caption', caption);
        formData.append('priorityIndex', priorityIndex);
        formData.append('mediaUrl', mediaUrl);

        await axios.post('https://techservice.myhealthgainer.in/media', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authdetail.token}`
          },
        });

        setMediaUrl('');
        setCaption('');
        setPriorityIndex(1);
        setFile(null);
      }

   
      setSuccessMessage('News added successfully!');


      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } catch (err) {
      setError('Failed to post the news or media data.');
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">News Management</h2>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>} 
      <div className="my-4">
       
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="News Title"
          className="p-2 border rounded mr-2 w-full"
        />
        <input
          type="text"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          placeholder="Short Description"
          className="p-2 border rounded mr-2 w-full mt-2"
        />
        
        <ReactQuill
          value={content}
          onChange={handleContentChange}
          modules={quillModules}
          formats={quillFormats}
          placeholder="Write the news content here..."
          className="my-2"
        />
        <p>Word Count: {wordCount}</p>

        <select
          value={categoryId}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="p-2 border rounded mt-2 w-full"
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

 
        {subCategories.length > 0 && (
          <select
            value={subCategoryId}
            onChange={(e) => setSubCategoryId(e.target.value)}
            className="p-2 border rounded mt-2 w-full"
          >
            <option value="">Select Subcategory</option>
            {subCategories.map(subCategory => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.name}
              </option>
            ))}
          </select>
        )}

        {/* Media Upload */}
        <input
          type="url"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          placeholder="Media URL"
          className="p-2 border rounded w-full mt-4"
        />
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Media Caption"
          className="p-2 border rounded w-full mt-2"
        />
        <input
          type="number"
          value={priorityIndex}
          onChange={(e) => setPriorityIndex(e.target.value)}
          placeholder="Priority Index"
          className="p-2 border rounded w-full mt-2"
        />
        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          className="p-2 border rounded w-full mt-2"
        >
          <option value="Image">Image</option>
          <option value="Video">Video</option>
        </select>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2 border rounded w-full mt-2"
        />

        <button
          onClick={addNews}
          className="bg-blue-600 text-white p-2 rounded mt-2"
        >
          Add News and Media
        </button>
      </div>

      <ul>
        {news.map((item, index) => (
          <li key={index} className="border-b py-2">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsManagement;
