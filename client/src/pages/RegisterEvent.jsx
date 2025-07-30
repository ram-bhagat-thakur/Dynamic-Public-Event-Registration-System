import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { registerForEvent } from '../services/eventService';

function RegisterEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // ✅ Modal state

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async () => {
    setShowModal(false); // ✅ Close modal
    setStatus('');
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      await registerForEvent({ ...formData, eventId });
      setStatus('✅ Registration successful! Please check your email.');
      navigate('/welcome', {
        state: {
          name: formData.name,
          email: formData.email,
          event: {
            id: eventId,
            title: 'TechFest 2025',
            date: '2025-08-15',
            location: 'Madhubani, Bihar',
            description: 'A celebration of tech and creativity.',
          },
        },
      });
      setFormData({ name: '', email: '', mobile: '', message: '' });
    } catch (err) {
      setStatus('❌ Registration failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      role="main"
      aria-label="Event registration form"
      className="min-h-screen w-full pt-24 px-6 py-16 bg-gradient-to-br from-[#F0F4FF] to-white dark:from-[#0F172A] dark:to-[#1E293B] text-gray-800 dark:text-gray-200"
    >
      <div className="max-w-xl mx-auto border rounded-xl shadow-lg p-8 bg-white dark:bg-[#1E293B]">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700 dark:text-yellow-300 text-center">
          📝 Register for Event
        </h2>
        <hr className="mb-10" />

        <form aria-describedby="form-status" className="space-y-5">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              aria-label="Your name"
              aria-invalid={!!errors.name}
              aria-describedby="name-error"
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && (
              <p id="name-error" className="text-red-500 text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              aria-label="Your email"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              disabled={loading}
              aria-label="Mobile number"
              aria-invalid={!!errors.mobile}
              aria-describedby="mobile-error"
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                errors.mobile ? 'border-red-500' : ''
              }`}
            />
            {errors.mobile && (
              <p id="mobile-error" className="text-red-500 text-sm mt-1">
                {errors.mobile}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <textarea
              name="message"
              placeholder="Message (optional)"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              disabled={loading}
              aria-label="Optional message"
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Submit triggers modal */}
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              const validationErrors = validateForm();
              if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
              } else {
                setShowModal(true);
              }
            }}
            className={`w-full font-semibold py-3 rounded-lg transition ${
              loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <p
            id="form-status"
            role="status"
            aria-live="polite"
            className={`mt-6 text-center font-medium ${
              status.includes('successful')
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {status}
          </p>
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md text-gray-800 dark:text-gray-200">
            <h3 className="text-xl font-bold mb-4 text-indigo-700 dark:text-yellow-300">Confirm Registration</h3>
            <p className="mb-2"><strong>Name:</strong> {formData.name}</p>
            <p className="mb-2"><strong>Email:</strong> {formData.email}</p>
            <p className="mb-2"><strong>Mobile:</strong> {formData.mobile}</p>
            {formData.message && <p className="mb-2"><strong>Message:</strong> {formData.message}</p>}

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default RegisterEvent;