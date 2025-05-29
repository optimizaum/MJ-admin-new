import React, { useState, useContext, useEffect } from 'react';
import { RiEditBoxLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../MyContext/Mycontext';
import TablePagination from "@mui/material/TablePagination";
import axios from 'axios';

const AboutAllDetails = () => {
    const { allAbout, fetchAllAbout } = useContext(MyContext)
    console.log(allAbout)
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // console.log("allabout",allAbout);

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

    const handleViewDetails = (id) => {
        navigate(`/view-details/${id}`);
    };

    useEffect(() => {
        fetchAllAbout();
    }, []);
    const handleAddPost = () => {
        navigate('/about');
    }
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.delete(`${API_BASE_URL}/admin/about-us/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                // toast.success('Deleted Successfully');
                fetchAllAbout();
            }
        } catch (err) {
            console.error(err)
        }
    }
    const handleEdit = (id) => {
        navigate(`/edit-aboutus/${id}`);
    };


    return (
        <div className="p-6">
            <div className="overflow-x-auto">
                <h2 className='text-2xl font-bold mb-5'>About Details</h2>
                <button
                    onClick={handleAddPost}
                    className="bg-blue-400 rounded-lg cursor-pointer px-3 py-2 mb-4 text-white font-bold ml-auto flex"
                >
                    + Add About
                </button>
                <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
                    <thead className="bg-blue-400 text-white">
                        <tr>
                            {/* <th className="py-3 px-6 text-left">Id</th> */}
                            <th className="py-3 px-6 ">Title</th>
                            <th className="py-3 px-6">Description</th>
                            {/* <th className="py-3 px-6 text-left">Contact</th> */}
                            <th className="py-3 px-6 ">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {allAbout?.about && allAbout?.about.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post, index) => (
                            <tr key={index} className="border-b">
                                {/* <td className="py-4 px-6">{post.id}</td> */}
                                <td className="py-4 px-6 text-center">{post.title}</td>
                                <td className="py-4 px-6 text-center">
                                    {post.description?.split(" ").slice(0, 10).join(" ") + (post.description?.split(" ").length > 25 ? "..." : "")}
                                </td>

                                {/* <td className="py-4 px-6">{post.contact}</td> */}
                                <td className="py-4 px-6 text-center">
                                    <button
                                        onClick={() => handleEdit(post._id)}
                                        className="font-bold px-4 py-2 rounded-lg text-xl transition cursor-pointer"
                                    >
                                        <RiEditBoxLine />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        className="font-bold px-4 py-2 rounded-lg text-xl transition cursor-pointer"
                                    >
                                        <MdDelete />
                                    </button>
                                    <button
                                        onClick={() => handleViewDetails(post._id)}
                                        className="font-bold px-4 py-2 rounded-lg text-xl transition cursor-pointer"
                                    >
                                        <FaEye />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                <div className="ml-auto ">
                    <TablePagination
                        component="div"
                        count={allAbout?.length}
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

export default AboutAllDetails;
