import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const id = 1; // Define the ID here or make it dynamic if needed

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://techservice.myhealthgainer.in/user/${id}`);
        if (!response.ok) {
          const errorData = await response.text(); // Get error response text
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData}`);
        }
        const data = await response.json();
        console.log('Fetched User Data:', data); // Log the fetched data to the console
        setUser(data);
      } catch (err) {
        console.error('Error fetching user data:', err.message); // Log the error message to the console
        setError('An error occurred while fetching user data.');
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">User Management</h2>
      {error && <p className="text-red-600">{error}</p>}
      {user ? (
        <div className="border-b py-2">
          <div className="flex flex-col">
            <span><strong>ID:</strong> {user.id}</span>
            <span><strong>Name:</strong> {user.name}</span>
            <span><strong>Email:</strong> {user.email}</span>
            <span><strong>Mobile Number:</strong> {user.mobileNumber}</span>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserManagement;
