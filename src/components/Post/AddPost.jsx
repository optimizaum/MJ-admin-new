import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../MyContext/Mycontext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';


const AddPost = () => {
  const { API_BASE_URL } = useContext(MyContext)
  const [errors, setErrors] = useState({});

  const now = new Date();
  const currentDate = now.toISOString().split("T")[0]; // yyyy-mm-dd
  const currentTime = getCurrentTime24Hour();

  function getCurrentTime24Hour() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const hoursStr = hours < 10 ? '0' + hours : hours;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hoursStr}:${minutesStr}`;  // e.g. "14:45"
  }


  const [newPost, setNewPost] = useState({
    title: '',
    tags: '',
    file: null,
    description: '',
    postType: 'image',
    visibleFrom: currentDate,
    time: currentTime
  });

  const navigate = useNavigate();

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewPost((prevState) => ({
      ...prevState,
      file: e.target.files[0],
    }));
  };

  const handlePostTypeChange = (e) => {
    setNewPost((prevState) => ({
      ...prevState,
      postType: e.target.value,
      file: null,
    }));
  };

  const handleFormNext = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (newPost.visibleFrom && !newPost.time) {
      newErrors.time = "Time is required .";
      alert("Please select  time ");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      console.log("post details ", newPost);

      const formData = new FormData();
      formData.append('title', newPost.title)
      formData.append('file', newPost.file)
      formData.append('description', newPost.description)
      formData.append('sourceType', newPost.postType)
      formData.append('time', newPost.time);
      formData.append('visibleFrom', newPost.visibleFrom)

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/admin/sources`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      const sourceId = response?.data?.data?._id
      console.log(sourceId)
      if (response.status == 201) {
        navigate(`/add-form/${sourceId}`, { state: { newPost } });
      } else {

      }
    } catch (err) {
      console.log("error is:", err)
      alert("form is not submited")
    }

  };

  const handleCancel = () => {
    setNewPost({
      title: '',
      file: null,
      tags: '',
      description: '',
      postType: 'image',
    });
  };

  const [scheduleTime, setScheduleTime] = useState(dayjs());

  const handleTimeChange = (newValue) => {
    setScheduleTime(newValue);
  };




  return (
    <div>
      <div className="p-4 bg-white rounded-lg shadow-lg w-1/2 mx-auto mb-4">
        <h3 className="text-2xl font-bold mb-4">Add New Post</h3>
        <form onSubmit={handleFormNext}>
          <div className="mb-4">
            <label className="block text-lg font-semibold">Select Post Type</label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="postType"
                  value="image"
                  checked={newPost.postType === 'image'}
                  onChange={handlePostTypeChange}
                  className="mr-2 cursor-pointer"
                />
                Image
              </label>
              <label>
                <input
                  type="radio"
                  name="postType"
                  value="video"
                  checked={newPost.postType === 'video'}
                  onChange={handlePostTypeChange}
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
              value={newPost.title}
              onChange={handlePostChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="file" className="block text-lg font-semibold">
              {newPost.postType === 'image' ? 'Upload Image' : 'Upload Video'}
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept={newPost.postType === 'image' ? 'image/*' : '.mp4,.webm,.mov,.avi,.mkv,.flv,.3gp'}
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
              required
            />
          </div>
          <div className='flex flex-wrap gap-3'>
            <div className="flex-1 mb-4">
              <label htmlFor="schedule-time" className="block text-lg font-semibold mb-2">
                Schedule Date
              </label>
              {/* <input
                type="date"
                id="visibleFrom"
                name='visibleFrom'
                onChange={handlePostChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer" /> */}

              <input
                type="date"
                id="visibleFrom"
                name="visibleFrom"
                value={newPost.visibleFrom}   // set default date here
                onChange={handlePostChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
              />
            </div>

            <div className="flex-1 mb-4">
              <label htmlFor="schedule-time" className="block text-lg font-semibold mb-2">
                Schedule Time
              </label>
              {/* <input
                type="time"
                id="time"
                name='time'
                disabled={!newPost.visibleFrom}
                value={newPost.time}
                onChange={handlePostChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer" /> */}


              <input
                type="time"
                id="time"
                name="time" 
                value={newPost.time}
                onChange={handlePostChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
              />

            </div>


          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block text-lg font-semibold">Tag</label>
            <input
              id="tags"
              name="tags"
              value={newPost.tags}
              onChange={handlePostChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-lg font-semibold">Description</label>
            <textarea
              id="description"
              name="description"
              value={newPost.description}
              onChange={handlePostChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"

              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            >
              Next
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
