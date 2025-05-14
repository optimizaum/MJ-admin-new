import React, { useState } from 'react';
import { RiEditBoxLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import TablePagination from "@mui/material/TablePagination";

const Answer = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const [posts, setPosts] = useState([
        {
            title: "Video 1",
            typeOfPost: "img",
            number: "3",
            source: "https://video-url-1.mp4",
            description: "This is the description for video 1",
        },
    ]);

    const navigate = useNavigate();

    const handleViewDetails = (index) => {
        navigate('/answer-details', { state: { post: posts[index] } });
    };

    const handleAddPost = () => {
        navigate('/add-post');
    };

    return (
        <div className="p-6">
            <div className="overflow-x-auto ml-auto">
                <h2 className='text-2xl font-bold mb-5'>Post Details</h2>
                {/* <button
                    onClick={handleAddPost}
                    className="bg-blue-400 rounded-lg px-3 py-2 mb-4 text-white font-bold ml-auto flex"
                >
                    + Add Post
                </button> */}
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
                        {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-4 px-6">{post.title}</td>
                                <td className="py-4 px-6">
                                    {post.typeOfPost}
                                </td>
                                <td className="py-4 px-6">{post.source}</td>
                                <td className="py-4 px-6">{post.number}</td>
                                <td className="py-4 px-6">{post.description}</td>
                                <td className="py-4 px-6">
                                    <button

                                        className="font-bold px-4 py-2 rounded-lg text-xl transition"
                                    >
                                        <RiEditBoxLine />
                                    </button>
                                    <button

                                        className="font-bold px-4 py-2 rounded-lg transition text-xl"
                                    >
                                        <MdDelete />
                                    </button>
                                    <button
                                        onClick={() => handleViewDetails(index)}
                                        className="font-bold px-4 py-2 rounded-lg cursor-pointer text-xl transition"
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
                        count={posts.length}
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

export default Answer;
