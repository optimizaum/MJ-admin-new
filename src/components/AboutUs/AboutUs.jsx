import axios from 'axios';
import React, { useState } from 'react';

const AboutUs = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };



    return (
        <div className="p-6 bg-white rounded-lg max-w-lg mx-auto shadow items-center mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Add About Us</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-lg font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        name='title'
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter Title"
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-2">Description</label>
                    <textarea
                        // type="textArea"
                        value={formData.description}
                        name='description'
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter Description"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                    Add About
                </button>
            </form>
        </div>
    );
};

export default AboutUs;
