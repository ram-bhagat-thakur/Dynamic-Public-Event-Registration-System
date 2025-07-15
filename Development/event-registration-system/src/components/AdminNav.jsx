import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function AdminNav() {
  return (
    <>

      <div className='fixed top-0 right-0 left-0 z-10'>
        <div className='h-15 flex items-center flex-row text-2xl max-md:text-sm w-full bg-[#DCBEFD] text-[#1F2937]'>
          <div className="basis-40 ml-5"><NavLink to='/'><img src="/logo.png" alt="Event Resistration System" className='w-30 h-12 ' /></NavLink></div>
          <div className="basis-1/1 mr-5">
            <ul className='flex gap-6 float-end items-center font-bold'>
              <li><NavLink to='/Events'>Events</NavLink> </li>
              <li><NavLink to='/Admin-Login/Dashboard'>Dashboard</NavLink> </li>
              <li><NavLink to='/Admin-Login'>Log-Out</NavLink> </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminNav