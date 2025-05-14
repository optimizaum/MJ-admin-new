import React, { useState } from 'react';

const Setting = () => {
  const [companyName, setCompanyName] = useState('');
  const [logo, setLogo] = useState(null);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (companyName && logo) {
      console.log('Company Name:', companyName);
      console.log('Logo:', logo.name); // or use logo for uploading the file
    } else {
      alert('Please fill in all fields');
    }
  };

  // Handle logo file change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Company Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="companyName" className="block text-lg font-semibold mb-2">Company Name</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter company name"
            required
          />
        </div>

        <div>
          <label htmlFor="logo" className="block text-lg font-semibold mb-2">Upload Logo</label>
          <input
            type="file"
            id="logo"
            onChange={handleLogoChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            accept="image/*"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Setting;
