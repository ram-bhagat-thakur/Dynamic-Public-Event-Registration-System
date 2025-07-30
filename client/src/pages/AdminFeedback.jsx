import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { exportToCSV } from '../services/csvService';
import axiosInstance from '../utils/axiosInstance';

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hideVerified, setHideVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = () => {
    axiosInstance.get('/api/feedback/admin')
      .then(res => setFeedbacks(res.data))
      .catch(() => toast.error('Failed to fetch feedback'))
      .finally(() => setLoading(false));
  };

  useEffect(fetchFeedbacks, []);

  const handleVerify = async (id) => {
    try {
      await axiosInstance.patch(`/api/feedback/verify/${id}`);
      toast.success('Feedback verified');
      fetchFeedbacks();
    } catch {
      toast.error('Failed to verify feedback');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    try {
      await axiosInstance.delete(`/api/feedback/${id}`);
      toast.success('Feedback deleted');
      fetchFeedbacks();
    } catch {
      toast.error('Failed to delete feedback');
    }
  };

  const handleExport = () => {
    const headers = ['Name', 'Rating', 'Comment', 'Verified', 'Date'];
    const rows = feedbacks.map(f => [
      f.name,
      f.rating,
      f.comment,
      f.verified ? 'Yes' : 'No',
      new Date(f.createdAt).toLocaleString()
    ]);
    exportToCSV('feedback.csv', headers, rows);
    toast.success('Feedback exported');
  };

  const filteredFeedbacks = feedbacks.filter(f =>
    (!hideVerified || !f.verified) &&
    (f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     f.comment.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const total = feedbacks.length;
  const verified = feedbacks.filter(f => f.verified).length;
  const unverified = total - verified;

  return (
    <main
      className=" w-full pt-28 pb-24 min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-6"
      aria-label="Admin Feedback Panel"
    >
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-indigo-800 dark:text-yellow-300 text-center">
          💬 Admin Feedback Panel
        </h1>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <input
            type="text"
            placeholder="🔍 Search feedback..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full sm:w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={hideVerified}
              onChange={() => setHideVerified(prev => !prev)}
              className="accent-indigo-600"
            />
            Hide Verified
          </label>
          <button
            onClick={handleExport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            📤 Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-yellow-300">📊 Total Feedback</h3>
            <p className="text-3xl font-bold mt-2">{total}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-green-600">✅ Verified</h3>
            <p className="text-3xl font-bold mt-2">{verified}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-red-600">🕵️ Unverified</h3>
            <p className="text-3xl font-bold mt-2">{unverified}</p>
          </div>
        </div>

        {/* Feedback List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading feedback...</p>
        ) : filteredFeedbacks.length === 0 ? (
          <p className="text-center text-gray-500">No matching feedback found.</p>
        ) : (
          <div className="space-y-6">
            {filteredFeedbacks.map(({ _id, name, rating, comment, verified, createdAt }) => (
              <div
                key={_id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-semibold text-indigo-700 dark:text-yellow-300">{name}</h4>
                    <div className="text-yellow-500 text-lg">⭐ {rating}/5</div>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">{comment}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(createdAt).toLocaleString()}
                    </p>
                    {verified && (
                      <span className="inline-block mt-2 text-green-600 font-medium text-sm">✅ Verified</span>
                    )}
                  </div>
                  <div className="space-y-2 space-x-2 text-right">
                    {!verified && (
                      <button
                        onClick={() => handleVerify(_id)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
                      >
                        Verify
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(_id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}