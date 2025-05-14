import React, { useEffect, useContext, useState } from 'react';
import { RiEditBoxLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MyContext } from '../../MyContext/Mycontext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import TablePagination from "@mui/material/TablePagination";
const Post = () => {
    // const { id } = useParams();
    const { API_BASE_URL } = useContext(MyContext)
    const { postData, getPostData, getSingleData } = useContext(MyContext);
    const navigate = useNavigate();
    console.log("postdata------", postData);
    // ---------pagination state----------
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    // ---------------------------------------
    const handleViewDetails = (post) => {
        navigate(`/post-details/${post._id}`);
    };

    const handleAddPost = () => {
        navigate('/add-post');
    };

    useEffect(() => {
        getPostData();
    }, []);

    const handleUpdate = (post) => {
        console.log(post);
        navigate(`/update-form/${post}`);
    };
    const handleDelete = async (id) => {

        try {
            const response = await axios.delete(`${API_BASE_URL}/sources/${id}`);
            if (response.status === 200) {
                toast.success('Post Deleted Successfully');
                getPostData();
            }
        } catch (error) {
            console.error("Error", error);
            toast.error('Error');
        }

    };


    return (
        <div className="p-6">
            <ToastContainer />
            <div className=" ml-auto">
                <h2 className='text-2xl font-bold'>Post Details</h2>
                <button
                    onClick={handleAddPost}
                    className="bg-blue-400 rounded-lg cursor-pointer px-3 py-2 mb-4 text-white font-bold ml-auto flex"
                >
                    + Add Post
                </button>
                <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
                    <thead className="bg-blue-400 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Type of Post</th>
                            <th className="py-3 px-6 text-left">Source</th>
                            <th className="py-3 px-6 text-left">Views</th>
                            <th className="py-3 px-6 text-left">Description</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {postData && postData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-4 px-6">{post.title}</td>
                                <td className="py-4 px-6">{post.sourceType}</td>
                                <td className="py-4 px-6">
                                    <img
                                        src={`${API_BASE_URL}/user/source${post.source}`}
                                        alt={post.title}
                                        className="w-16 h-16 object-cover rounded-md "
                                    />
                                </td>

                                <td className="py-4 px-6">{post.views}</td>
                                <td className="py-4 px-6">{post.description}</td>
                                <td className="py-4 px-6 flex">
                                    <button
                                        onClick={() => handleUpdate(post._id)}
                                        className="font-bold px-2 py-2 rounded-lg text-xl transition cursor-pointer">
                                        <RiEditBoxLine />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        className="font-bold px-2 py-2 rounded-lg transition text-xl cursor-pointer">
                                        <MdDelete />
                                    </button>
                                    <button
                                        onClick={() => handleViewDetails(post)}
                                        className="font-bold px-2 py-2 rounded-lg cursor-pointer text-xl transition"
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
                        count={postData.length}
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

export default Post;
