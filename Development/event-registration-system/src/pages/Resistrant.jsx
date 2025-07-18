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
    const confirm = window.confirm(
      eventId
        ? "Delete all registrants for this event?"
        : "Delete all registrants across all events?"
    );
    if (!confirm) return;

    const url = eventId
      ? `http://localhost:5000/api/registrations/event/${eventId}`
      : `http://localhost:5000/api/registrations`;

    try {
      const res = await fetch(url, {
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
        alert(data.message || "All registrants deleted");
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
    <div className="mt-24 pb-24 px-4 max-md:mb-20">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-indigo-800 mb-2">
        🧾 Registrants List for: {event ? event.title : 'All Events'}
      </h1>
      <hr className="border-gray-300 mb-4" />

      {/* Event Info */}
      {event && (
        <div className="text-center text-gray-600 mb-6">
          <p>{event.date} at {event.location}</p>
          <p>Category: {event.tags}</p>
        </div>
      )}

      {/* Bulk Delete Button */}
      {registrations.length > 0 && (
        <div className="text-center mb-6">
          <button
            onClick={handleDeleteAll}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold transition"
          >
            🗑️ Delete {eventId ? 'All for This Event' : 'All Registrants'}
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse shadow-md rounded-xl">
          <thead className="bg-gray-100">
            <tr className="text-lg font-bold text-gray-800">
              <th className="p-3">S.I.No.</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Message</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {registrations.length > 0 ? (
              registrations.map((reg, index) => (
                <tr key={reg._id} className="hover:bg-gray-50 transition">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{reg.name}</td>
                  <td className="p-3">{reg.email}</td>
                  <td className="p-3">{reg.mobile}</td>
                  <td className="p-3">{reg.message}</td>
                  <td className="p-3">
                    <button
                      title="Remove this registrant"
                      onClick={() => handleDeleteRegistrant(reg._id)}
                      disabled={deletingId === reg._id}
                      className={`px-4 py-2 rounded-xl font-semibold transition ${deletingId === reg._id
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-red-400 hover:bg-red-600 text-white'
                        }`}
                    >
                      {deletingId === reg._id ? 'Removing...' : 'Remove'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-gray-500 font-medium">
                  No registrations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Resistrant;