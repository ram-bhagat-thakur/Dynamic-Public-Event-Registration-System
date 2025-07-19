import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Nav() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#DCBEFD] shadow-md">
      <div className="flex items-center justify-between px-6 py-3 text-[#1F2937] text-lg font-semibold max-md:text-sm">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Event Registration System" className="h-10 w-auto" />
        </NavLink>

        {/* Navigation Links */}
        <ul className="flex gap-6 items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition duration-200 ${isActive ? 'text-indigo-700 underline underline-offset-4' : 'hover:text-indigo-700'
                }`
              }
            >
              Home
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
              Admin Space
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Contact"
              className={({ isActive }) =>
                `transition duration-200 ${isActive ? 'text-indigo-700 underline underline-offset-4' : 'hover:text-indigo-700'
                }`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Nav