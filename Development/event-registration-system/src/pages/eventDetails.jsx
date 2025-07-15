import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import TechData from '../components/DataComponents/TechData'
import SportsData from '../components/DataComponents/SportsData'
import CultureData from '../components/DataComponents/CultureData'


function EventDetails(props) {
    const allEvents = [...TechData, ...SportsData, ...CultureData];
    const { id } = useParams();
    const event = allEvents.find(e => e.id === parseInt(id));

    if (!event) return <p className='mt-25 mb-25'>Event not found</p>;

    return (
        <>
            <div className='flex flex-row gap-10 mt-15 p-15'>
                <div className='w-1/2' overflow-y-auto='true'>
                    <img src={event.image} alt="" className='w-full rounded-2xl' />
                    <div className='m-5'>
                        <p className='text-xl font-medium'>{event.briefDescription}</p>
                        <h2 className='mt-5 text-2xl font-semibold'>Highlights include:</h2>
                        <p className='mt-2 text-xl font-medium ml-2'>{event.Highlight}</p>

                        <h2 className='mt-5 mb-2 text-xl font-medium'><span className='text-2xl font-bold'>Seats Availability : </span>{event.leftSeate}</h2>
                        <i className='text-xl'>⚠️ Limited seats left! Register early to reserve yours.</i>

                        <h2 className='mt-5 mb-2 text-xl font-medium'><span className='text-2xl font-bold mr-2'>Organized By:</span>{event.organizer}</h2>
                    </div>
                </div>
                <div className='text-2xl text-left w-1/2 sticky top-1/2 transform -translate-y-1/2 h-fit'>
                    <h1 className='font-black'>{event.title}</h1>
                    <h2 className='font-bold mt-5'>Date : {event.date}</h2>
                    <h2 className='font-bold mt-4 mb-5'>Time : {event.time}</h2>
                    <h2><span className='font-bold'>Location : </span>{event.location}</h2>
                    <div>
                        <NavLink to={`/Resister-Event/${id}`}><button className='mt-12 bg-[#FEBA34] p-5 rounded-2xl'>Book Now</button></NavLink>
                        <NavLink to='/Events'><button className='mt-12 bg-[#FEBA34] p-5 rounded-2xl ml-5'> Find More Events </button></NavLink>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EventDetails