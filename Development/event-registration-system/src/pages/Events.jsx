import React, { useEffect, useState } from 'react'
import Nav from '../components/nav'
import Card from '../components/Card'

function Events() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => {
        // console.log("Fetched events:", data);
        setEvents(data);
      })
      .catch(err => console.error("Failed to fetch events:", err));
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === 'All' || event.tags === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
    <section className="mt-15 bg-[#F3F4F6]">
      {/* Hero Section */}
      <div className="px-6 text-center py-16 bg-gradient-to-r from-indigo-100 to-purple-100">
        <h1 className="text-6xl max-md:text-3xl font-bold text-indigo-900">Explore Events</h1>

        {/* Decorative Line */}
        <div className="w-48 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto my-6 rounded-full"></div>

        <p className="max-w-3xl mx-auto text-lg max-md:text-base text-indigo-700 mt-4">
          Browse a wide range of exciting events including hands-on workshops, cutting-edge tech talks,
          vibrant cultural festivals, and more—all curated to match your interests and happening right around you.
        </p>

        {/* Search & Filter */}
        <div className="flex justify-center mt-10">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Search Input */}
            <div className="relative">
              <input
                type="search"
                placeholder="Search Events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-lg p-3 pr-12 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute right-3 top-2.5 text-xl">🔍</span>
            </div>

            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 p-3 rounded-xl text-lg cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Categories</option>
              <option value="Tech">Tech</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
        </div>
      </div>
    </section>

{/* Event Sections */ }
  <section className="mt-20 px-6">
    {/* Tech Events */}
    {(category === 'All' || category === 'Tech') && (
      <div>
        <hr />
        <h2 className="text-3xl text-center mt-6 mb-4 font-bold text-indigo-800">💻 Tech Events</h2>
        <hr />
        <div className="flex flex-wrap gap-10 justify-center mt-10 mb-16">
          {filteredEvents.filter(ev => ev.tags === 'Tech').map(event => (
            <Card
              key={event._id}
              bannerPath={event.bannerPath}
              id={event._id}
              title={event.title}
              date={event.date}
              location={event.location}
              description={event.description}
              leftSeate={event.leftSeate}
              image={event.image}
            />
          ))}
        </div>
      </div>
    )}

    {/* Cultural Events */}
    {(category === 'All' || category === 'Cultural') && (
      <div>
        <hr />
        <h2 className="text-3xl text-center mt-6 mb-4 font-bold text-purple-800">🎭 Cultural Events</h2>
        <hr />
        <div className="flex flex-wrap gap-10 justify-center mt-10 mb-16">
          {filteredEvents.filter(ev => ev.tags === 'Cultural').map(event => (
            <Card
              key={event._id}
              bannerPath={event.bannerPath}
              id={event._id}
              title={event.title}
              date={event.date}
              location={event.location}
              description={event.description}
              leftSeate={event.leftSeate}
              image={event.image}
            />
          ))}
        </div>
      </div>
    )}

    {/* Sports Events */}
    {(category === 'All' || category === 'Sports') && (
      <div>
        <hr />
        <h2 className="text-3xl text-center mt-6 mb-4 font-bold text-yellow-800">🏅 Sports Events</h2>
        <hr />
        <div className="flex flex-wrap gap-10 justify-center mt-10 mb-16">
          {filteredEvents.filter(ev => ev.tags === 'Sports').map(event => (
            <Card
              key={event._id}
              bannerPath={event.bannerPath}
              id={event._id}
              title={event.title}
              date={event.date}
              location={event.location}
              description={event.description}
              leftSeate={event.leftSeate}
              image={event.image}
            />
          ))}
        </div>
      </div>
    )}
  </section>
</>
  )
}

export default Events