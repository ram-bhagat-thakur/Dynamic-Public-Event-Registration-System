import React, { useEffect, useState } from 'react';
const token = localStorage.getItem('adminToken');
console.log("🔑 Token:", token);
import { useParams } from 'react-router-dom'; //

function Resistrant() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const token = localStorage.getItem('adminToken'); // or userToken if needed

 useEffect(() => {
  const url = eventId
    ? `http://localhost:5000/api/events/${eventId}/registrations`
    : `http://localhost:5000/api/events/registrations`;

  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log("✅ Registrations fetched:", data);
      setRegistrations(data);
    })
    .catch(err => console.error("❌ Failed to fetch registrations:", err));
}, [eventId]);

  return (
    <div className='mt-20 max-md:mb-20'>
      <h1 className='text-2xl text-center font-bold'>Registrants list for: {event ? event.title : 'All Events'}</h1><hr />
      {event && (
        <div className='text-center text-gray-600 mt-2'>
          <p>{event.date} at {event.location}</p>
          <p>Category: {event.tags}</p>
        </div>
      )}
      <div className='flex max-md:w-screen'>
        <table className='w-screen max-md:w-full text-center m-10 max-md:mt-10 max-md:m-0 text-wrap'>
          <thead>
            <tr className='text-2xl max-md:text-sm font-black'>
              <th>S.I.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody className='max-md:text-sm'>
            {registrations.length > 0 ? (
              registrations.map((reg, index) => (
                <tr key={reg._id}>
                  <td>{index + 1}</td>
                  <td>{reg.name}</td>
                  <td>{reg.email}</td>
                  <td>{reg.mobile}</td>
                  <td>{reg.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No registrations found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Resistrant;