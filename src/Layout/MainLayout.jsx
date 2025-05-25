import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/MainApp/Navbar';
import Footer from '../Components/MainApp/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Changed flex -> flex-col */}
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
