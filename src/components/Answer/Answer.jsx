import React, { useEffect, useState, useContext } from 'react';
import { RiEditBoxLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import TablePagination from "@mui/material/TablePagination";
import { MyContext } from '../../MyContext/Mycontext';

const Answer = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const { answerData, fetchAnswer } = useContext(MyContext);
    console.log("-",answerData)
    const navigate = useNavigate();

    useEffect(() => {
        fetchAnswer();
    }, []);

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleViewDetails = (answerData) => {
        navigate(`/answer-details/${answerData._id}`, {
            state: { answerDetails: answerData },
        });
    };


    return (
        <div className="p-6">
            <h2 className='text-2xl font-bold mb-5'>Answer Details</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
                    <thead className="bg-blue-400 text-white">
                        <tr>
                            <th className="py-3 px-3 text-left">User Name</th>
                            {/* <th className="py-3 px-3 text-left">Type</th> */}
                            {/* <th className="py-3 px-3 text-left">Source</th> */}
                            <th className="py-3 px-3 text-left">Question</th>
                            <th className="py-3 px-3 text-left">Answer</th>
                            <th className="py-3 px-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {answerData.length === 0 && (
                            <tr><td colSpan={6} className="text-center py-6">No answers found.</td></tr>
                        )}
                        {answerData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((post, index) => (
                                <tr key={post._id || index} className="border-b">
                                    <td className="py-4 px-3">{post?.userData?.name || 'NA'}</td>
                                    {/* <td className="py-4 px-3">{post?.userData?.sourceType || 'NA'}</td> */}
                                    {/* <td className="py-4 px-3">{post?.userData?.source?.slice(0, 10) || 'NA'}</td> */}
                                    <td className="py-4 px-3">{post?.responses?.[0]?.label?.slice(0, 15) || 'NA'}</td>
                                    <td className="py-4 px-3">{post?.responses?.[0]?.value?.slice(0, 15) || 'NA'}</td>
                                    <td className="py-4 px-3 flex gap-2">
                                        <button className="text-xl" title="Edit"><RiEditBoxLine /></button>
                                        <button className="text-xl" title="Delete"><MdDelete /></button>
                                        <button
                                            className="text-xl cursor-pointer"
                                            title="View Details"
                                            onClick={() => handleViewDetails(post.responses?.[0])}
                                        >
                                            <FaEye />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div className="mt-4 flex justify-end">
                    <TablePagination
                        component="div"
                        count={answerData.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[3, 5, 10]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Answer;