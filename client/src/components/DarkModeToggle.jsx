import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toast.success(`Switched to ${isDark ? 'Dark' : 'Light'} Mode`, {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: true,
      theme: isDark ? 'dark' : 'light',
    });
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                 bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400
                 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
      aria-label={`Toggle ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}

export default DarkModeToggle;