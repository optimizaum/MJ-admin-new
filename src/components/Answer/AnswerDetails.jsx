import React from 'react';
import { useLocation } from 'react-router-dom';

const AnswerDetails = () => {
    const location = useLocation();
    const answerData = location.state?.answerDetails;
    console.log("answerData", answerData);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Answer Details</h1>
            <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold mb-2">Question:</h2>
                <p className="text-gray-800 mb-4">{answerData?.label || 'NA'}</p>

                <h2 className="text-xl font-bold mb-2">Answer:</h2>
                <p className="text-gray-700">{answerData?.value || 'NA'}</p>
            </div>
        </div>
    );
};

export default AnswerDetails;