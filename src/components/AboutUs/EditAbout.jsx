import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditAbout = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_BASE_URL}/admin/about-us/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const { title, description } = response.data.about;
                setFormData({
                    title: title || "",
                    description: description || "",
                });

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_BASE_URL}/admin/about-us/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Updated about:", response.data);
            navigate('/about-details');
        } catch (error) {
            console.error("Error updating about:", error);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg max-w-lg mx-auto shadow items-center mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Update About Us</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-lg font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        value={formData.title || ""} // Prevent undefined
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
                        value={formData.description || ""} // Prevent undefined
                        name='description'
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter Description"
                        required
                    />

                </div>
                <button
                    type="submit"
                    className="bg-blue-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditAbout;
