import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Resistrant() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const token = localStorage.getItem('adminToken');
  const [deletingId, setDeletingId] = useState(null);

  // ✅ Fetch event and registrations
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    console.log("🔑 Token:", token);
    if (!token) return;

    if (eventId) {
      fetch(`http://localhost:5000/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setEvent(data))
        .catch(err => console.error("❌ Failed to fetch event:", err));

      fetch(`http://localhost:5000/api/events/${eventId}/registrations`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setRegistrations(Array.isArray(data) ? data : []))
        .catch(err => console.error("❌ Failed to fetch registrations:", err));
    } else {
      fetch(`http://localhost:5000/api/events/registrations`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setRegistrations(Array.isArray(data) ? data : []))
        .catch(err => console.error("❌ Failed to fetch registrations:", err));
    }
  }, [eventId, token]);

  // ✅ Delete one registrant
  const handleDeleteRegistrant = async (id) => {
    const confirm = window.confirm("Remove this registrant?");
    if (!confirm) return;

    setDeletingId(id); // ✅ Start loading

    try {
      const res = await fetch(`http://localhost:5000/api/registrations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const raw = await res.text();
      let data;
      try {
        data = JSON.parse(raw);
      } catch (err) {
        throw new Error("Server returned invalid JSON");
      }

      if (res.ok) {
        alert("Registrant removed");
        setRegistrations(prev => prev.filter(r => r._id !== id));
      } else {
        alert(data.error || "Failed to remove registrant");
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert(err.message || "Something went wrong");
    } finally {
      setDeletingId(null); // ✅ End loading
    }
  };

  // ✅ Delete all registrants for event
  const handleDeleteAll = async () => {
  const confirm = window.confirm("Delete all registrants for this event?");
  if (!confirm || !eventId) return;

  try {
    const res = await fetch(`http://localhost:5000/api/registrations/event/${eventId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    const raw = await res.text();
    console.log("🧾 Raw response:", raw);

    let data;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      throw new Error("Server returned invalid JSON");
    }

    if (res.ok) {
      alert("All registrants deleted");
      setRegistrations([]);
    } else {
      alert(data.error || "Failed to delete all");
    }
  } catch (err) {
    console.error("Delete all error:", err);
    alert(err.message || "Something went wrong");
  }
};

  return (
    <div className='mt-20 max-md:mb-20'>
      <h1 className='text-2xl text-center font-bold'>
        Registrants list for: {event ? event.title : 'All Events'}
      </h1>
      <hr />
      {event && (
        <div className='text-center text-gray-600 mt-2'>
          <p>{event.date} at {event.location}</p>
          <p>Category: {event.tags}</p>
          <button
            onClick={handleDeleteAll}
            className='mt-5 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600'
          >
            🗑️ Delete All Registrants
          </button>
        </div>
      )}

      <div className='flex max-md:w-screen'>
        <table className='w-screen max-md:w-full text-center m-10 max-md:mt-10 max-md:m-0 text-wrap'>
          <thead>
            <tr className='text-2xl max-md:text-sm font-black'>
              <th>S.I.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='max-md:text-sm'>
            {registrations.length > 0 ? (
              registrations.map((reg, index) => (
                <tr key={reg._id}>
                  <td>{index + 1}</td>
                  <td>{reg.name}</td>
                  <td>{reg.email}</td>
                  <td>{reg.mobile}</td>
                  <td>{reg.message}</td>
                  <td>
                    <button
                      title="Remove this registrant"
                      onClick={() => handleDeleteRegistrant(reg._id)}
                      disabled={deletingId === reg._id}
                      className={`px-3 py-1 rounded-xl text-white ${deletingId === reg._id ? 'bg-gray-400' : 'bg-red-400 hover:bg-red-600'
                        }`}
                    >
                      {deletingId === reg._id ? 'Removing...' : 'Remove'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No registrations found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Resistrant;