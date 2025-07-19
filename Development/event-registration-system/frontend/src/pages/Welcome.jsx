import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';


const Welcome = () => {
    const location = useLocation();
    const { name, email, event } = location.state || {};
    const { width, height } = useWindowSize();


    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white px-6">
            <Confetti width={width} height={height} />
            <div className="min-h-screen mt-15 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white px-6">
                <div className="bg-white text-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                    <h1 className="text-3xl font-bold mb-4">🎉 Registration Successful!</h1>
                    {event && (
                        <>
                            <p className="text-lg mb-6">
                                Thank you {name} for registering. We’re excited to have you join the event!
                            </p>
                            <p className="text-lg bg-amber-200 p-3.5 rounded-2xl text-bold text-green-600 mb-6">
                                A confirmation has been sent to you on <strong>{email}</strong> for :
                                <p><strong>Event:</strong> {event.title}</p>
                                <p><strong>Date:</strong> {event.date}</p>
                                <p><strong>Location:</strong> {event.location}</p>

                            </p>
                        </>
                    )}
                    <div className="space-y-4">
                        <Link
                            to="/Events"
                            className="block bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition"
                        >
                            🔙 Back to Events
                        </Link>

                        <Link
                            to="/"
                            className="block bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition"
                        >
                            🏠 Go to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;