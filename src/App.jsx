import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Post from './components/Post/Post';
import PostDetails from './components/Post/PostDetails';
import User from './components/User/User';
import UserDetails from './components/User/UserDetails';
import Setting from './components/Settings/Setting';
import AddPost from './components/Post/AddPost';
import AddForm from './components/Post/AddForm';
import Dashboard from './components/Dashboard';
import Answer from './components/Answer/Answer';
import AnswerDetails from './components/Answer/AnswerDetails';
import Login from './components/Login';
import EditForm from './components/Post/EditForm';
import UpdateCustomForm from './components/Post/UpdateCustomForm';
import EditProfile from './components/Settings/EditProfile';
import ProfileTable from './components/Settings/ProfileTable';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [localStorage.getItem("token")]);
  return (
    <Router>
      {/* {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : ( */}
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/post" element={<Post />} />
              <Route path="/users" element={<User />} />
              <Route path="/post-details/:id" element={<PostDetails />} />
              <Route path="/user-details" element={<UserDetails />} />
              <Route path='profile-list' element={<ProfileTable />} />
              <Route path="/add-profile" element={<Setting />} />
              <Route path='/edit-profile' element={<EditProfile />} />
              <Route path="/add-post" element={<AddPost />} />
              <Route path="/add-form/:id" element={<AddForm />} />
              <Route path="/answer" element={<Answer />} />
              <Route path="/answer-details" element={<AnswerDetails />} />
              <Route path="/update-form/:id" element={<EditForm />} />
              <Route path="/update_custom-form/:id" element={<UpdateCustomForm />} />
            </Routes>
          </div>
        </div>
      {/* )} */}
    </Router>
  );
}

export default App;
