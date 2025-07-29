import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiCalendar, FiMail, FiShield, FiMenu, FiX } from 'react-icons/fi';
import DarkModeToggle from './DarkModeToggle';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    { name: 'Events', path: '/events', icon: <FiCalendar /> },
    { name: 'Contact', path: '/contact', icon: <FiMail /> },
    { name: 'Admin', path: '/admin', icon: <FiShield /> },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300
     ${isActive
       ? 'bg-yellow-300 text-gray-800 font-semibold'
       : 'text-black dark:text-yellow-300 hover:text-yellow-200 dark:hover:text-black-400 hover:bg-indigo-200'}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-indigo-900 shadow-md">
      <nav
        className="w-full"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 px-8">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-white dark:text-yellow-300 text-2xl font-bold tracking-tight"
            aria-label="SECT Event Home"
          >
            SECT Event
          </NavLink>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-4" role="menubar">
            {navLinks.map((link) => (
              <li key={link.name} role="none">
                <NavLink
                  to={link.path}
                  className={linkClass}
                  role="menuitem"
                  aria-label={`Go to ${link.name}`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
            {/* <DarkModeToggle /> */}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white dark:text-yellow-300 text-2xl focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen bg-indigo-600 dark:bg-indigo-800 px-4 py-4' : 'max-h-0'
        }`}
        role="menu"
        aria-label="Mobile navigation"
      >
        <ul className="space-y-3">
          {navLinks.map((link) => (
            <li key={link.name} role="none">
              <NavLink
                to={link.path}
                className={linkClass}
                role="menuitem"
                aria-label={`Go to ${link.name}`}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
          {/* <div className="pt-2">
            <DarkModeToggle />
          </div> */}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;