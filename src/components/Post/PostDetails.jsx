import React, { useEffect, useContext } from 'react';
import { MyContext } from '../../MyContext/Mycontext';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
    const { id } = useParams();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const { userSingleData, getSingleData } = useContext(MyContext);

    useEffect(() => {
        if (id) {
            getSingleData(id);
        }
    }, [id]);

    // Destructure safely from nested sourceData
    const {
        title,
        description,
        sourceType,
        source
    } = userSingleData?.sourceData || {};

    const formData = userSingleData?.formData;

    // Optional: Display loading while fetching
    if (!userSingleData?.sourceData) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">View Details</h1>
            <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold">Title: {title}</h2>
                <p className="mt-2 text-gray-700 ">
                    <span className="font-bold">Type Of Post:</span> {sourceType}
                </p>
                
                <p className="mt-2 text-gray-700"> 
                    <span className="font-bold">Description:</span>{description}
                </p>

                <div className="mt-4">
                    <p className="text-gray-700 mb-2 font-bold">Source:</p>
                    {sourceType === 'image' ? (
                        <img
                            src={`${API_BASE_URL}/uploads/${source}`}
                            alt={title}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    ) : (
                        <a
                            href={`${API_BASE_URL}/uploads/${source}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            View Source
                        </a>
                    )}
                </div>

                {formData?.fields?.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Form Fields:</h3>
                        {formData.fields.map((field, index) => (
                            <div key={index} className="p-4 mb-3">
                                <p className="text-gray-800">
                                    <strong>Question:</strong> {field.label}
                                </p>
                                <p className="text-gray-800">
                                    <strong>Type:</strong> {field.type}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostDetails;
