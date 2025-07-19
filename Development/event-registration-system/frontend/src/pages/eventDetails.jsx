import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';


function EventDetails() {

  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/${id}`)
      .then(async res => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Failed to fetch event');
        }
        return res.json();
      })
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading event...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!event) return <p>No event data found.</p>;


  return (
    <div className="flex flex-col md:flex-row gap-10 mt-24 px-6 pb-24">
      {/* Left Section: Banner + Description */}
      <div className="md:w-1/2 w-full overflow-y-auto">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/${event.bannerPath}`}
          alt="Event Banner"
          className="w-full rounded-2xl shadow-md"
        />

        <div className="mt-6 space-y-4">
          <p className="text-lg md:text-xl font-medium text-gray-700">{event.description}</p>

          <h2 className="text-2xl font-bold text-gray-800">🎯 Highlights include:</h2>
          <p className="text-lg font-medium text-gray-700 ml-2">{event.highlights}</p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6">
            <span className="text-2xl font-bold">Seats Availability:</span> {event.leftSeate}
          </h2>
          <p className="text-lg text-yellow-700">⚠️ Limited seats left! Register early to reserve yours.</p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6">
            <span className="text-2xl font-bold">Organized By:</span> {event.organizer}
          </h2>
        </div>
      </div>

      {/* Right Section: Event Info + Actions */}
      <div className="md:w-1/2 w-full md:sticky top-32 h-fit text-left space-y-4">
        <h1 className="text-4xl font-black text-gray-900">{event.title}</h1>
        <h2 className="text-xl font-bold text-gray-800">📅 Date: {event.date}</h2>
        <h2 className="text-xl font-bold text-gray-800">⏰ Time: {event.time}</h2>
        <h2 className="text-xl font-bold text-gray-800">📍 Location: {event.location}</h2>

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <NavLink to={`/Resister-Event/${id}`}>
            <button className="bg-[#FEBA34] hover:bg-yellow-400 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 w-full md:w-auto">
              🎫 Book Now
            </button>
          </NavLink>
          <NavLink to="/Events">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-xl transition duration-300 w-full md:w-auto">
              🔍 Find More Events
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default EventDetails