import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const CreateSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [subCategoryDescription, setSubCategoryDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authdetail=useSelector(state=>state.auth)
 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://techservice.myhealthgainer.in/category/all',{
            headers: { 'Content-Type': 'application/json' ,
            
           Authorization: `Bearer ${authdetail.token}`
    
      
        },
        }); 
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategory || !subCategoryName || !subCategoryDescription) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://techservice.myhealthgainer.in/subcategory?category=${selectedCategory}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${authdetail.token}`
        },
        body: JSON.stringify({
          name: subCategoryName,
          description: subCategoryDescription,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create subcategory');
      }

      const data = await response.json();
      alert(`Subcategory created`);
      
      // Clear form fields
      setSubCategoryName('');
      setSubCategoryDescription('');
      setSelectedCategory('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Create a New Subcategory</h1>

      <form onSubmit={handleSubmit}>
        {/* Select Category */}
        <label htmlFor="category" className="block mb-2">Select Category</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Subcategory Name */}
        <label htmlFor="subcategory-name" className="block mb-2">Subcategory Name</label>
        <input
          id="subcategory-name"
          type="text"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter subcategory name"
        />

        {/* Subcategory Description */}
        <label htmlFor="subcategory-description" className="block mb-2">Subcategory Description</label>
        <textarea
          id="subcategory-description"
          rows="4"
          value={subCategoryDescription}
          onChange={(e) => setSubCategoryDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter subcategory description"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Subcategory'}
        </button>

        {/* Error Message */}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default CreateSubCategory;
