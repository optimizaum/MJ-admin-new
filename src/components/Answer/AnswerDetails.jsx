import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AnswerDetails = () => {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');


    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">View Details</h1>
            <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold mb-2">Question:</h2>
                <p className="text-gray-800 mb-4">{question || 'NA'}</p>

                <h2 className="text-xl font-bold mb-2">Answer:</h2>
                <p className="text-gray-700">{answer || 'NA'}</p>
            </div>
        </div>
    );
};

export default AnswerDetails;
