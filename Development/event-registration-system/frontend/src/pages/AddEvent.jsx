import React, { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function AddEvent() {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'banner') {
      setFormData(prev => ({
        ...prev,
        banner: files[0] // ✅ Store the selected file
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      title, date, time, totalSeats, location,
      tags, description, highlights, organizer, banner
    } = formData;

    if (!title || !date || !time || !totalSeats || !location ||
      !tags || !description || !highlights || !organizer || !banner) {
      alert("Please fill in all fields and upload a banner.");
      return;
    }

    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }
    try {
      const res = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        body: payload // ✅ no JSON.stringify
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Event added successfully");
        navigate('/Admin-Login/Dashboard');
      } else {
        alert("Failed to Add event");
      }
    } catch (err) {
      console.error("❌ Error adding event:", err);
      alert("Failed to add event");
    }
  };


  return (
    <div className="mt-24 px-4 pb-24">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">📅 Add New Event</h1>
        <p className="text-gray-600 mt-2">Fill in the details below to create a new event</p>
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
            value={formData.title}
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
              value={formData.date}
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
              value={formData.time}
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
              value={formData.totalSeats}
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
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl p-3 text-lg"
          />
        </div>

        {/* Category & Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xl font-semibold mb-2">Category</label>
            <select
              name="tags"
              value={formData.tags}
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
          <div>
            <label className="block text-xl font-semibold mb-2">Upload Banner (16:9)</label>
            <input
              type="file"
              name="banner"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 text-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xl font-semibold mb-2">Description</label>
          <textarea
            name="description"
            placeholder="Write detailed information about the event..."
            value={formData.description}
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
            value={formData.highlights}
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
            value={formData.organizer}
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
            + Add New Event
          </button>
          <NavLink to="/Admin-Login/Dashboard">
            <button
              type="button"
              className="border-2 border-gray-400 hover:border-gray-600 text-gray-800 px-6 py-3 rounded-xl text-lg transition duration-300 w-full md:w-auto"
            >
              Cancel
            </button>
          </NavLink>
        </div>
      </form>
    </div>
  )
}

export default AddEvent