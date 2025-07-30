import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getRegistrations,
  deleteSingleRegistrant,
  deleteAllRegistrants,
} from '../services/registrationService';
import { getEventById } from '../services/eventService';
import { exportToCSV } from '../services/csvService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EventRegistrants() {
  const { eventId } = useParams();
  const [registrants, setRegistrants] = useState([]);
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRegistrants = registrants.filter((reg) =>
    `${reg.name} ${reg.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getEventById(eventId)
      .then((res) => setEvent(res.data))
      .catch(() => {
        setError('Failed to load event details');
        toast.error('❌ Couldn’t load event details');
      });

    getRegistrations(eventId, token)
      .then((res) => setRegistrants(res.data))
      .catch(() => {
        setError('Failed to load registrants');
        toast.error('❌ Couldn’t load registrants');
      });
  }, [eventId]);


  const handledeleteSingleRegistrant = async (regId) => {
    if (!window.confirm('Remove this registrant?')) return;
    const toastId = toast.loading('🔄 Removing registrant...');
    try {
      await deleteSingleRegistrant(regId, token);
      setRegistrants((prev) => prev.filter((r) => r._id !== regId));
      toast.success('👤 Registrant removed', { id: toastId });
    } catch {
      // alert('Failed to remove registrant');
      toast.error('❌ Failed to remove registrant', { id: toastId });
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('Remove all registrants for this event?')) return;
    const toastId = toast.loading('🔄 Deleting all registrants...');
    try {
      await deleteAllRegistrants(eventId, token);
      setRegistrants([]);
      toast.success('✅ All registrants removed', { id: toastId });
    } catch {
      // alert('Failed to remove all registrants');
      toast.error('❌ Couldn’t delete registrants', { id: toastId });
    }
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Mobile', 'Message'];
    const rows = filteredRegistrants.map((reg) => [
      reg.name,
      reg.email,
      reg.mobile,
      reg.message || '',
    ]);
    const toastId = toast.loading('📤 Exporting CSV...');
    try {
      exportToCSV(`registrants_${eventId}.csv`, headers, rows);
      toast.success('✅ CSV exported', { id: toastId });
    } catch {
      toast.error('❌ Failed to export CSV', { id: toastId });
    }
  };

  return (
    <main
      role="main"
      aria-label="Event registrants dashboard"
      className="min-h-screen w-full px-6 pb-24 pt-24 bg-gradient-to-br from-[#E0ECFF] via-[#F0F4FF] to-white dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#111827] font-sans text-gray-800 dark:text-gray-200"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <section className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-10">
          <input
            type="text"
            placeholder="🔍 Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search registrants by name or email"
            className="w-full sm:w-1/2 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E293B] text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400 transition-all"
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold">{filteredRegistrants.length}</span> of{' '}
              <span className="font-semibold">{registrants.length}</span> registrants
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleExportCSV}
                aria-label="Export registrants to CSV"
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded-xl text-sm shadow-md transition"
              >
                📤 Export CSV
              </button>
              <button
                onClick={handleDeleteAll}
                aria-label="Remove all registrants"
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-xl text-sm shadow-md transition"
              >
                🗑️ Remove All
              </button>
            </div>
          </div>
        </section>

        {/* Event Info */}
        {event && (
          <header className="mb-8 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-indigo-700 dark:text-yellow-300 mb-2">
              {event.title}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              📅 {event.date} | 📍 {event.location || 'Location not set'}
            </p>
          </header>
        )}

        {/* Error Message */}
        {error && (
          <p role="alert" aria-live="polite" className="text-red-500 text-center mb-6 font-medium">
            {error}
          </p>
        )}

        {/* Registrants List */}
        {registrants.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center mt-20">No registrants found.</p>
        ) : (
          <ul className="space-y-6" aria-label="List of registrants">
            {filteredRegistrants.map((reg) => (
              <li
                key={reg._id}
                className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E293B] rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center transition hover:shadow-xl"
              >
                <div className="mb-4 sm:mb-0">
                  <p className="text-lg font-semibold text-indigo-700 dark:text-yellow-300">{reg.name}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    📧 {reg.email} | 📱 {reg.mobile}
                  </p>
                  {reg.message && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 italic">
                      📝 “{reg.message}”
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handledeleteSingleRegistrant(reg._id)}
                  aria-label={`Remove registrant ${reg.name}`}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm shadow-md transition"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default EventRegistrants;