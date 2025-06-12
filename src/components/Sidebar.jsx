import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import { FaHome, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { IoMdLogOut } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { SiAnswer } from "react-icons/si";
import { FaUsers } from "react-icons/fa";
import { FaPhotoVideo } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { RiInformation2Fill } from "react-icons/ri";
import { MyContext } from '../MyContext/Mycontext';

const Sidebar = () => {
  const { getProfile, profile } = useContext(MyContext);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log("profile sidebar", profile);
  const navigate = useNavigate();
  const navItems = [
    { icon: <MdDashboardCustomize />, name: 'Dashboard', path: '/' },
    { icon: <FaPhotoVideo />, name: 'Post', path: '/post' },
    { icon: <FaUsers />, name: 'Users', path: '/users' },
    { icon: <RiInformation2Fill />, name: 'About', path: '/about-details' },
    { icon: <SiAnswer />, name: 'Answer', path: '/answer' },
    { icon: <IoSettings />, name: 'Settings', path: '/profile-list' },
    { icon: <IoSettings />, name: 'Change password', path: '/change-password' },
  ];

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  useEffect(() => {
    getProfile()
  }, [])
  return (
    <div className="h-screen w-64 bg-blue-400 text-white flex flex-col shadow-lg">
      {/* Logo + Company Name */}
      <div className="flex items-center gap-3 p-4 border-b border-white/20">
        <img
          src={`${API_BASE_URL}/uploads/${profile?.setting?.logo}`}
          alt="Logo"
          className="w-10 h-10 object-contain rounded-full"
        />
        <div className="text-xl md:text-2xl font-bold truncate">
          {profile?.setting?.name || "Company Name"}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-3">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-md text-white transition-all duration-200 
              ${isActive ? 'bg-white/30 font-semibold' : 'hover:bg-white/20'}`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-base font-bold">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/20">
        <button
          onClick={handleLogOut}
          className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-white/20 transition-all duration-200"
        >
          <IoMdLogOut className="text-xl" />
          <span className="text-base font-bold cursor-pointer">Logout</span>
        </button>
      </div>
    </div>

  );
};

export default Sidebar;
