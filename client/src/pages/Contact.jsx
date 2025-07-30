import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitContactForm } from '../services/contactService';
import { ToastContainer, toast } from 'react-toastify';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await submitContactForm(formData);
      toast.success('Message sent successfully!', { autoClose: 2000 });
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setTimeout(() => navigate('/events'), 2500);
    } catch (err) {
      toast.error('Failed to send message. Please try again.', { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      role="main"
      aria-label="Contact form section"
      className="pt-24 min-h-screen w-full bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 flex items-center justify-center px-4 py-12 relative overflow-hidden"
    >
      <ToastContainer />

      {/* Decorative Blurred Circle */}
      <div
        aria-hidden="true"
        className="absolute top-10 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-indigo-300 to-purple-400 dark:from-yellow-400 dark:to-yellow-600 opacity-20 rounded-full blur-3xl pointer-events-none"
      ></div>

      {/* Form Card */}
      <section className="w-full max-w-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-indigo-100 dark:border-gray-700 relative z-10">
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 dark:text-yellow-300 mb-6 tracking-tight">
          📬 Contact Us
        </h2>

        <form
          onSubmit={handleSubmit}
          aria-describedby="form-status"
          className="space-y-6"
        >
          <fieldset className="space-y-6">
            <legend className="sr-only">Contact form fields</legend>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400 transition-all"
              />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400 transition-all"
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
                aria-describedby="message-error"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400 transition-all"
              />
              {errors.message && (
                <p id="message-error" className="text-red-500 text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>
          </fieldset>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            aria-label="Submit contact form"
            aria-busy={loading}
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Fallback Status Message (if toast fails) */}
        <div
          id="form-status"
          role="status"
          aria-live="polite"
          className="sr-only"
        >
          {loading ? 'Sending message...' : ''}
        </div>
      </section>
    </main>
  );
}

export default ContactForm;