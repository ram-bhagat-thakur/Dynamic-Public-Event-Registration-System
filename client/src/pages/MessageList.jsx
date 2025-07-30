import { useEffect, useState } from 'react';
import {
  getMessages,
  markMessageAsRead,
  deleteMessage
} from '../services/contactService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MessageList() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  const fetchMessages = () => {
    getMessages()
      .then((res) => setMessages(res.data))
      .catch((err) => {
        console.error('Message fetch error:', err);
        setError('Failed to load messages');
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await markMessageAsRead(id);
      fetchMessages();
      toast.success('✉️ Message marked as read');
    } catch (err) {
      // console.error('Mark as read failed:', err);
      toast.error('❌ Failed to mark as read');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMessage(id);
      fetchMessages();
      toast.success('🗑️ Message deleted');
    } catch (err) {
      // console.error('Delete failed:', err);
      toast.error('❌ Failed to delete message');
    }
  };

  const handleDeleteAll = async () => {
    try {
       const loadingToast = toast.loading('🔄 Deleting all messages...');
      await Promise.all(messages.map((msg) => deleteMessage(msg._id)));
      fetchMessages();
      toast.success('✅ All messages deleted', { id: loadingToast });
    } catch (err) {
      // console.error('Delete all failed:', err);
      toast.error('❌ Failed to delete all messages', { id: loadingToast });
    }
  };

  return (
    <main
      role="main"
      aria-label="Admin message inbox"
      className="min-h-screen w-full px-6 pb-24 pt-26 bg-gradient-to-br from-[#F0F4FF] to-white dark:from-[#0F172A] dark:to-[#1E293B] font-sans text-gray-800 dark:text-gray-200"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header + Delete All */}
        <section className="flex items-center justify-between mb-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E40AF] dark:text-yellow-300">
            📬 Contact Messages
          </h2>
          {messages.length > 0 && (
            <button
              onClick={handleDeleteAll}
              aria-label="Delete all messages"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm"
            >
              🗑️ Delete All
            </button>
          )}
        </section>

        {error && (
          <p role="alert" aria-live="polite" className="text-red-500 dark:text-red-400 mb-4">
            {error}
          </p>
        )}

        {messages.length === 0 ? (
          <p role="status" aria-live="polite" className="text-gray-600 dark:text-gray-400">
            No messages found.
          </p>
        ) : (
          <ul className="space-y-4" aria-label="List of contact messages">
            {messages.map((msg) => (
              <li
                key={msg._id}
                className="border p-4 rounded-xl shadow-md dark:border-gray-700 dark:bg-[#1E293B] flex flex-col lg:flex-row lg:items-start lg:justify-between"
              >
                {/* Message Content */}
                <article>
                  <p className="font-semibold text-[#1E40AF] dark:text-yellow-300">👤 {msg.name}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">📧 {msg.email}</p>
                  <p className="mt-2 text-gray-800 dark:text-gray-300">📝 {msg.message}</p>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>

                  <p
                    className={`text-sm font-semibold mt-1 ${
                      msg.read
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-yellow-600 dark:text-yellow-400'
                    }`}
                  >
                    {msg.read ? '✅ Read' : '🕒 Unread'}
                  </p>
                </article>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 lg:mt-0 lg:flex-col lg:items-end lg:ml-6">
                  {!msg.read && (
                    <button
                      onClick={() => handleMarkAsRead(msg._id)}
                      aria-label={`Mark message from ${msg.name} as read`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg._id)}
                    aria-label={`Delete message from ${msg.name}`}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default MessageList;