import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminLog() {
    return (
        <>
        <div className='  p-10 mt-15'>
            <div className='m-auto w-fit flex flex-col items-center border-none rounded-2xl p-10 bg-[#9C9C9C]'>
                <div>
                    <h1 className='text-2xl text-center font-bold mt-10 mb-5'>Admin Login</h1><hr className='w-100 mb-10'/>
                </div>
                <div>
                    <h3 className='text-xl font-bold mb-0'>Email Address</h3><br />
                    <input type="Email" placeholder='Enter your Email..' className='b-2 bg-[#e7dddd] rounded-xl p-3 w-120 -mt-10 text-xl' />
                </div>
                <div>
                    <h3 className='mt-10 text-xl font-bold mb-0'>Password</h3><br />
                    <input type="password" placeholder='Enter your Email..' className='b-2 bg-[#e7dddd] rounded-xl p-3 w-120 -mt-10 text-xl' />
                </div>
                <NavLink to='/Admin-Login/Dashboard' className='mb-5 mt-10 w-1/2 bg-[#FEBA34] p-5 rounded-2xl text-center'><button className='cursor-pointer'>Login Now</button></NavLink> 
                <NavLink to='/Events' className='w-1/2 border-1 p-5 rounded-2xl text-center'><button className='cursor-pointer'>Go to Events Page</button></NavLink> 
            </div>
            </div>
        </>
    )
}

export default AdminLog