import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import CommonLayout from './components/CommonLayout';
import Dashboard from './components/Dashboard';
import Post from './components/Post/Post';
import PostDetails from './components/Post/PostDetails';
import User from './components/User/User';
import UserDetails from './components/User/UserDetails';
import Setting from './components/Settings/Setting';
import AddPost from './components/Post/AddPost';
import AddForm from './components/Post/AddForm';
import Answer from './components/Answer/Answer';
import AnswerDetails from './components/Answer/AnswerDetails';
import EditForm from './components/Post/EditForm';
import UpdateCustomForm from './components/Post/UpdateCustomForm';
import EditProfile from './components/Settings/EditProfile';
import ProfileTable from './components/Settings/ProfileTable';
import Login from './components/Login';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { 
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<CommonLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="post" element={<Post />} />
        <Route path="post-details/:id" element={<PostDetails />} />
        <Route path="users" element={<User />} />
        <Route path="user-details" element={<UserDetails />} />
        <Route path="profile-list" element={<ProfileTable />} />
        <Route path="add-profile" element={<Setting />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="add-post" element={<AddPost />} />
        <Route path="add-form/:id" element={<AddForm />} />
        <Route path="answer" element={<Answer />} />
        <Route path="answer-details" element={<AnswerDetails />} />
        <Route path="update-form/:id" element={<EditForm />} />
        <Route path="update_custom-form/:id" element={<UpdateCustomForm />} />
      </Route>
    </Routes>
  );
}

export default App;
