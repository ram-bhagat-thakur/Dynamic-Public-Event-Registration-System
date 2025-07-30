import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEvents } from '../services/eventService';
import axios from 'axios';
import Card from '../components/Card';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  FiEdit,
  FiMail,
  FiLock,
  FiSearch,
  FiShield,
  FiStar,
  FiGrid,
} from 'react-icons/fi';
import axiosInstance from '../utils/axiosInstance';


const MAX_WORDS = 30;

function Home() {
  const navigate = useNavigate();
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedHome');

    if (!hasVisited) {
      toast.success('👋 Welcome to the Event Platform!');
      localStorage.setItem('hasVisitedHome', 'true');
    }
  }, []);

  useEffect(() => {
    axiosInstance.get('/api/feedback/verified')
      .then(res => {
        // console.log('Feedback response:', res.data);
        setFeedbacks(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => console.error('Error fetching feedback:', err))
      .finally(() => setLoading(false));
  }, []);

  const getWordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;
  const wordCount = getWordCount(form.comment);

  const handleChange = (e) => {
    const { name, value } = e.target;
      setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/feedback', form);
      toast.success('✅Thanks for your Feedback submitted ☺️! Awaiting admin approval.');
      setForm({ name: '', rating: 5, comment: '' });
    } catch (err) {
      toast.error('❌ Failed to submit feedback.');
    }
  };



  useEffect(() => {
    getEvents()
      .then((res) => {
        const sorted = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setFeaturedEvents(sorted.slice(0, 3));
      })
      .catch((err) => console.error('Error fetching events:', err));
  }, []);

  const allTags = [...new Set(featuredEvents.flatMap(ev => ev.tags?.split(',').map(tag => tag.trim()) || []))];

  const filteredEvents = featuredEvents.filter(event => {
    const matchesSearch = `${event.title} ${event.location}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? event.tags?.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 text-[#1F2937] dark:text-gray-200">

      {/* Hero Section */}
      <div className="relative w-full h-screen max-md:h-fit overflow-hidden">
        <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-[0.6] dark:brightness-[0.4]" >
          <source src="/videos/videoplayback.mp4" type="video/mp4" />
        </video>
        <section className="relative z-10 px-6 py-24 text-center flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl max-md:text-3xl font-extrabold text-indigo-700 dark:text-yellow-300 mb-6 drop-shadow-lg">
            Welcome to the Event Registration System 🎉
          </h1>
          <p className="text-lg max-md:text-base text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover upcoming events, register with ease, and stay informed. Whether you're attending or organizing, we've got you covered.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/events')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl text-base transition shadow-md"
            >
              📅 View Events
            </button>
            <button
              onClick={() => navigate('/admin/login')}
              className="bg-gray-200 hover:bg-gray-300 text-indigo-700 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700 font-semibold px-6 py-3 rounded-xl text-base transition shadow-md"
            >
              🔐 Admin Login
            </button>
          </div>
        </section>
      </div>

      {/* Featured Events */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 dark:text-yellow-300 text-center mb-6">
          🌟 Seats Are Filling Fast — Grab Yours Now
        </h2>
        <hr className="mb-12 border-gray-300 dark:border-gray-600" />
        {filteredEvents.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center">No events match your search or selected tag.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <Card
                key={event._id}
                id={event._id}
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                description={event.description}
                bannerPath={event.bannerPath}
                leftSeate={event.leftSeats}
              />
            ))}
          </div>
        )}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/events')}
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold transition shadow-md"
          >
            See All Events
          </button>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-6 py-16 text-center bg-[#F3F4F6] dark:bg-gray-900">
        <blockquote className="italic text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
          “This platform made it so easy to manage our college events. Registrations, updates, and communication — all in one place!”
        </blockquote>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-medium">— Event Organizer, SECT</p>
      </section>

      {/* What This Platform Does */}
      <section className="bg-[#DAC9F1] dark:bg-indigo-900 py-16 px-6 text-center text-[#1F2937] dark:text-white">
        <h1 className="text-4xl font-bold mb-10">What This Platform Does</h1>
        <div className="flex flex-wrap justify-center gap-6">
          {[{ icon: <FiEdit />, title: "Easy Registration", desc: "Quick form to reserve seats" },
          { icon: <FiMail />, title: "Email Confirmation", desc: "Get instant confirmation after registering" },
          { icon: <FiLock />, title: "Admin Control", desc: "Admins can create and manage events securely" },
          ].map((feature, idx) => (
            <div key={idx} className="bg-[#F3F4F6] dark:bg-gray-800 w-full md:w-1/4 p-6 rounded-2xl shadow hover:scale-105 transition text-center">
              <div className="flex justify-center items-center text-5xl text-indigo-600 dark:text-yellow-300 mb-4">
                {feature.icon}
              </div>
              <hr className="mb-4 border-gray-300 dark:border-gray-600" />
              <h2 className="text-xl font-bold">{feature.title}</h2>
              <p className="text-lg mt-2 text-gray-700 dark:text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#F3F4F6] dark:bg-gray-900 py-16 px-6">
        <h1 className="text-4xl font-bold text-center mb-10 text-[#1F2937] dark:text-yellow-300">Frequently Asked Questions</h1>
        <div className="space-y-8 max-w-4xl mx-auto">
          {[{ q: "1. How do I register for an event?", a: "Just browse the upcoming events, click on the one you’re interested in, and fill out the registration form. You’ll receive a confirmation email right after." },
          { q: "2. Is there a limit to how many seats I can book?", a: "Yes, each event has a fixed number of seats. Once all seats are booked, registration will be closed for that event." },
          { q: "3. Will I get an email confirmation after registering?", a: "Absolutely! A confirmation email will be sent instantly to the email ID you provide during registration." },
          { q: "4. Can I cancel or change my registration?", a: "Currently, this version does not support editing or canceling registrations. Please double-check your details before submitting." },
          ].map((faq, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-bold text-[#1F2937] dark:text-yellow-300">{faq.q}</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-[#DAC9F1] dark:bg-indigo-900 py-16 px-6 text-center text-[#1F2937] dark:text-white">
        <h1 className="text-4xl font-bold mb-10">Why Choose This Platform?</h1>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { icon: <FiSearch />, title: "Real-Time Seat Tracking", desc: "Users can see live updates on available seats during registration." },
            { icon: <FiShield />, title: "Secure and Verified", desc: "Admin tools ensure your data is protected and spam-free." },
            { icon: <FiStar />, title: "Celebratory UI", desc: "Enjoy confetti, smooth feedback animations, and personalized responses." },
            { icon: <FiGrid />, title: "Event Dashboard", desc: "Admins manage registrations, inbox, and analytics with ease." },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 w-full md:w-[22%] p-6 rounded-xl shadow hover:scale-105 transition text-center">
              <div className="flex justify-center items-center text-5xl text-indigo-600 dark:text-yellow-300 mb-4">
                {feature.icon}
              </div>
              <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
              <p className="text-md text-gray-700 dark:text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white dark:bg-gray-900 py-16 px-6 text-center text-[#1F2937] dark:text-white">
        <h1 className="text-4xl font-bold mb-10">How to Book an Event</h1>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { step: "1", title: "Explore Events", desc: "View all upcoming events — tech, cultural, sports, and more." },
            { step: "2", title: "Fill Registration", desc: "Submit your name, email, and reserve your seat." },
            { step: "3", title: "Get Confirmation", desc: "Receive instant feedback and a confirmation email." },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#F3F4F6] dark:bg-gray-800 w-full md:w-[28%] p-6 rounded-xl shadow text-center hover:scale-105 transition">
              <div className="text-4xl font-bold text-blue-600 dark:text-yellow-300">{item.step}</div>
              <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
              <p className="text-md mt-2 text-gray-700 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>





      {/* Feedback Section */}
      <section className="max-md:w-md max-w-[80%] mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800 dark:text-yellow-300">
          What Others Are Saying
        </h2>

        {loading ? (
          <p className="text-gray-500 text-center">Loading feedback...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-gray-500 text-center">No feedback available yet.</p>
        ) : (
          <div
            className="flex gap-4 pt-2 sm:gap-6 overflow-x-auto pb-4 px-1 snap-x snap-mandatory scroll-smooth max-w-full"
            role="list"
            aria-label="User feedback carousel"
          >
            {feedbacks.map(({ _id, name, rating, comment }) => (
              <div
                key={_id}
                className="flex-shrink-0 snap-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4 sm:p-6 transition hover:scale-[1.02] hover:shadow-lg"
                role="listitem"
                tabIndex={0}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-yellow-300 flex items-center justify-center text-indigo-700 dark:text-gray-900 font-bold">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-lg font-semibold text-indigo-700 dark:text-yellow-300">
                    {name}
                  </div>
                </div>
                <div className="text-yellow-500 text-sm mb-1">
                  ⭐ {rating}/5 {rating >= 4 ? '😊' : rating >= 2 ? '😐' : '😞'}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-4 max-w-[300px] overflow-hidden break-words">
                  {comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>


      <section
        className="bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8 text-center"
        aria-labelledby="feedback-heading"
      >
        <h2
          id="feedback-heading"
          className="text-4xl font-extrabold mb-10 text-[#1F2937] dark:text-yellow-300 tracking-tight"
        >
          Share Your Experience 💬
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg w-full mx-auto space-y-10 text-left bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl transition"
          aria-label="Feedback form"
        >
          {/* Name Input */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              aria-required="true"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400 transition shadow-sm"
            />
          </div>

          {/* Emoji Rating */}
          <div className="space-y-3">
            <label htmlFor="rating" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              How did you feel? <span className="text-red-500">*</span>
            </label>
            <fieldset
              id="rating"
              role="radiogroup"
              aria-label="Emoji rating"
              className="flex flex-wrap justify-center gap-2 text-xl"
            >
              {[
                { value: 1, emoji: '😠', label: 'Very Bad' },
                { value: 2, emoji: '😕', label: 'Bad' },
                { value: 3, emoji: '😐', label: 'Okay' },
                { value: 4, emoji: '😊', label: 'Good' },
                { value: 5, emoji: '😍', label: 'Excellent' },
              ].map(({ value, emoji, label }) => (
                <motion.button
                  key={value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, rating: value }))}
                  whileHover={{ scale: 0.95 }}
                  whileTap={{ scale: 0.5 }}
                  className={`focus:outline-none rounded-full ${form.rating === value
                    ? 'ring-1 ring-indigo-500 dark:ring-yellow-400 bg-indigo-100 dark:bg-yellow-100'
                    : ''
                    }`}
                  aria-label={`${label} (${value} star)`}
                  aria-pressed={form.rating === value}
                >
                  <span role="img" aria-hidden="true">
                    {emoji}
                  </span>
                </motion.button>
              ))}
            </fieldset>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-center">
              Selected: {form.rating ? `${form.rating} Star${form.rating > 1 ? 's' : ''}` : 'None'}
            </p>
          </div>

          {/* Comment Input */}
          <div className="space-y-2">
            <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Feedback <span className="text-red-500">*</span>
            </label>

            <textarea
              id="comment"
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Your feedback"
              required
              rows="4"
              aria-required="true"
              aria-describedby="comment-help"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400 transition shadow-sm"
            />

            {/* Emoji Buttons */}
            <div className="flex flex-wrap gap-1" role="group" aria-label="Insert emoji into comment">
              {['😊', '😐', '😞', '🔥', '💯', '👍', '👎'].map((emoji) => (
                <motion.button
                  key={emoji}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      comment: prev.comment + ' ' + emoji,
                    }))
                  }
                  whileHover={{ scale: 1.2 }}
                  className="text-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-yellow-400"
                  aria-label={`Insert ${emoji} into comment`}
                  title={`Insert ${emoji}`}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>

            {/* Word Count */}
            <output
              id="comment-help"
              aria-live="polite"
              className={`text-xs mt-1 ${wordCount > MAX_WORDS ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                }`}
            >
              {wordCount}/{MAX_WORDS} words
            </output>
            {wordCount > MAX_WORDS && (
              <p className="text-red-500 text-xs">Comment exceeds the 30-word limit.</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            data-testid="submit-button"
            type="submit"
            disabled={wordCount > MAX_WORDS}
            className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-yellow-400 dark:to-yellow-500 text-white dark:text-gray-900 font-bold py-3 px-6 rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-yellow-400 shadow-md ${wordCount > MAX_WORDS ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            🚀 Submit Feedback
          </button>
        </form>
      </section>


      {/* 

      <div className="px-4 py-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">User Feedback</h2>
        {loading ? (
          <p>Loading feedback...</p>
        ) : feedbackList.length === 0 ? (
          <p>No feedback yet.</p>
        ) : (
          <ul className="space-y-4">
            {feedbackList.map(feedback => (
              <li key={feedback.id} className="border p-4 rounded shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{feedback.name}</span>
                  <span className="text-yellow-500">⭐ {feedback.rating}</span>
                </div>
                <p className="mt-2 text-gray-700">{feedback.comment}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(feedback.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>


      <section className="bg-[#F3F4F6] dark:bg-gray-900 py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-6 text-[#1F2937] dark:text-yellow-300">
          We’d Love Your Feedback 💬
        </h1>
        <p className="text-lg mb-10 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Help us improve by sharing your thoughts. Whether it’s a bug, a suggestion, or a compliment—we’re all ears!
        </p>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          <FeedbackForm />
        </div>
      </section> */}






      {/* Call to Action Section */}
      <section className="bg-[#DAC9F1] dark:bg-indigo-900 py-16 px-6 text-center text-[#1F2937] dark:text-white">
        <h1 className="text-3xl font-bold mb-6">Ready to Attend Your Next Event?</h1>
        <p className="text-lg mb-8">
          Don’t wait — seats are limited and events are happening now. Be part of the experience.
        </p>
        <button
          onClick={() => navigate('/events')}
          className="bg-[#2563EB] hover:bg-blue-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900 px-8 py-4 rounded-xl text-xl font-semibold transition"
        >
          Browse & Register Now
        </button>
      </section>
    </div>
  );
}

export default Home;