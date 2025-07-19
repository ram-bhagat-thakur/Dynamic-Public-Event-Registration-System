import React, { useEffect, useState } from 'react';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const handleDeleteMessage = async (id) => {
        setDeletingId(id);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setMessages(messages.filter(m => m._id !== id));
            }
        } catch (err) {
            console.error('❌ Delete error:', err);
        } finally {
            setDeletingId(null);
        }
    };

    const handleDeleteAllMessages = async () => {
        const confirm = window.confirm('Are you sure you want to delete all messages?');
        if (!confirm) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, { method: 'DELETE' });
            if (res.ok) {
                setMessages([]);
            }
        } catch (err) {
            console.error('❌ Delete all error:', err);
        }
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/all`);
                const data = await res.json();
                setMessages(data);
            } catch (err) {
                console.error('❌ Error fetching messages:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 pt-24 px-6">
                <h1 className="text-3xl font-bold text-center text-indigo-800 mb-2">👋 Contact Messages</h1>
                 <hr className="border-gray-300 mb-4" />
                {/* Delete All Messages Button */}
                {messages.length > 0 && (
                    <div className="mb-6 text-center">
                        <button
                            onClick={handleDeleteAllMessages}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold transition"
                        >
                            🗑️ Delete All Messages
                        </button>
                    </div>
                )}

            {/* Conditional Rendering */}
            {loading ? (
                <p>Loading messages...</p>
            ) : messages.length === 0 ? (
                <p>All is good we have no contact message yet let's take a breath...</p>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div key={msg._id} className="bg-white p-6 rounded-2xl shadow-md relative">
                            <h2 className="text-xl font-semibold text-indigo-700 mb-2">{msg.name}</h2>
                            <p className="text-sm text-gray-600 mb-1">📧 {msg.email}</p>
                            <p className="text-sm text-gray-600 mb-3">🕒 {new Date(msg.createdAt).toLocaleString()}</p>
                            <p className="text-gray-800 text-lg mb-4">{msg.message}</p>

                            {/* Delete Single Message */}
                            <button
                                onClick={() => handleDeleteMessage(msg._id)}
                                disabled={deletingId === msg._id}
                                className={`absolute top-4 right-4 px-4 py-2 rounded-xl font-semibold transition ${deletingId === msg._id
                                    ? 'bg-gray-400 cursor-not-allowed text-white'
                                    : 'bg-red-400 hover:bg-red-600 text-white'
                                    }`}
                            >
                                {deletingId === msg._id ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminMessages;