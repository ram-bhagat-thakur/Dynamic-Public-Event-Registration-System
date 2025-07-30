import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAdmin } from '../services/authService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminRegister() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/[A-Z]/.test(formData.password) || !/\d/.test(formData.password)) {
      newErrors.password = 'Password must include at least one uppercase letter and one number';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('⚠️ Please fix the errors in the form');
      return;
    }

     const registeringToast = toast.loading('🔄 Registering admin...');
    try {
      await registerAdmin(formData);
      setStatus('Admin registered successfully!');
      setFormData({ name: '', username: '', email: '', password: '' });
      setErrors({});
      toast.success('🎉 Admin registered successfully!', { id: registeringToast });
      navigate('/admin/login');
    } catch (err) {
      setStatus('Registration failed. Username or email may already exist.');
      toast.error('❌ Registration failed. Email or username may exist.', { id: registeringToast });
    }
  };

  return (
    <main
      role="main"
      aria-label="Admin registration form"
      className="pt-20 pb-24 w-full bg-gradient-to-br from-gray-800 to-gray-900"
    >
      <div className="max-w-md mx-auto p-8 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl bg-white dark:bg-[#1E293B] text-gray-800 dark:text-gray-200">
        <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 dark:text-yellow-300 text-center flex items-center justify-center gap-2">
          📝 Register Admin
        </h2>
        <hr className="mb-6 border-gray-300 dark:border-gray-600" />

        <form onSubmit={handleSubmit} aria-describedby="form-status" className="flex flex-col gap-6">
          <fieldset className="flex flex-col gap-6">
            <legend className="sr-only">Admin Registration Fields</legend>

            {[
              { label: "Full Name", name: "name", type: "text", placeholder: "Enter your full name" },
              { label: "Username", name: "username", type: "text", placeholder: "Choose a username" },
              { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
              { label: "Password", name: "password", type: "password", placeholder: "Create a strong password" },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name} className="flex flex-col gap-2">
                <label htmlFor={name} className="font-semibold">{label}</label>
                <input
                  type={type}
                  name={name}
                  id={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className="p-3 border rounded-xl w-full dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400"
                />
                {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
              </div>
            ))}
          </fieldset>

          <button
            type="submit"
            aria-label="Submit registration form"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition w-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            🚀 Register
          </button>
        </form>

        {status && (
          <p
            id="form-status"
            role="status"
            className={`mt-6 text-center font-medium ${
              status.includes('successfully') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </main>
  );
}

export default AdminRegister;