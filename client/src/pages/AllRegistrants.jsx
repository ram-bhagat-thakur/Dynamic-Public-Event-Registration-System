import { useEffect, useState } from 'react';
import {
  getAllRegistrants,
  deleteSingleRegistrant,
  deleteAllRegistrants,
} from '../services/registrationService';
import { exportToCSV } from '../services/csvService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllRegistrants() {
  const [registrants, setRegistrants] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    getAllRegistrants(token)
      .then((res) => setRegistrants(res.data))
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to load registrants');
      });
  }, []);

  const filteredRegistrants = registrants.filter((reg) =>
    `${reg.name} ${reg.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handledeleteSingleRegistrant = async (regId) => {
    if (!window.confirm('Remove this registrant?')) return;
    try {
      await deleteSingleRegistrant(regId, token);
      setRegistrants((prev) => prev.filter((r) => r._id !== regId),
        toast.success('👤 Registrant removed successfully!')
      );
    } catch {
      toast.error('❌ Failed to remove registrant');
    }
  };

 const handleDeleteAll = async () => {
    if (!window.confirm('Remove all registrants?')) return;
    try {
      await deleteAllRegistrants(token);
      setRegistrants([]);
    } catch {
      alert('Failed to remove all registrants');
    }
  };

  const handleExportCSV = () => {
    const exportToast = toast.loading('📤 Exporting CSV...');
    try {
      const headers = ['Name', 'Email', 'Mobile', 'Message', 'Event Title'];
      const rows = filteredRegistrants.map((reg) => [
        reg.name,
        reg.email,
        reg.mobile,
        reg.message || '',
        reg.eventId?.title || 'Unknown',
      ]);
      exportToCSV(`all_registrants.csv`, headers, rows);

      toast.success('✅ CSV exported!', { id: exportToast });
    } catch (error) {
      toast.error('❌ Export failed.', { id: exportToast });
    }
  };

  return (
    <main
      role="main"
      aria-label="All registrants dashboard"
      className="min-h-screen w-full px-6 pb-24 pt-24 bg-gradient-to-br from-[#E0ECFF] via-[#F0F4FF] to-white dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#111827] font-sans text-gray-800 dark:text-gray-200"
    >
      <section className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-white to-[#F0F4FF] dark:from-[#0F172A] dark:to-[#1E293B] rounded-2xl shadow-xl">
        <header className="mb-6">
          <h2
            id="registrants-heading"
            className="text-3xl font-extrabold text-indigo-700 dark:text-yellow-300 flex items-center gap-2"
          >
            📋 All Registrants
          </h2>
        </header>

        {error && (
          <p
            role="alert"
            aria-live="polite"
            className="text-red-500 mb-4 font-medium"
          >
            {error}
          </p>
        )}

        {/* Search & Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-8">
          <input
            type="text"
            placeholder="🔍 Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search registrants by name or email"
            className="w-full sm:w-1/2 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E293B] text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400 transition-all"
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Total Registrants:{' '}
              <span className="font-bold">{filteredRegistrants.length}</span>
            </p>
            <button
              onClick={handleExportCSV}
              data-testid="export-csv"
              aria-label="Export registrants to CSV"
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded-xl text-sm shadow-md transition"
            >
              📤 Export CSV
            </button>
            {/* <button
              onClick={handleDeleteAll}
              data-testid="remove-all"
              aria-label="Remove all registrants"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-xl text-sm shadow-md transition"
            >
              🗑️ Remove All
            </button> */}
          </div>
        </div>

        {/* Registrant List */}
        {filteredRegistrants.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-20">
            No registrants found.
          </p>
        ) : (
          <ul
            data-testid="registrant-list"
            role="list"
            aria-label="List of registrants"
            aria-labelledby="registrants-heading"
          >
            {filteredRegistrants.map((reg, index) => (
              <li
                role="listitem"
                key={reg._id}
                className="mb-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E293B] rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center transition hover:shadow-xl"
              >
                <div className="mb-4 sm:mb-0">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    #{index + 1}
                  </p>
                  <p className="text-lg font-semibold text-indigo-700 dark:text-yellow-300">
                    {reg.name}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    📧 {reg.email} | 📱 {reg.mobile}
                  </p>
                  {reg.message && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 italic">
                      📝 “{reg.message}”
                    </p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    📅 Event: {reg.eventId?.title || 'Unknown'}
                  </p>
                </div>
                <button
                  onClick={() => handledeleteSingleRegistrant(reg._id)}
                  data-testid={`remove-${reg._id}`}
                  aria-label={`Remove registrant ${reg.name}`}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm shadow-md transition self-start sm:self-auto"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default AllRegistrants;