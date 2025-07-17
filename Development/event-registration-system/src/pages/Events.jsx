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
        console.log("Fetched events:", data); // ✅ Add this
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
      <section className='mt-15 bg-[#F3F4F6]'>
        <div className="pl-5 pr-5 text-center py-15 pb-30 bg-gradient-to-r from-indigo-100 to-purple-100">
          <h1 className="text-7xl max-md:text-3xl font-bold text-indigo-900">Explore Events</h1>
          {/* Line */}
          <div className="w-50 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto my-8 rounded-full"></div>
          <p className="pl-10 pr-10 m-auto text-xl max-md:text-xl text-indigo-700 mt-2">
            Browse a wide range of exciting events including hands-on workshops, cutting-edge tech talks, vibrant cultural festivals, and more—all curated to match your interests and happening right around you.
          </p>

          <div className='flex justify-center mt-10'>
            <div className='flex flex-row gap-15 max-md:gap-10 max-md:flex-col'>
              <div>
                <input type="search" placeholder='Search Events...' value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='outline-none text-xl p-2 border-1 rounded-xl' />
                <span className='relative -ml-12 bg-amber-300 p-3.5 rounded-r-xl'>🔍</span>
              </div>
              <select value={category}
                onChange={(e) => setCategory(e.target.value)} className="border p-3 rounded-xl cursor-pointer outline-none">
                <option value="All">All Categories</option>
                <option value="Tech">Tech</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className='mt-20'>
        {(category === 'All' || category === 'Tech') && (

          <div>
            <hr />
            <h1 className='text-3xl text-center mt-5 mb-5 font-bold'>💻 Tech Eventt</h1>
            <hr />
            <div  className='flex flex-row gap-10 justify-center flex-wrap mb-10 mt-12'>
            {filteredEvents.filter(ev => ev.tags === 'Tech').map(event =>
                <div key={event._id}>


                  <Card bannerPath={event.bannerPath} id={event._id} title={event.title} date={event.date} location={event.location} description={event.description} leftSeate={event.leftSeate} image={event.image} />
                </div>
              )}
              </div>
          </div>
        )}

        {(category === 'All' || category === 'Cultural') && (
          <div>
            <hr />
            <h1 className='text-3xl text-center mt-5 mb-5 font-bold'>🎭 Cultural Event</h1>
            <hr />
            <div  className='flex flex-row gap-10 justify-center flex-wrap mb-10 mt-12'>
            {filteredEvents.filter(ev => ev.tags === 'Cultural').map(event =>
                <div key={event._id}>


                  <Card bannerPath={event.bannerPath} id={event._id} title={event.title} date={event.date} location={event.location} description={event.description} leftSeate={event.leftSeate} image={event.image} />
                </div>
              )}
              </div>
          </div>
        )}
        
        {(category === 'All' || category === 'Sports') && (

          <div>
            <hr />
            <h1 className='text-3xl text-center mt-5 mb-5 font-bold'>🏅 Sports Events</h1>
            <hr />
            <div  className='flex flex-row gap-10 justify-center flex-wrap mb-10 mt-12'>
            {filteredEvents.filter(ev => ev.tags === 'Sports').map(event =>
                <div key={event._id}>


                  <Card bannerPath={event.bannerPath} id={event._id} title={event.title} date={event.date} location={event.location} description={event.description} leftSeate={event.leftSeate} image={event.image} />
                </div>
              )}
              </div>
          </div>
        )}
      </section>
    </>
  )
}

export default Events