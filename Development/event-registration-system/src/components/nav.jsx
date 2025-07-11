import React from 'react'

function Nav() {
  return (
    <>
    <div className='h-15 flex items-center aflex-row text-2xl w-full bg-[#DCBEFD] text-[#1F2937]'>
        <div className="basis-40 ml-5"><img src="/logo.png" alt="Event Resistration System" className='w-30 h-12 ' /></div>
        <div className="basis-1/1 mr-5">
            <ul className='flex gap-6 float-end items-center'>
                <li>Home</li>
                <li>Events</li>
                <li>Contact</li>
                <li>Admin Login</li>
            </ul>
        </div>
    </div>
    </>
  )
}

export default Nav