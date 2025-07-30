import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { format, differenceInDays } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Welcome() {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, email, event } = location.state || {};
    const { height, width } = useWindowSize();

    const [showConfetti, setShowConfetti] = useState(true);
    const [copied, setCopied] = useState(false);
    const [daysLeft, setDaysLeft] = useState(null);


    useEffect(() => {
        toast.success('🎉 You’re officially registered! See you at the event.');
    }, []);

    useEffect(() => {
        if (!name || !email || !event) {
            navigate('/');
        } else {
            const eventDate = new Date(event.date);
            const today = new Date();
            const diff = differenceInDays(eventDate, today);
            setDaysLeft(diff);
        }
    }, [name, email, event, navigate]);

    const handleShare = () => {
        const shareText = `🎉 I just registered for "${event?.title}" on ${event?.date} at ${event?.location}! Join me: https://yourdomain.com/events/${event?.id}`;
        navigator.clipboard.writeText(shareText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        });
    };

    const handleDownloadICS = () => {
        const startDate = format(new Date(event.date), "yyyyMMdd");
        const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
DTSTART:${startDate}T100000Z
DTEND:${startDate}T120000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR
    `.trim();

        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${event.title.replace(/\s+/g, '_')}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <main
            role="main"
            aria-label="Event registration confirmation"
            className="min-h-screen w-full pt-26 pb-24 flex items-center justify-center bg-gradient-to-br from-[#F0F4FF] to-white dark:from-[#0F172A] dark:to-[#1E293B] text-gray-800 dark:text-gray-200 px-6 rounded-2xl"
        >{showConfetti && <Confetti width={width} height={height} />}

            <div className="p-[2px] max-w-xl w-full rounded-3xl bg-gradient-to-r from-green-400 via-blue-500 to-yellow-400 animate-fade-in">
                <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 text-center shadow-xl">

                    <h1 className="text-3xl font-extrabold text-green-600 dark:text-green-400 mb-6 animate-pulse">
                        🎊 You’re In! 🎉
                    </h1>

                    {/* Event Summary */}
                    {event && (
                        <article className="text-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-6 border border-gray-200 dark:border-gray-700">
                            <p className="text-lg leading-relaxed">
                                Thank you, <strong>{name}</strong>! You’ve successfully registered for <strong>{event.title}</strong> happening on <strong>{event.date}</strong> at <strong>{event.location}</strong>.
                            </p>
                            {daysLeft !== null && (
                                <p className="mt-3 text-sm text-indigo-700 dark:text-yellow-300 font-medium">
                                    ⏳ Only {daysLeft} day{daysLeft !== 1 ? 's' : ''} left — get excited!
                                </p>
                            )}
                        </article>
                    )}

                    <p className="text-md text-gray-700 dark:text-gray-300 mb-6">
                        A confirmation email has been sent to <strong>{email}</strong>.
                    </p>

                    <div className='flex gap-5 flex-row justify-center '>
                        {/* Share Button */}
                        <button
                            onClick={handleShare}
                            aria-label="Copy event share link to clipboard"
                            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full hover:scale-105 shadow-lg transition duration-300 mb-4"
                        >
                            📤 Share with Friends
                        </button>
                        {copied && (
                            <p role="status" aria-live="polite" className="text-sm text-green-500 dark:text-green-400">
                                ✅ Link copied to clipboard!
                            </p>
                        )}

                        {/* Calendar Invite */}
                        <button
                            onClick={handleDownloadICS}
                            aria-label="Download calendar invite"
                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-2 rounded-full hover:scale-105 shadow-lg transition duration-300 mb-4"
                        >
                            📅 Add to Calendar
                        </button>
                    </div>
                    {/* Browse Events */}
                    <h2 className="text-xl font-semibold text-indigo-700 dark:text-yellow-300 mb-4">
                        🔍 Explore More Events
                    </h2>
                    <button
                        onClick={() => navigate('/events')}
                        aria-label="Browse more events"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full hover:scale-105 shadow-lg transition duration-300"
                    >
                        Browse Events
                    </button>
                </section>
            </div>
        </main>
    );
}

export default Welcome;