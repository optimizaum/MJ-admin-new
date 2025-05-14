import React from 'react';
import { useLocation } from 'react-router-dom';

const UserDetails = () => {
  const location = useLocation();
  const { user } = location.state || {}; 

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">User Details</h2>
        <div className="mb-4">
          <strong>ID:</strong> {user.id}
        </div>
        <div className="mb-4">
          <strong>Name:</strong> {user.name}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="mb-4">
          <strong>Contact:</strong> {user.contact}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
