import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null); 
  const [newName, setNewName] = useState(''); 
  const [newDescription, setNewDescription] = useState(''); 

  const authdetail=useSelector(state=>state.auth)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://techservice.myhealthgainer.in/category/all',{

          headers: {
           Authorization: `Bearer ${authdetail.token}`
    
        }
      }
      );
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Delete a category
  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://techservice.myhealthgainer.in/category/${id}`, {
        method: 'DELETE',
            headers: {
           Authorization: `Bearer ${authdetail.token}`
    
        }
      });
      if (!response.ok) throw new Error('Failed to delete category');

      setCategories(categories.filter((category) => category.id !== id)); // Remove from UI
    } catch (error) {
      setError(error.message);
    }
  };

  // Edit a category (submit changes)
  const editCategory = async (id) => {
    try {
      const response = await fetch(`https://techservice.myhealthgainer.in/category/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' ,
            
           Authorization: `Bearer ${authdetail.token}`
    
      
        },
        body: JSON.stringify({
          name: newName,
          description: newDescription,
        }),
      });

      if (!response.ok) throw new Error('Failed to update category');

      // Update the category list with new details
      const updatedCategory = await response.json();
      setCategories(categories.map((category) =>
        category.id === id ? updatedCategory : category
      ));
      setEditingCategory(null); // Exit edit mode
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle category editing (set edit mode)
  const startEditing = (category) => {
    setEditingCategory(category.id);
    setNewName(category.name);
    setNewDescription(category.description);
  };

  if (loading) {
    return <div className="text-center py-4">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin - Categories</h1>
      {categories.length > 0 ? (
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center justify-between bg-white p-4 rounded shadow-md border border-gray-200">
              {editingCategory === category.id ? (
                <div className="flex-1 mr-4">
                  <input
                    type="text"
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>
              ) : (
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1">{category.name}</h2>
                  <p className="text-gray-700">{category.description}</p>
                </div>
              )}

              {editingCategory === category.id ? (
                <div className="flex space-x-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => editCategory(category.id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={() => setEditingCategory(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => startEditing(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => deleteCategory(category.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No categories found.</p>
      )}
    </div>
  );
};

export default AdminCategories;
