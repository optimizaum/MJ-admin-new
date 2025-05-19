import React from 'react';
import { NavLink } from 'react-router-dom';
// import { FaHome, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Post', path: '/post' },
    { name: 'Users', path: '/users' },
    { name: 'Answer', path: '/answer' },
    { name: 'Settings', path: '/profile-list' },
  ];

  return (
    <div className="h-screen w-64 bg-blue-400 text-white flex flex-col shadow-lg">
      {/* Logo */}
      <div className="text-3xl font-bold p-6 border-b border-white/20 tracking-wide">
        MJVideos
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6">
        <ul className="space-y-5">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-300
                  ${isActive ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'}`
                }
              >
                {/* You can add icons here if you want */}
                <span className="text-lg font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-white/20">
        <NavLink
          to="/logout"
          className={({ isActive }) =>
            `flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-300
            ${isActive ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'}`
          }
        >
          {/* <FaSignOutAlt size={22} /> */}
          <span className="text-lg font-medium">Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
