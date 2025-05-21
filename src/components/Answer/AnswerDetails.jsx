import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { MyContext } from '../../MyContext/Mycontext';

const AnswerDetails = () => {
    // if (!answerData) return null;
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const { answerData, fetchAnswer, answerId } = useContext(MyContext);
    const [showSingleData, setShowSingleData] = useState();
    console.log("answerData", answerData);
    console.log("id", answerId);

        useEffect(() => {
            if (!answerData) return;

            console.log("All values =>", Object.values(answerData));

            const filterData = Object.values(answerData).filter((data) => {
                // Check if data and data.source exist
                console.log(data?.source?._id === answerId);
                return data?.responses?._id === answerId;
            });

            console.log("Filtered data =>", filterData);
        }, [answerData, answerId]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">View Details</h1>
            <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold mb-2">Question:</h2>
                <p className="text-gray-800 mb-4">{answerData.question || 'NA'}</p>

                <h2 className="text-xl font-bold mb-2">Answer:</h2>
                <p className="text-gray-700">{answerData.answer || 'NA'}</p>
            </div>
        </div>
    );
};

export default AnswerDetails;
