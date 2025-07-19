import React, { useEffect, useState } from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function ResisterEvent() {
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [event, setEvent] = useState();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });


    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/${id}`)
            .then(res => res.json())
            .then(data => setEvent(data))
            .catch(err => console.error("Failed to fetch event:", err));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true); // ✅ Start loading

        e.preventDefault();
        console.log("📤 Sending registration:", formData);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/register/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    mobile: formData.phone,
                    message: formData.message
                })
            });

            const data = await res.json();
            console.log("✅ Registration response:", data);

            if (!res.ok) {
                throw new Error(data.error || "Server error");
            }

            const message = `
  ✅ Registration Successful!

  👤 Name: ${data.registration.name}
  📧 Email: ${data.registration.email}
  📞 Phone: ${data.registration.mobile}

  📅 Event: ${data.updatedEvent.title}
  📍 Location: ${data.updatedEvent.location}
  🗓️ Date: ${data.updatedEvent.date}
`;
            // ✅ Show alert safely
            window.alert(message);

            // ✅ Reset form
            setFormData({ name: '', email: '', phone: '', message: '' });

            // ✅ Navigate to Events page
            navigate('/welcome', {
                state: {
                    name: formData.name,
                    email: formData.email,
                    event: {
                        title: event.title,
                        date: event.date,
                        location: event.location
                    }
                }
            });
        } catch (err) {
            console.error("❌ Registration failed:", err);

            // If using fetch, you won't get err.response like Axios
            alert(err.message || "Something went wrong");
        }

    };

    if (!event) return <p>Loading event...</p>;



    return (
        <div className="mt-24 px-4 pb-24">
            <h2 className="text-2xl font-bold text-center mb-2">🎟️ Let’s Book Your Spot</h2>
            <hr className="h-1 w-full bg-gray-300 mb-6" />
            <h1 className="text-3xl max-md:text-xl font-black text-center text-indigo-800">{event.title}</h1>

            <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto bg-[#D9D9D9] p-8 rounded-2xl shadow-md mt-10 space-y-8"
            >
                {/* Full Name */}
                <div>
                    <label className="text-xl font-bold block mb-2">👤 Full Name</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-amber-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="text-xl font-bold block mb-2">📧 Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-amber-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="text-xl font-bold block mb-2">📞 Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-amber-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Message */}
                <div>
                    <label className="text-xl font-bold block mb-2">🧾 Additional Notes or Special Request</label>
                    <textarea
                        name="message"
                        placeholder="Enter your message here..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-amber-300 rounded-xl p-3 text-lg resize-none"
                        rows={3}
                    />
                    <p className="text-sm text-amber-700 mt-2">
                        🔒 Your information will only be used to confirm registration. We never share your data.
                    </p>
                </div>

                {/* Sold Out Message */}
                {parseInt(event.leftSeate) === 0 && (
                    <p className="text-red-600 font-medium text-center">❌ Sorry, this event is fully booked.</p>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    aria-busy={isProcessing}
                    disabled={parseInt(event.leftSeate) === 0 || isProcessing}
                    className={`w-full py-4 rounded-xl text-lg font-semibold transition duration-300 ${parseInt(event.leftSeate) === 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : isProcessing
                                ? 'bg-blue-600 opacity-50 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                >
                    {parseInt(event.leftSeate) === 0
                        ? 'Sold Out'
                        : isProcessing
                            ? 'Submitting...'
                            : 'Register'}
                </button>

                {/* Navigation */}
                <NavLink to="/Events" className="block text-center mt-6">
                    <button
                        type="button"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl text-lg transition duration-300"
                    >
                        🔍 Find More Events
                    </button>
                </NavLink>
            </form>
        </div>
    )
}

export default ResisterEvent