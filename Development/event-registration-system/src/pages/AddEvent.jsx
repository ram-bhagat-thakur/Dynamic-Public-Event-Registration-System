import React from 'react'
import { NavLink } from 'react-router-dom'

function AddEvent() {
  return (
    <>

      <div className='mt-20'>
        <h1 className='text-center text-2xl font-bold mb-5'>Add New Event</h1>
        <hr />
      </div>

      <div className='mb-20 w-2/4 m-auto flex flex-col gap-10 mt-15'>
        <div>
          <h3 className='text-xl font-bold mb-0'>Event Title :</h3><br />
          <input type="text" placeholder='Enter your text..' className='w-full border-2 rounded-xl p-3 -mt-10 text-xl' />
        </div>
        <div className='flex flex-row gap-5 flex-wrap'>
          <div>
            <h3 className='text-xl font-bold mb-0'>Date :</h3><br />
            <input type="Date" className='border-2 rounded-xl p-3 -mt-10 text-xl' />
          </div>
          <div>
            <h3 className='text-xl font-bold mb-0'>Time :</h3><br />
            <input type="time" className='border-2 rounded-xl p-3 -mt-10 text-xl' />
          </div>
          <div>
            <h3 className='text-xl font-bold mb-0'>Total Seats :</h3><br />
            <input type="number" className='border-2 rounded-xl p-3 -mt-10 text-xl' />
          </div>
        </div>

        <div>
          <h3 className='text-xl font-bold mb-0'>Location :</h3><br />
          <input type="text" placeholder='Enter your text..' className='w-full border-2 rounded-xl p-3 -mt-10 text-xl' />
        </div>
        <div className='flex flex-row gap-8 flex-wrap'>
          <div>
            <h3 className='text-xl font-bold -mb-4'>Category :</h3><br />
            <select name="" id="" className='cursor-pointer p-3 text-2xl bg-amber-200 rounded-2xl'>
              <option value="">Tech Event</option>
              <option value="">Cultural Event</option>
              <option value="">Sports Events</option>
            </select>
          </div>
          <div className='cursor-pointer'>
            <h3 className='text-xl font-bold mb-0'>Upload Banner in size 16:9 :</h3><br />
            <input type="file" className='cursor-pointer w-full border-2 rounded-xl p-3 -mt-10 text-xl' />
          </div>
        </div>

        <div>
          <h3 className='text-xl font-bold mb-0'>Description :</h3>
          <textarea name="" id="" placeholder='Write in details about events...' className='w-full border-2 rounded-2xl p-2'></textarea>
        </div>
        <div>
          <h3 className='text-xl font-bold mb-0'>Highlights include :</h3>
          <textarea name="" id="" placeholder='Include Highlights so people will understand...' className='w-full border-2 rounded-2xl p-2'></textarea>
        </div>

        <div>
          <h3 className='text-xl font-bold mb-0'>Organized By :</h3><br />
          <input type="text" placeholder='Enter Organizer Details..' className='w-full border-2 rounded-xl p-3 -mt-10 text-xl' />
        </div>
        <div className='flex gap-10 w-fit m-auto'>
          <NavLink to='/Admin-Login/Dashboard'><button className='bg-[#FEBA34] p-2.5 text-2xl rounded-2xl w-full'>+ Add New Event</button></NavLink>
          <NavLink to='/Admin-Login/Dashboard'><button className='border-2 p-2 pl-10 pr-10 rounded-2xl w-full text-2xl'>Cancel</button></NavLink>
        </div>
      </div>
    </>
  )
}

export default AddEvent