import axios from 'axios';
import React, { useState } from 'react';

const Setting = () => {
  const [name, setName] = useState('');
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token not found. Please log in again.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('logo', logo);

    try {
      const response = await axios.post(`${API_BASE_URL}/admin/setting`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Success:', response.data);
      alert('Settings saved successfully!');
      setName('');
      setLogo(null);
      setLogoPreview(null);
    } catch (error) {
      console.error('Error:', error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        alert('Token is invalid or expired. Please log in again.');
        localStorage.removeItem('token');
      } else {
        alert('Something went wrong. Please try again.');
      }
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg max-w-lg mx-auto shadow items-center mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Company Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-semibold mb-2">Company Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter company name"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">Upload Logo</label>
          <input
            type="file"
            onChange={handleLogoChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            accept="image/*"
            required
          />
          {logoPreview && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Logo Preview:</p>
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="w-24 h-24 object-contain mt-1 border rounded"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Setting;
