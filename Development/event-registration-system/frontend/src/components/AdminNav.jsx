import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ correct

function AdminNav() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAdminName(decoded.name || decoded.email); // fallback to email
      } catch (err) {
        console.error('❌ Token decode error:', err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#DCBEFD] shadow-md">
      <div className="flex items-center justify-between px-6 py-3 text-[#1F2937]">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Event Registration System" className="h-10 w-auto" />
        </NavLink>

        {/* Navigation Links */}
        <ul className="flex gap-6 items-center font-semibold text-lg max-md:text-sm">
          <li className="max-md:hidden">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition duration-200 ${isActive ? 'text-indigo-700 underline underline-offset-4' : 'hover:text-indigo-700'
                }`
              }
            >
              User-Space
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Events"
              className={({ isActive }) =>
                `transition duration-200 ${isActive ? 'text-indigo-700 underline underline-offset-4' : 'hover:text-indigo-700'
                }`
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Admin-Login/Dashboard"
              className={({ isActive }) =>
                `transition duration-200 ${isActive ? 'text-indigo-700 underline underline-offset-4' : 'hover:text-indigo-700'
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="Admin-Register"
              className={({ isActive }) =>
                `transition duration-200 ${isActive ? 'text-indigo-700 underline underline-offset-4' : 'hover:text-indigo-700'
                }`
              }
            >
              Register Admin
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition duration-200"
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminNav;