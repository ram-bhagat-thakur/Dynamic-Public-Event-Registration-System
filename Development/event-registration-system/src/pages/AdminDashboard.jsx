import React, { useEffect, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom'


function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const Navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      Navigate('/AdminLogin');
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Failed to fetch events:", err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/register')
      .then(res => res.json())
      .then(data => setRegistrations(data))
      .catch(err => console.error("Failed to fetch registrations:", err));
  }, []);

  fetch('http://localhost:5000/api/events/registrations', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => setRegistrations(data))
    .catch(err => console.error("Failed to fetch:", err));
    
    let a= 1;


  return (
    <>
      <div className='mt-25 flex w-screen flex-row items-center'>
        <div className='w-1/2 max-md:w-full  ml-10'>
          <h2 className='text-2xl max-md:text-xl font-bold '>Welcome, Admin Ram</h2>
        </div>
        <div className='w-1/2 max-md:w-full flex justify-end mr-10'>
          <NavLink to='Add-Event'><button className='max-md:text-sm bg-[#FEBA34] p-5 rounded-2xl'>+ Add New Event</button></NavLink>
        </div>
      </div>
      <div className='flex flex-row gap-5 m-10'>
        <div className='w-1/4 max-md:w-fit bg-amber-400 p-5 border-2 rounded-2xl'>
          <NavLink to='/Admin-Login/Dashboard/Resistrant'>
            <h2>Total Resistrance :</h2><hr className='mb-5 w-full' />
            <h2 className='p-2 text-3xl w-fit h-fit bg-amber-200 rounded-2xl'>
              {registrations.length}/90
            </h2>
          </NavLink>
        </div>
        <div className='w-1/4 max-md:w-fit bg-amber-400 p-5 border-2 rounded-2xl'>
          <h2>Total Events :</h2><hr className='mb-5 w-full' />
          <h2 className='p-2 text-3xl w-fit h-fit bg-amber-200 rounded-2xl'>50</h2>
        </div>
      </div>

      <div className='w-screen mt-40 mb-40'>
        <hr />
        <h2 className='bg-amber-200 p-5 text-center font-bold text-3xl max-md:text-xl'>Added Event Details</h2><hr />
        <div className='flex '>
          <table className='w-screen text-center m-10 max-md:mt-10 max-md:m-0 text-wrap'>
            <thead>
              <tr className='text-2xl max-md:text-sm font-black'>
                <th>Event ID</th>
                <th>Title</th>
                <th>Date</th>
                <th>Seat Left</th>
                <th>Tags</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='max-md:text-sm'>
              {events.map(event => (
                <tr key={event._id}>
                  <td>{event._id}</td>
                  <td>{event.title}</td>
                  <td>{event.date}</td>
                  <td>{event.leftSeate}/{event.totalSeats}</td>
                  <td>{event.tags}</td>
                  <td className='flex flex-row gap-2 justify-center'>
                    <img src="/pencil-solid.png" alt="Edit" className='w-10 h-10 max-md:size-8 bg-amber-300 rounded-2xl p-2' />
                    <img src="/Delete.png" alt="Delete" className='w-10 h-10 max-md:size-8 bg-amber-300 rounded-2xl p-2' />
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard