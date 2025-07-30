import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents, deleteEvent } from '../services/eventService';
import { exportToCSV } from '../services/csvService';
import { getRegistrations } from '../services/registrationService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [totalSeats, setTotalSeats] = useState(0);
  const [totalLeftSeats, setTotalLeftSeats] = useState(0);
  const [loadingIds, setLoadingIds] = useState({});
  const navigate = useNavigate();
  const adminName = localStorage.getItem('adminName');
  const token = localStorage.getItem('adminToken');


  useEffect(() => {
    const hasVisitedAdmin = localStorage.getItem('visitedAdminDashboard');

    if (!hasVisitedAdmin) {
      toast.success('👋 Welcome, Admin! Ready to manage some magic?');
      localStorage.setItem('visitedAdminDashboard', 'true');
    }
  }, []);


  useEffect(() => {
    getEvents()
      .then((res) => {
        setEvents(res.data);
        const total = res.data.reduce((sum, ev) => sum + (ev.totalSeats || 0), 0);
        const totalLeft = res.data.reduce((sum, ev) => sum + (ev.leftSeats || 0), 0);
        setTotalSeats(total);
        setTotalLeftSeats(totalLeft);
      })
      .catch((err) => {
        // console.error('Error fetching events:', err);
        toast.error('Failed to load events');
      });
  }, []);

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    setLoadingIds((prev) => ({ ...prev, [id]: true }));

    try {
      await deleteEvent(id, token);
      setEvents((prev) => prev.filter((event) => event._id !== id));
      toast.success('Event deleted successfully');
    } catch (err) {
      // console.error('Delete error:', err);
      toast.error('Failed to delete event');
    } finally {
      setLoadingIds((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleExportCSV = async (eventId) => {
    try {
      const res = await getRegistrations(eventId, token);
      const headers = ['Name', 'Email', 'Mobile', 'Message'];
      const rows = res.data.map(reg => [reg.name, reg.email, reg.mobile, reg.message]);
      exportToCSV(`registrations_${eventId}.csv`, headers, rows);
      toast.success('Registrants exported successfully');
    } catch (err) {
      // console.error('Export error:', err);
      toast.error('Failed to export registrations');
    }
  };

  return (
    <main
      id="main-content"
      role="main"
      aria-label="Admin Dashboard"
      className="min-h-screen pt-24 w-full bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-6"
    >
      <ToastContainer aria-live="polite" />

      {/* Welcome Header */}
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-indigo-800 dark:text-yellow-300">
          Welcome, {adminName || 'Admin'} 👋
        </h2>
      </header>

      {/* Action Buttons */}
      <section aria-label="Admin Actions" className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => navigate('/admin/messages')}
          aria-label="View contact messages"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          📬 View Contact Messages
        </button>
        <button
          onClick={() => navigate('/admin/registrants')}
          aria-label="View all registrants"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          📋 View All Registrants
        </button>
        <button
          onClick={() => navigate('/admin/add-event')}
          aria-label="Add new event"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          ➕ Add New Event
        </button>
        <button
          onClick={() => navigate('/admin/register')}
          aria-label="Register new admin"
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          🧑‍💼 Register New Admin
        </button>
        <button
          onClick={() => navigate('/admin/feedback')}
          aria-label="Manage user feedback"
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
        >
          💬 Manage Feedback
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('adminToken');
            navigate('/admin/login');
          }}
          aria-label="Logout"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          🔒 Logout
        </button>
      </section>

      {/* Stats Section */}
      <section aria-label="Event Statistics" className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-center">
        <article className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-indigo-700 dark:text-yellow-300">📅 Total Events</h3>
          <hr />
          <p className="text-2xl font-bold mt-2">{events.length}</p>
        </article>
        <article className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-indigo-700 dark:text-yellow-300">🎟️ Total Seats</h3>
          <hr />
          <p className="text-2xl font-bold mt-2">{totalSeats}</p>
        </article>
        <article className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-indigo-700 dark:text-yellow-300">🪑 Seats Left</h3>
          <hr />
          <p className="text-2xl font-bold mt-2">{totalLeftSeats}</p>
        </article>
      </section>

      {/* Events Table */}
      <section aria-label="All Events">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-yellow-300">📋 All Events</h2>
        {events.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No events found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table
              role="table"
              aria-label="List of all events"
              className="w-full max-md:min-w-7xl border-collapse border text-sm"
            >
              <thead role="rowgroup" className="bg-gray-100 dark:bg-gray-700 text-left">
                <tr role="row">
                  <th role="columnheader" className="border p-2">S.No.</th>
                  <th role="columnheader" className="border p-2">Event ID</th>
                  <th role="columnheader" className="border p-2">Title</th>
                  <th role="columnheader" className="border p-2">Date</th>
                  <th role="columnheader" className="border p-2">Tags</th>
                  <th role="columnheader" className="border p-2">Seats</th>
                  <th role="columnheader" className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody role="rowgroup">
                {events.map((event, index) => (
                  <tr key={event._id} role="row" className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td role="cell" className="border p-2">{index + 1}</td>
                    <td role="cell" className="border p-2 text-indigo-700 dark:text-yellow-300">
                      <button
                        onClick={() => navigate(`/events/${event._id}`)}
                        aria-label={`View details for event ID ${event._id}`}
                        className="hover:underline"
                      >
                        {event._id}
                      </button>
                    </td>
                    <td role="cell" className="border p-2 text-indigo-700 dark:text-yellow-300">
                      <button
                        onClick={() => navigate(`/admin/registrants/event/${event._id}`)}
                        aria-label={`View registrants for event titled ${event.title}`}
                        className="hover:underline"
                      >
                        {event.title}
                      </button>
                    </td>
                    <td role="cell" className="border p-2">{event.date}</td>
                    <td role="cell" className="border p-2">{event.tags}</td>
                    <td role="cell" className="border p-2 text-center">
                      {event.leftSeats || event.totalSeats}/{event.totalSeats}
                    </td>
                    <td role="cell" className="border p-2 flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => navigate(`/admin/edit-event/${event._id}`)}
                        aria-label={`Edit event titled ${event.title}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        disabled={loadingIds[event._id]}
                        aria-label={`Delete event titled ${event.title}`}
                        className={`px-3 py-1 rounded text-white ${loadingIds[event._id]
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-500 hover:bg-red-600'
                          }`}
                      >
                        {loadingIds[event._id] ? 'Deleting...' : '🗑️ Delete'}
                      </button>
                      <button
                        onClick={() => handleExportCSV(event._id)}
                        aria-label={`Export registrants for event titled ${event.title}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        📤 Export
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default AdminDashboard;