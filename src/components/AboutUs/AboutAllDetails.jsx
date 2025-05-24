import React, { useState, useContext, useEffect } from 'react';
import { RiEditBoxLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../MyContext/Mycontext';
import TablePagination from "@mui/material/TablePagination";

const AboutAllDetails = () => {

    const [aboutList, setAboutList] = useState([
        {
            id: 1,
            title: "Video 1",
            description: "user1@example.com",
            Action: "",
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
        navigate('/about-details', { state: { user: posts[index] } });
    };
    // useEffect(() => {
    //     getUserData();
    // }, []);
    const handleAddPost = () => {
        navigate('/about');
    }

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
                            <th className="py-3 px-6 ">Name</th>
                            <th className="py-3 px-6">Email</th>
                            {/* <th className="py-3 px-6 text-left">Contact</th> */}
                            <th className="py-3 px-6 ">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {aboutList && aboutList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post, index) => (
                            <tr key={index} className="border-b">
                                {/* <td className="py-4 px-6">{post.id}</td> */}
                                <td className="py-4 px-6 text-center">{post.title}</td>
                                <td className="py-4 px-6 text-center">{post.description}</td>
                                {/* <td className="py-4 px-6">{post.contact}</td> */}
                                <td className="py-4 px-6 text-center">
                                    <button
                                        className="font-bold px-4 py-2 rounded-lg text-xl transition"
                                    >
                                        <RiEditBoxLine />
                                    </button>
                                    <button
                                        className="font-bold px-4 py-2 rounded-lg text-xl transition"
                                    >
                                        <MdDelete />
                                    </button>
                                    <button
                                        onClick={() => handleViewDetails(index)}
                                        className="font-bold px-4 py-2 rounded-lg text-xl transition"
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
                        count={aboutList.length}
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
