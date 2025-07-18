import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

function EditEvent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    const [eventData, setEventData] = useState({
        id: '',
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        organizer: '',
        highlights: '',
        leftSeate: '',
        totalSeats: '',
        tags: '',
        banner: ''
    });

    useEffect(() => {
        fetch(`http://localhost:5000/api/events/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setEventData(data))
            .catch(err => console.error("Failed to fetch event:", err));
    }, [id, token]);



    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setEventData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) : value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title: eventData.title,
            date: eventData.date,
            time: eventData.time,
            location: eventData.location,
            description: eventData.description,
            organizer: eventData.organizer,
            highlights: eventData.highlights,
            leftSeate: eventData.leftSeate,
            totalSeats: parseInt(eventData.totalSeats),
            tags: eventData.tags
        };
        try {
            const res = await fetch(`http://localhost:5000/api/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (res.ok) {
                alert("Event updated successfully");
                navigate('/Admin-Login/Dashboard');
            } else {
                alert(data.error || "Failed to update event");
            }
        } catch (err) {
            console.error("Update error:", err);
            alert("Something went wrong");
        }
    };

    return (
        <div className="mt-24 px-4">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">✏️ Edit Event</h1>
                <p className="text-gray-600 mt-2 text-sm">Update your event details below</p>
                <hr className="mt-4 border-gray-300" />
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-8"
            >
                {/* Title */}
                <div>
                    <label className="block text-xl font-semibold mb-2">Event Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter event title..."
                        value={eventData.title}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Date, Time, Seats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-xl font-semibold mb-2">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={eventData.date}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl p-3 text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-xl font-semibold mb-2">Time</label>
                        <input
                            type="time"
                            name="time"
                            value={eventData.time}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl p-3 text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-xl font-semibold mb-2">Total Seats</label>
                        <input
                            type="number"
                            name="totalSeats"
                            value={eventData.totalSeats}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl p-3 text-lg"
                        />
                    </div>
                </div>

                {/* Location */}
                <div>
                    <label className="block text-xl font-semibold mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Enter event location..."
                        value={eventData.location}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-xl p-3 text-lg"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-xl font-semibold mb-2">Category</label>
                    <select
                        name="tags"
                        value={eventData.tags}
                        onChange={handleChange}
                        required
                        className="w-full bg-amber-100 border border-gray-300 rounded-xl p-3 text-lg cursor-pointer"
                    >
                        <option value="">Select Category</option>
                        <option value="Tech">Tech Event</option>
                        <option value="Cultural">Cultural Event</option>
                        <option value="Sports">Sports Event</option>
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-xl font-semibold mb-2">Description</label>
                    <textarea
                        name="description"
                        placeholder="Write detailed information about the event..."
                        value={eventData.description}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-xl p-3 text-lg resize-none"
                        rows={4}
                    />
                </div>

                {/* Highlights */}
                <div>
                    <label className="block text-xl font-semibold mb-2">Highlights</label>
                    <textarea
                        name="highlights"
                        placeholder="Include highlights to attract participants..."
                        value={eventData.highlights}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-xl p-3 text-lg resize-none"
                        rows={3}
                    />
                </div>

                {/* Organizer */}
                <div>
                    <label className="block text-xl font-semibold mb-2">Organized By</label>
                    <input
                        type="text"
                        name="organizer"
                        placeholder="Enter organizer details..."
                        value={eventData.organizer}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-xl p-3 text-lg"
                    />
                </div>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-6 justify-center mt-6">
                    <button
                        type="submit"
                        className="bg-[#FEBA34] hover:bg-yellow-400 text-white font-semibold px-6 py-3 rounded-xl text-lg transition duration-300 w-full md:w-auto"
                    >
                        ✅ Update Event
                    </button>
                    <NavLink to="/Admin-Login/Dashboard">
                        <button
                            type="button"
                            className="border-2 border-gray-400 hover:border-gray-600 text-gray-800 px-6 py-3 rounded-xl text-lg transition duration-300 w-full md:w-auto"
                        >
                            ❌ Cancel
                        </button>
                    </NavLink>
                </div>
            </form>
        </div>
    );
}

export default EditEvent;