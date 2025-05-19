import React, { useState, useEffect } from 'react';

const EditProfile = () => {
  const [companyName, setCompanyName] = useState('');
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    const existingData = {
      companyName: '',
      logoUrl: '', 
    };
    setCompanyName(existingData.companyName);
    setLogoPreview(existingData.logoUrl);
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (companyName) {
      console.log('Updated Company Name:', companyName);
      if (logo) {
        console.log('New Logo File:', logo.name);
      } else {
        console.log('Logo not changed');
      }
      alert('Settings updated!');
    } else {
      alert('Please fill in the company name');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg max-w-lg mx-auto shadow items-center mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Company Settings</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label htmlFor="companyName" className="block text-lg font-semibold mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="logo" className="block text-lg font-semibold mb-2">
            Change Logo (optional)
          </label>
          <input
            type="file"
            id="logo"
            onChange={handleLogoChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            accept="image/*"
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
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
