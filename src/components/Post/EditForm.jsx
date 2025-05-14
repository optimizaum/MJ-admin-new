import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MyContext } from '../../MyContext/Mycontext';
const EditForm = () => {
    const { id } = useParams();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { getSingleData, putPostData, updatePostData } = useContext(MyContext);
    const [newPost, setNewPost] = useState();
    
   useEffect(()=>{
async  function  fetchAllSource(){
        try {
            const response = await axios.get(`${API_BASE_URL}/user/source/${id}`);
            console.log("singleResponse-------------", response);
            const sourceData = response?.data?.sourceData;
     
setNewPost(sourceData);
          
        } catch (error) {
            console.error('Error', error);
        }
    }
    fetchAllSource();
   },[])

    
    console.log(newPost)
    const navigate = useNavigate();

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;

        setNewPost((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdateFileChange = (e) => {
        setNewPost((prevState) => ({
            ...prevState,
            file: e.target.files[0],
        }));
    };

    const handleUpdateTypeChange = (e) => {
        setNewPost((prevState) => ({
            ...prevState,
            postType: e.target.value,
            file: null,
        }));
    };

    const handleUpdateNext = async (e) => {
        e.preventDefault();
        await putPostData(id, newPost);
        navigate(`/update_custom-form/${id}`);
    };

  

    // const handleUpdateCancel = () => {
    //     setNewPost({
    //         title: '',
    //         file: null,
    //         description: '',
    //         postType: 'image',
    //     });
    // };

 

    return (
        <div>
            <div className="p-4 bg-white rounded-lg shadow-lg w-1/2 mx-auto mb-4">
                <h3 className="text-2xl font-bold mb-4">Update New Post</h3>
                <form onSubmit={handleUpdateNext}>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold">Select Post Type</label>
                        <div className="flex space-x-4">
                            <label>
                                <input
                                    type="radio"
                                    name="postType"
                                    value="image"
                                    checked={newPost?.sourceType === 'image'}
                                    onChange={handleUpdateTypeChange}
                                    className="mr-2 cursor-pointer"
                                />
                                Image
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="postType"
                                    value="video"
                                    checked={newPost?.sourceType === 'video'}
                                    onChange={handleUpdateTypeChange}
                                    className="mr-2 cursor-pointer"
                                />
                                Video
                            </label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="title" className="block text-lg font-semibold">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newPost?.title}
                            onChange={handleUpdateChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer"

                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="file" className="block text-lg font-semibold">
                            {newPost?.sourceType === 'image' ? 'Upload Image' : 'Upload Video'}
                        </label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            // value={newPost?.source}
                            accept={newPost?.sourceType === 'image' ? 'image/*' : 'video/*'}
                            onChange={handleUpdateFileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer"

                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tags" className="block text-lg font-semibold">Tag</label>
                        <input
                            id="tags"
                            name="tags"
                            value={newPost?.tags}
                            onChange={handleUpdateChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer"

                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-lg font-semibold">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={newPost?.description}
                            onChange={handleUpdateChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer"

                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="submit"
                            className="bg-blue-400 text-white px-6 py-2 rounded-lg hover:bg-blue-500 cursor-pointer"
                        >
                            Next
                        </button>
                        <button
                            type="button"
                            // onClick={handleUpdateCancel}
                            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditForm;