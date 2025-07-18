import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate('/Admin-Login');
    }
  }, [token, navigate]);

  // ✅ Fetch events
  useEffect(() => {
    fetch('http://localhost:5000/api/events', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setEvents(Array.isArray(data) ? data : []))
      .catch(err => console.error("Failed to fetch events:", err));
  }, [token]);

  // ✅ Fetch registrations
  useEffect(() => {
    fetch('http://localhost:5000/api/events/registrations', {
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
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
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
    <>
      {/* Header */}
      <div className='mt-25 flex w-screen flex-row items-center'>
        <div className='w-1/2 max-md:w-full ml-10'>
          <h2 className='text-2xl max-md:text-xl font-bold'>Welcome, Admin Ram</h2>
        </div>
        <div className='w-1/2 max-md:w-full flex justify-end mr-10'>
          <NavLink to='Add-Event'>
            <button className='max-md:text-sm bg-[#FEBA34] p-5 rounded-2xl'>+ Add New Event</button>
          </NavLink>
        </div>
      </div>

      {/* Stats */}
      <div className='flex flex-row gap-5 m-10'>
        <div className='w-1/4 max-md:w-fit bg-amber-400 p-5 border-2 rounded-2xl'>
          <NavLink to='/Admin-Login/Dashboard/Resistrant'>
            <h2>Total Registrants:</h2><hr className='mb-5 w-full' />
            <h2 className='p-2 text-3xl bg-amber-200 rounded-2xl'>
              {events.length > -1
                ? `${registrations.length} total registrants`
                : 'Loading...'}
            </h2>
          </NavLink>
        </div>
        <div className='w-1/4 max-md:w-fit bg-amber-400 p-5 border-2 rounded-2xl'>
          <h2>Total Events:</h2><hr className='mb-5 w-full' />
          <h2 className='p-2 text-3xl bg-amber-200 rounded-2xl'>
            {events.length}
          </h2>
        </div>
      </div>

      {/* Event Table */}
      <div className='w-screen mt-40 mb-40'>
        <hr />
        <h2 className='bg-amber-200 p-5 text-center font-bold text-3xl max-md:text-xl'>Added Event Details</h2>
        <hr />
        <div className='flex'>
          <table className='w-screen text-center m-10 max-md:mt-10 max-md:m-0'>
            <thead>
              <tr className='text-2xl max-md:text-sm font-black'>
                <th>Event ID</th>
                <th>Title</th>
                <th>Date</th>
                <th>Seat Left</th>
                <th>Tags</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='max-md:text-sm'>
              {events.map(event => (
                <tr key={event._id}>
                  <td>{event._id}</td>
                  <td>
                    <NavLink to={`/Admin-Login/Dashboard/Resistrant/${event._id}`}>
                      {event.title}
                    </NavLink>
                  </td>
                  <td>{event.date}</td>
                  <td>{event.leftSeate}/{event.totalSeats}</td>
                  <td>{event.tags}</td>
                  <td className='flex flex-row gap-2 justify-center'>
                    <button onClick={() => handleEdit(event._id)}>
                      <img src="/pencil-solid.png" alt="Edit" className='w-10 h-10 max-md:size-8 bg-amber-300 rounded-2xl p-2' />
                    </button>
                    <button onClick={() => handleDelete(event._id)}>
                      <img src="/Delete.png" alt="Delete" className='w-10 h-10 max-md:size-8 bg-amber-300 rounded-2xl p-2' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;