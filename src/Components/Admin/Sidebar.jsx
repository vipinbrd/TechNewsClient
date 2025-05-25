
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      <ul className="space-y-4 p-4">
        <li><Link to="/admin/dashboard" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link></li>
        <li><Link to="/admin/categories" className="block hover:bg-gray-700 p-2 rounded">Categories Management</Link></li>
        <li><Link to="/admin/sub-categories" className="block hover:bg-gray-700 p-2 rounded">Sub-Category</Link></li>
        <li><Link to="/admin/news" className="block hover:bg-gray-700 p-2 rounded">News Management</Link></li>
        <li><Link to="/admin/all-cat" className="block hover:bg-gray-700 p-2 rounded">All Category</Link></li>
        <li><Link to="/admin/all-article" className="block hover:bg-gray-700 p-2 rounded">All Articles</Link></li>
        <li><Link to="/admin/users" className="block hover:bg-gray-700 p-2 rounded">User Management</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
