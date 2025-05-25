import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSlice } from '../../Redux/AuthSlice';
import { useDispatch } from 'react-redux';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      username: email,
      password: password,
    };

    fetch("https://techservice.myhealthgainer.in/authenticate", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Wrong Credential");
        }
        return res.json();
      })
      .then((res) => {
        dispatch(loginSlice(res));
        setToast("Login Successful");
        setTimeout(() => {
          setToast("");
          navigate("/admin");
        }, 2000);
      })
      .catch(() => {
        setToast("Invalid Credentials");
        setTimeout(() => setToast(""), 2000);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {toast && (
        <div className="absolute top-4 px-6 py-3 bg-blue-600 text-white rounded shadow-md animate-fade-in-out">
          {toast}
        </div>
      )}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
