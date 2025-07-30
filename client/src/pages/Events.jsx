import { useEffect, useState } from 'react';
import { getEvents } from '../services/eventService';
import Card from '../components/Card';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Events() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    const visitedEventList = localStorage.getItem('visitedEventList');

    if (!visitedEventList) {
      toast('🎉 Here are upcoming events! Find your vibe.');
      localStorage.setItem('visitedEventList', 'true');
    }
  }, []);

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res.data))
      .catch((err) => console.error('Error fetching events:', err));
  }, []);

  const allTags = [...new Set(events.flatMap(ev => ev.tags?.split(',').map(tag => tag.trim()) || []))];

  const filteredEvents = events.filter(event => {
    const matchesSearch = `${event.title} ${event.location}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? event.tags?.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedTag('');
  };

  return (
    <main
      role="main"
      aria-label="Browse events"
      className="w-full pt-24 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-16 text-gray-800 dark:text-gray-200"
    >
      {/* Header Section */}
      <section className="mb-16">
        <div className="max-w-6xl mx-auto px-4">
          <header className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-xl px-6 py-12 md:px-12 md:py-16 text-center border border-indigo-100 dark:border-gray-700 overflow-hidden">
            {/* Decorative Backgrounds */}
            <div aria-hidden="true" className="absolute top-[-80px] left-[10%] w-72 h-72 bg-gradient-to-br from-indigo-400 to-purple-500 dark:from-yellow-400 dark:to-yellow-600 opacity-30 rounded-full blur-3xl pointer-events-none"></div>
            <div aria-hidden="true" className="absolute bottom-[-100px] right-[5%] w-64 h-64 bg-gradient-to-tr from-pink-300 to-indigo-400 dark:from-yellow-600 dark:to-yellow-400 opacity-20 rounded-full blur-3xl pointer-events-none"></div>

            <h1 className="relative z-10 text-4xl md:text-5xl font-extrabold text-indigo-700 dark:text-yellow-300 tracking-tight">
              Events
            </h1>
            <div className="relative z-10 mx-auto mt-3 h-1 w-16 bg-indigo-500 dark:bg-yellow-300 rounded-full"></div>

            <p className="relative z-10 mt-6 text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Browse a wide range of exciting events including hands-on workshops, cutting-edge tech talks,
              vibrant cultural festivals, and more — all curated to match your interests and happening right around you.
            </p>

            {/* Filters */}
            <form className="relative z-10 mt-10 flex flex-col md:flex-row gap-4 justify-center items-center" aria-label="Event filters">
              <input
                type="search"
                placeholder="Search by title or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search events by title or location"
                className="w-full md:w-80 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400 shadow-md transition-all"
              />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                aria-label="Filter events by tag"
                className="w-full md:w-60 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400 shadow-md transition-all"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              {(searchTerm || selectedTag) && (
                <button
                  aria-label="Clear Filters"
                  type="button"
                  onClick={handleClearFilters}
                  className="px-4 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition"
                >
                  ❌ Clear Filters
                </button>
              )}
            </form>
          </header>
        </div>
      </section>

      {/* Events Grid */}
      <section aria-label="Event results">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <Card
                key={event._id}
                bannerPath={event.bannerPath}
                id={event._id}
                title={event.title}
                date={event.date}
                location={event.location}
                description={event.description}
                leftSeate={event.leftSeats}
                image={event.image}
                time={event.time}
                tags={event.tags?.split(',').map(tag => tag.trim()) || []}
              />
            ))}
          </div>
        ) : (
          <p role="status" aria-live="polite" className="text-center mt-32 text-sm text-gray-500 dark:text-gray-400">
            No events found. Try a different search or tag.
          </p>
        )}
      </section>
    </main>
  );
}

export default Events;