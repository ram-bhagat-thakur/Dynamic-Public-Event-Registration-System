import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const decoded = token ? jwtDecode(token) : {};
  const adminName = decoded.name || decoded.email;


  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate('/Admin-Login');
    }
  }, [token, navigate]);

  // ✅ Fetch events
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setEvents(Array.isArray(data) ? data : []))
      .catch(err => console.error("Failed to fetch events:", err));
  }, [token]);

  // ✅ Fetch registrations
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/registrations`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setRegistrations(Array.isArray(data) ? data : []))
      .catch(err => console.error("Failed to fetch registrations:", err));
  }, [token]);

  // ✅ Filter upcoming events
  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = events.filter(event => {
    if (!event.date) {
      console.warn("⚠️ Missing date in event:", event.title);
      return false;
    }

    const parsedDate = new Date(event.date);
    if (isNaN(parsedDate.getTime())) {
      console.warn("⚠️ Invalid date format:", event.date, "in event:", event.title);
      return false;
    }

    const eventDate = parsedDate.toISOString().split('T')[0];
    return true; // ✅ include all events for testing
  });
  // console.log("🧾 All events:", events);
  // events.forEach(event => {
  //   console.log(`📅 ${event.title} → ${event.date}`);
  // });
  // ✅ Filter current registrations
  const upcomingEventIds = upcomingEvents.map(event => event._id);
  const currentRegistrations = registrations.filter(reg =>
    upcomingEventIds.includes(reg.eventId)
  );

  // ✅ Total seats for first upcoming event
  const totalSeats = upcomingEvents.reduce((sum, event) => {
    const seats = parseInt(event.totalSeats);
    return sum + (isNaN(seats) ? 0 : seats);
  }, 0);

  // ✅ Delete event
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this event?");
    if (!confirm) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      if (res.ok) {
        alert("Event deleted successfully");
        setEvents(prev => prev.filter(e => e._id !== id));
      } else {
        alert(data.error || "Failed to delete event");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Something went wrong");
    }
  };


  // ✅ Edit event
  const handleEdit = (id) => {
    navigate(`/Admin-Login/Dashboard/Edit-Event/${id}`);
  };

  return (

    <div className="min-h-screen bg-gray-100 pt-20 pb-24 px-4 md:px-6">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Admin Dashboard</h1>
          <p className="text-lg text-gray-600 mt-2">
            Welcome back, <span className="font-semibold text-indigo-600">{adminName}</span>!
          </p>
        </div>
        <NavLink to="/Admin-Login/Dashboard/Messages">
          <button className="mt-4 md:mt-0 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl shadow-sm transition duration-200 font-medium">
            View Contact Messages
          </button>
        </NavLink>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-md mb-10">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Welcome, Admin {adminName}</h2>
        <NavLink to="Add-Event">
          <button className="mt-4 md:mt-0 bg-[#FEBA34] hover:bg-yellow-400 text-white font-semibold px-6 py-3 rounded-xl shadow-sm transition duration-200">
            + Add New Event
          </button>
        </NavLink>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <NavLink to="/Admin-Login/Dashboard/Resistrant">
          <div className="bg-yellow-300 hover:bg-yellow-400 transition duration-200 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Total Registrants</h3>
            <hr className="mb-4 border-gray-400" />
            <p className="text-3xl font-semibold bg-yellow-100 p-4 rounded-xl text-center">
              {events.length > 0 ? `${registrations.length}` : 'No event created'}
            </p>
          </div>
        </NavLink>

        <div className="bg-yellow-300 hover:bg-yellow-400 transition duration-200 p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Total Events</h3>
          <hr className="mb-4 border-gray-400" />
          <p className="text-3xl font-semibold bg-yellow-100 p-4 rounded-xl text-center">
            {events.length}
          </p>
        </div>
      </div>

      {/* Event Table */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">📋 Added Event Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-800 text-base font-semibold">
                <th className="p-3">Event ID</th>
                <th className="p-3">Title</th>
                <th className="p-3">Date</th>
                <th className="p-3">Seats Left</th>
                <th className="p-3">Tags</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {events.map((event) => (
                <tr key={event._id} className="hover:bg-gray-100 transition duration-150">
                  <td className="p-3">{event._id}</td>
                  <td className="p-3">
                    <NavLink to={`/Admin-Login/Dashboard/Resistrant/${event._id}`} className="text-indigo-600 hover:underline font-medium">
                      {event.title}
                    </NavLink>
                  </td>
                  <td className="p-3">{event.date}</td>
                  <td className="p-3">{event.leftSeate}/{event.totalSeats}</td>
                  <td className="p-3">{event.tags}</td>
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleEdit(event._id)} title="Edit">
                        <img src="/pencil-solid.png" alt="Edit" className="w-8 h-8 bg-yellow-200 rounded-xl p-1 hover:bg-yellow-300 transition" />
                      </button>
                      <button onClick={() => handleDelete(event._id)} title="Delete">
                        <img src="/Delete.png" alt="Delete" className="w-8 h-8 bg-red-200 rounded-xl p-1 hover:bg-red-300 transition" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;