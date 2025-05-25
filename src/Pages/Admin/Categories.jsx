// src/components/CategoriesManagement.js
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const authdetail=useSelector(state=>state.auth)
  console.log(authdetail)

  const addCategory = async () => {
    if (!name.trim() || !description.trim()) {
      setError('Both category name and description are required');
      return;
    }

    try {
      // Post the new category to the API
      const response = await axios.post('https://techservice.myhealthgainer.in/category', {
        name,
        description
      },{
                           headers: {
         Authorization: `Bearer ${authdetail.token}`
   }
      });

      if (response.status === 201) {
        setCategories([...categories, { name, description }]);
        setName('');
        setDescription('');
        setError('');
        setSuccess('Category added successfully!');
      }
    } catch (error) {
      setError('Failed to add category. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Categories Management</h2>
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
      <div className="my-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="p-2 border rounded mb-2 w-full"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Category Description"
          className="p-2 border rounded mb-2 w-full"
          rows="4"
        />
        <button
          onClick={addCategory}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Add Category
        </button>
      </div>
      <ul>
        {categories.map((cat, index) => (
          <li key={index} className="border-b py-2">
            <strong>{cat.name}:</strong> {cat.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesManagement;
