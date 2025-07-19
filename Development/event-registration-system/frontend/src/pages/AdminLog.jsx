import { NavLink } from 'react-router-dom'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLog() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await res.json();
            console.log("Login response:", data);

            if (data.token) {
                localStorage.setItem('adminToken', data.token);
                navigate('Dashboard');
            } else {
                alert("Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Something went wrong");
        }
    };

    return (
        <div className="mt-15 min-h-screen flex items-center justify-center bg-gradient-to-br bg-gray-100 px-4 py-10">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in"
            >
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">🔐 Admin Login</h1>
                    <hr className="mt-4 border-gray-300" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="text-lg font-semibold text-gray-700 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="admin@example.com"
                        onChange={handleChange}
                        required
                        className="bg-gray-100 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password" className="text-lg font-semibold text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        onChange={handleChange}
                        required
                        className="bg-gray-100 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 rounded-xl text-lg font-semibold transition duration-300
    ${isLoading ? 'bg-indigo-600 opacity-50 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}
  `}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l5-5-5-5v4a8 8 0 00-8 8z" />
                            </svg>
                            Logging in...
                        </span>
                    ) : (
                        'Login Now'
                    )}
                </button>


                <NavLink to="/Events" className="block text-center mt-4">
                    <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl text-lg transition duration-300">
                        Go to Events Page
                    </button>
                </NavLink>
            </form>
        </div>
    )
}

export default AdminLog