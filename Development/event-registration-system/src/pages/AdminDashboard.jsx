import React from 'react'
import { NavLink } from 'react-router-dom'


function AdminDashboard() {
  return (
    <>
      <div className='mt-25 flex w-screen flex-row items-center'>
        <div className='w-1/2 ml-10'>
          <h2 className='text-2xl font-bold '>Welcome, Admin Ram</h2>
        </div>
        <div className='w-1/2 flex justify-end mr-10'>
          <NavLink to='Add-Event'><button className='bg-[#FEBA34] p-5 rounded-2xl'>+ Add New Event</button></NavLink>
        </div>
      </div>
      <div className='flex flex-row gap-5 m-10'>
        <div className='w-1/4 bg-amber-400 p-5 border-2 rounded-2xl'>
        <NavLink to='/Admin-Login/Dashboard/Resistrant'>
          <h2>Total Resistrance :</h2><hr className='mb-5 w-full' />
          <h2 className='p-2 text-3xl w-fit h-fit bg-amber-200 rounded-2xl'>80/90</h2>
          </NavLink>
        </div>
        <div className='w-1/4 bg-amber-400 p-5 border-2 rounded-2xl'>
          <h2>Total Events :</h2><hr className='mb-5 w-full' />
          <h2 className='p-2 text-3xl w-fit h-fit bg-amber-200 rounded-2xl'>100</h2>
        </div>
      </div>

      <div className='w-screen mt-40 mb-40'>
        <hr />
        <h2 className='bg-amber-200 p-5 text-center font-bold text-3xl'>Added Event Details</h2><hr />
        <div className='flex '>
          <table className='w-screen text-center m-10 text-wrap'>
            <thead>
              <tr className='text-2xl font-black'>
                <th>Event ID</th>
                <th>Title</th>
                <th>Date</th>
                <th>Seat Field</th>
                <th>Tags</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <th>Innovators Connect 2025 – Empowering Tech Minds</th>
                <td>25th July 2025</td>
                <td>25/100</td>
                <td>Tech</td>
                <td className='flex flex-row gap-2 justify-center'>
                  <img src="/pencil-solid.png" alt="Edit" className='w-10 h-10 bg-amber-300 rounded-2xl p-2' />
                  <img src="/Delete.png" alt="Edit" className='w-10 h-10 bg-amber-300 rounded-2xl p-2' />

                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard