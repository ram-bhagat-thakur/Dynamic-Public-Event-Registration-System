import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback('');

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setFeedback('✅ Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFeedback(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error('❌ Submit error:', err);
      setFeedback('❌ Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-indigo-100 to-purple-100 px-6 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-800">Contact Us</h1>
        <p className="text-lg text-gray-700 mt-2">We’d love to hear from you!</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-6"
      >
        <div>
          <label className="block text-lg font-semibold mb-2">👤 Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">📧 Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">📝 Message</label>
          <textarea
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl p-3 text-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={5}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-xl text-lg font-semibold transition duration-300 ${
            isSubmitting
              ? 'bg-indigo-600 opacity-50 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isSubmitting ? 'Sending...' : '✉️ Send Message'}
        </button>

        {feedback && <p className="text-center mt-4 text-lg text-indigo-700">{feedback}</p>}
      </form>
    </div>
  );
};

export default Contact;