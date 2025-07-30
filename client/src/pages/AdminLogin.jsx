import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/authService';

function AdminLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginAdmin(formData);
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminName', res.data.name);
      navigate('/admin');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <main
      role="main"
      aria-label="Admin login form"
      className="pt-28 pb-24 w-full bg-gradient-to-br from-gray-800 to-gray-900"
    >
      <div className="max-w-md mx-auto p-8 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl bg-white dark:bg-[#1E293B] text-gray-800 dark:text-gray-200">
        <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 dark:text-yellow-300 text-center flex items-center justify-center gap-2">
          🔐 Admin Login
        </h2>

        <form onSubmit={handleSubmit} aria-describedby="login-error" className="flex flex-col gap-6">
          <fieldset className="flex flex-col gap-6">
            <legend className="sr-only">Login Credentials</legend>

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="font-semibold">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                aria-required="true"
                className="p-3 border rounded-xl w-full dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-semibold">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                aria-required="true"
                className="p-3 border rounded-xl w-full dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400"
              />
            </div>
          </fieldset>

          {/* Submit Button */}
          <button
            type="submit"
            aria-label="Submit login form"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition w-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            🚀 Login
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <p
            id="login-error"
            role="alert"
            className="mt-6 text-center text-red-600 dark:text-red-400 font-medium"
          >
            {error}
          </p>
        )}
      </div>
    </main>
  );
}

export default AdminLogin;