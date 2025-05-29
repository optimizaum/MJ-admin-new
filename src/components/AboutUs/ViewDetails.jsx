import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../MyContext/Mycontext";
import { useParams } from 'react-router-dom';

const ViewDetails = () => {
    // const location = useLocation();
    const { id } = useParams();
    const { singleAbout, fetchSingleAbout } = useContext(MyContext);
    console.log("first", singleAbout)
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchSingleAbout(id);
        }

    }, [id])

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">About Us Details</h2>
            <div className="bg-white shadow-md rounded-lg p-6">
                <p className="mb-4">
                    <strong className="text-gray-700">Title:</strong> {singleAbout?.about?.title || "na"}
                </p>
                <p className="mb-4">
                    <strong className="text-gray-700">Description:</strong>{" "}
                    {singleAbout?.about?.description || "na"}
                </p>

                {/* Add more fields here if needed */}
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default ViewDetails;