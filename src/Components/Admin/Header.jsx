
import React from 'react';
import { logoutSlice } from '../../Redux/AuthSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate =useNavigate()
  const dispatch=useDispatch()
  function logoutHandler(){
  
     dispatch(logoutSlice());
     navigate("/admin/login")
  }
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">News Admin</h1>
        <button onClick={()=>logoutHandler()}className="bg-red-600 px-4 py-2 rounded">Logout</button>
      </div>
    </header>
  );
};

export default Header;
