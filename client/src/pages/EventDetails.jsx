import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getEventById } from '../services/eventService';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getEventById(id)
      .then((res) => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to load event details.');
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <p role="status" aria-live="polite" className="text-center mt-10 text-gray-600 dark:text-gray-300">
        Loading event...
      </p>
    );
  if (error)
    return (
      <p role="alert" aria-live="polite" className="text-center mt-10 text-red-500 dark:text-red-400">
        Error: {error}
      </p>
    );
  if (!event)
    return (
      <p role="status" aria-live="polite" className="text-center mt-10 text-gray-600 dark:text-gray-300">
        No event data found.
      </p>
    );

  return (
    <main role="main" aria-label="Event details page" className='w-full'>
      <section className="flex flex-col-reverse md:flex-row gap-10 pt-24 px-6 pb-24 bg-white dark:bg-gray-900 dark:text-gray-200">
        {/* Left Section: Banner + Description */}
        <article className="md:w-1/2 w-full overflow-y-auto">
          {event.bannerPath && (
            <img
              src={`https://res.cloudinary.com/dfp3sk6qs/image/upload/${event.bannerPath}`}
              alt={`${event.title} banner`}
              className="w-full rounded-2xl shadow-md"
            />
          )}

          <div className="mt-6 space-y-4">
            {event.description && (
              <p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300">
                {event.description}
              </p>
            )}

            {event.highlights && (
              <>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-yellow-300">
                  🎯 Highlights include:
                </h2>
                <p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 ml-2">
                  {event.highlights}
                </p>
              </>
            )}

            <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-yellow-300 mt-6">
              <span className="text-xl md:text-2xl font-bold">Seats Availability:</span> {event.leftSeats}
            </h2>
            <p className="text-base text-yellow-700 dark:text-yellow-400">
              ⚠️ Limited seats left! Register early to reserve yours.
            </p>

            <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-yellow-300 mt-6">
              <span className="text-xl md:text-2xl font-bold">Organized By:</span> {event.organizer}
            </h2>
          </div>
        </article>

        {/* Right Section: Event Info + Actions */}
        <aside className="md:w-1/2 w-full md:sticky top-32 h-fit text-left space-y-4">
          <header>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
              {event.title}
            </h1>
          </header>
          <h2 className="text-base md:text-xl font-bold text-gray-800 dark:text-gray-300">
            📅 Date: {event.date}
          </h2>
          <h2 className="text-base md:text-xl font-bold text-gray-800 dark:text-gray-300">
            ⏰ Time: {event.time}
          </h2>
          <h2 className="text-base md:text-xl font-bold text-gray-800 dark:text-gray-300">
            📍 Location: {event.location}
          </h2>

          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <NavLink to={`/register/${id}`} aria-label={`Register for ${event.title}`}>
              <button className="bg-[#FEBA34] hover:bg-yellow-400 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 w-full md:w-auto">
                🎫 Book Now
              </button>
            </NavLink>
            <NavLink to="/events" aria-label="Browse more events">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-xl transition duration-300 w-full md:w-auto">
                🔍 Find More Events
              </button>
            </NavLink>
          </div>
        </aside>
      </section>

      <hr className="w-full h-1 bg-indigo-900" />
    </main>
  );
}

export default EventDetails;