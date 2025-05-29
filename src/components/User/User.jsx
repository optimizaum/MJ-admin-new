import React, { useState, useContext, useEffect } from 'react';
import { RiEditBoxLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../MyContext/Mycontext';
import TablePagination from "@mui/material/TablePagination";

const User = () => {
    const { userData, getUserData } = useContext(MyContext);
    console.log("sources", userData)
    const [posts, setPosts] = useState([
        {
            id: 1,
            name: "Video 1",
            email: "user1@example.com",
            contact: "This is the description for video 1",
        },
    ]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const navigate = useNavigate();

    const handleViewDetails = (index) => {
        navigate('/user-details', { state: { user: posts[index] } });
    };
    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className="p-6">
            <div className="overflow-x-auto">
                <h2 className='text-2xl font-bold mb-5'>User Details</h2>
                <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
                    <thead className="bg-blue-400 text-white">
                        <tr>
                            {/* <th className="py-3 px-6 text-left">Id</th> */}
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            {/* <th className="py-3 px-6 text-left">Contact</th> */}
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {userData && userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post, index) => (
                            <tr key={index} className="border-b">
                                {/* <td className="py-4 px-6">{post.id}</td> */}
                                <td className="py-4 px-6">{post.name}</td>
                                <td className="py-4 px-6">{post.email}</td>
                                {/* <td className="py-4 px-6">{post.contact}</td> */}
                                <td className="py-4 px-6">
                                    {/* <button
                                        className="font-bold px-4 py-2 rounded-lg text-xl transition"
                                    >
                                        <RiEditBoxLine />
                                    </button> */}
                                    <button
                                        className="font-bold px-4 py-2 rounded-lg text-xl transition cursor-pointer"
                                    >
                                        <MdDelete />
                                    </button>
                                    {/* <button
                                        onClick={() => handleViewDetails(index)}
                                        className="font-bold px-4 py-2 rounded-lg text-xl transition"
                                    >
                                        <FaEye />
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                <div className="ml-auto ">
                    <TablePagination
                        component="div"
                        count={userData.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default User;
