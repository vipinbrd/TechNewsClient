import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Admin/Sidebar';
import Header from '../Components/Admin/Header';

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-100 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
