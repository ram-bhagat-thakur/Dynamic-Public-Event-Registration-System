import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';


function EventDetails() {

    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

useEffect(() => {
  fetch(`http://localhost:5000/api/events/${id}`)
    .then(async res => {
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to fetch event');
      }
      return res.json();
    })
    .then(data => {
      setEvent(data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Fetch error:", err);
      setError(err.message);
      setLoading(false);
    });
}, [id]);

    if (loading) return <p>Loading event...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (!event) return <p>No event data found.</p>;


    return (
        <>
            <div className='flex max-md:flex-col flex-row gap-10 mt-15 p-15'>
                <div className='w-1/2 max-md:w-full' overflow-y-auto='true'>
                    <img src={`http://localhost:5000/${event.bannerPath}`} alt="Event Banner" className='w-full rounded-2xl' />
                    <div className='m-5 max-md:m-0'>
                        <p className='text-xl max-md:text-sm max-md:mt-10 font-medium'>{event.description}</p>
                        <h2 className='mt-5 text-2xl max-md:text-xl font-bold'>Highlights include:</h2>
                        <p className='mt-2 text-xl max-md:text-sm font-medium ml-2'>{event.highlights}</p>

                        <h2 className='mt-5 mb-2 text-xl font-medium'><span className='text-2xl max-md:text-xl font-bold'>Seats Availability : </span>{event.leftSeate}</h2>
                        <i className='text-xl max-md:text-sm'>⚠️ Limited seats left! Register early to reserve yours.</i>

                        <h2 className='mt-5 mb-2 text-xl font-medium'><span className='text-2xl max-md:text-xl font-bold mr-2'>Organized By:</span>{event.organizer}</h2>
                    </div>
                </div>
                <div className='text-2xl max-md:text-xl text-left w-1/2 sticky max-md:w-full top-1/2 max-md:transform-none max-md:translate-0 transform -translate-y-1/2 h-fit'>
                    <h1 className='font-black'>{event.title}</h1>
                    <h2 className='font-bold mt-5'>Date : {event.date}</h2>
                    <h2 className='font-bold mt-4 mb-5'>Time : {event.time}</h2>
                    <h2><span className='font-bold'>Location : </span>{event.location}</h2>
                    <div>
                        <NavLink to={`/Resister-Event/${id}`}><button className='mt-12 max-md:w-full bg-[#FEBA34] p-5 rounded-2xl'>Book Now</button></NavLink>
                        <NavLink to='/Events'><button className='mt-12 max-md:w-full max-md:ml-0 bg-[#FEBA34] p-5 rounded-2xl ml-5'> Find More Events </button></NavLink>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EventDetails