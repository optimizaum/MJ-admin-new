import React, { useState, useContext, useEffect } from 'react';
import { RiEditBoxLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../MyContext/Mycontext';
// import TablePagination from "@mui/material/TablePagination";

const ProfileTable = () => {
     const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { profile, getProfile } = useContext(MyContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();
    console.log('profile data', profile)
    useEffect(() => {
        getProfile();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEditProfile = (id) => {
        navigate(`/edit-profile/${id}`);
    };

    const handleAddProfile = () => {
        navigate('/add-profile');
    };

    return (
        <div className="p-6">
            <div className="overflow-x-auto">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl font-bold">Company Details</h2>
                    <button
                        onClick={handleAddProfile}
                        className="px-3 py-2 bg-blue-400 text-white rounded-lg font-bold"
                    >
                        Add Profile
                    </button>
                </div>

                <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
                    <thead className="bg-blue-400 text-white">
                        <tr>
                            {/* <th className="py-3 px-6 text-left">Id</th> */}
                            <th className="py-3 px-6 text-left">Company Name</th>
                            <th className="py-3 px-6 text-left">Logo Image</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        <tr  className="border-b">
                            {/* <td className="py-4 px-6">{page * rowsPerPage + index + 1}</td> */}
                            <td className="py-4 px-6">{profile?.setting?.name}</td>
                            <td className="py-4 px-6">
                                <img
                                    src={`${API_BASE_URL}/uploads/${profile?.setting?.logo}`}
                                    alt="Logo"
                                    className="w-16 h-16 object-contain  rounded"
                                />
                            </td>
                            <td className="py-4 px-6 flex gap-2">
                                <button
                                    onClick={() => handleEditProfile(profile._id)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <RiEditBoxLine className="text-xl" />
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                // onClick={() => handleDelete(item._id)} // Optional: implement delete
                                >
                                    <MdDelete className="text-xl" />
                                </button>
                            </td>
                        </tr>

                    </tbody>
                </table>

                {/* <div className="flex justify-end">
          <TablePagination
            component="div"
            count={profile?.length || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div> */}
            </div>
        </div>
    );
};

export default ProfileTable;
