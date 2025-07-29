import { FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer
      className="w-full bg-[#DCBEFD] dark:bg-gray-900 text-[#1F2937] dark:text-gray-200 pt-10 pb-6 border-t border-[#C9A9F5] dark:border-gray-700"
      role="contentinfo"
      aria-label="Footer"
    >
      <div>
        {/* Spacer */}
        <div className="h-4" aria-hidden="true"></div>

        {/* Internship Message */}
        <p className="text-center text-2xl max-md:text-lg font-semibold max-w-3xl mx-auto mb-6">
          Built as part of the SECT Internship Program, empowering student developers to build real-world apps.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-6 text-2xl" aria-label="Social media links">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Facebook page"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            <FiFacebook />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Instagram profile"
            className="hover:text-pink-500 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
          >
            <FiInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our LinkedIn profile"
            className="hover:text-blue-700 dark:hover:text-blue-400 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-700 rounded"
          >
            <FiLinkedin />
          </a>
        </div>

        {/* Contact Email */}
        <p className="text-center text-lg font-medium mb-4 dark:text-yellow-300">
          📧 <a href="mailto:sectevent@gmail.com" className="underline hover:text-indigo-700 dark:hover:text-yellow-300">sectevent@gmail.com</a>
        </p>

        {/* Footer Navigation */}
        <nav aria-label="Footer navigation">
          <ul className="flex justify-center gap-8 text-lg font-semibold mb-6 max-md:flex-wrap max-md:text-sm">
            <li>
              <NavLink
                to="/"
                className="hover:text-indigo-700 dark:hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-300 rounded"
                aria-label="Go to Home page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events"
                className="hover:text-indigo-700 dark:hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-300 rounded"
                aria-label="Go to Events page"
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="hover:text-indigo-700 dark:hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-300 rounded"
                aria-label="Go to Contact page"
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin"
                className="hover:text-indigo-700 dark:hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-300 rounded"
                aria-label="Go to Admin page"
              >
                Admin
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Copyright */}
        <div className="text-center text-lg font-semibold dark:text-gray-400">
          &copy; {new Date().getFullYear()} SECT India. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;