import React, { useEffect, useState } from 'react';
import { RiEditBoxLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import TablePagination from "@mui/material/TablePagination";
import { useContext } from 'react';
import { MyContext } from '../../MyContext/Mycontext';

const Answer = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { answerData, fetchAnswer , setnswerId } = useContext(MyContext);

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
            label: "3",
            source: "https://video-url-1.mp4",
            value: "This is the description for video 1",
        },
    ]);

    const navigate = useNavigate();
    const handleViewDetails = (_id) => {
        setnswerId(_id);

        navigate('/answer-details', { state: { post: posts[_id] } });
        console.log("view",_id);
    };

    const handleAddPost = () => {
        navigate('/add-post');
    };

    useEffect(() => {
        fetchAnswer();
    }, [])

    return (
        <div className="p-6">
            <div className="overflow-x-auto ml-auto">
                <h2 className='text-2xl font-bold mb-5'>Answer   Details</h2>
                {/* <button
                    onClick={handleAddPost}
                    className="bg-blue-400 rounded-lg px-3 py-2 mb-4 text-white font-bold ml-auto flex"
                >
                    + Add Post
                </button> */}
                <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
                    <thead className="bg-blue-400 text-white">
                        <tr>
                            <th className="py-3 px-3 text-left">Title</th>
                            <th className="py-3 px-3 text-left">Type of Post</th>
                            <th className="py-3 px-3 text-left">Source</th>
                            <th className="py-3 px-3 text-left">Question</th>
                            <th className="py-3 px-3 text-left">Answer</th>
                            <th className="py-3 px-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">

                        {answerData &&
                            answerData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((post, index) => (

                                    <tr key={index} className="border-b">
                                        {console.log("check=>", post)}

                                        <td className="py-4 px-3">{post?.source?.title}</td>
                                        <td className="py-4 px-3">
                                            {post?.source?.sourceType}
                                        </td>
                                        <td className="py-4 px-3">
                                            {post?.source?.source?.length > 5
                                                ? `${post.source.source.slice(0, 10)}...`
                                                : post?.source?.source}
                                        </td>


                                        <td className="py-4 px-3">
                                            {post?.responses[0]?.label?.length > 5
                                                ? `${post.responses[0].label.slice(0, 15)}...`
                                                : post?.responses[0]?.label}
                                        </td>

                                        <td className="py-4 px-3">
                                            {post?.responses[0]?.value?.length > 5
                                                ? `${post.responses[0].value.slice(0, 15)}...`
                                                : post?.responses[0]?.value}
                                        </td>


                                        <td className="py-4 px-2">
                                            <button

                                                className="font-bold px-1 py-2 rounded-lg text-xl transition"
                                            >
                                                <RiEditBoxLine />
                                            </button>
                                            <button

                                                className="font-bold px-1 py-2 rounded-lg transition text-xl"
                                            >
                                                <MdDelete />
                                            </button>
                                           {/* { console.log("==>",post.responses[0] )} */}
                                            <button
                                                onClick={() => handleViewDetails(post.responses[0]?._id)}
                                                className="font-bold px-1 py-2 rounded-lg cursor-pointer text-xl transition"
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
