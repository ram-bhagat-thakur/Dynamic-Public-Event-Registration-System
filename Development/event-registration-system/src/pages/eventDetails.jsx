import React from 'react'
import { NavLink } from 'react-router-dom'

function EventDetails() {
    return (
        <>
            <div className='flex flex-row gap-10 mt-15 p-15'>
                <div className='w-1/2' overflow-y-auto>
                    <img src="/poster.png" alt="" className='w-full rounded-2xl' />
                    <div className='m-5'>
                        <p className='text-xl font-medium'>Join fellow developers, tech enthusiasts, and industry mentors at Innovators Connect 2025—an interactive seminar focused on emerging technologies, career guidance, and team-building.</p>
                        <h2 className='mt-5 text-2xl font-semibold'>Highlights include:</h2>
                        <p className='mt-2 text-xl font-medium ml-2'>Talks by senior engineers and startup founders
                            AI-powered development workflows
                            Networking opportunities with SECT mentors</p>

                            <h2 className='mt-5 mb-2 text-xl font-medium'><span className='text-2xl font-bold'>Seats Availability : </span>32/50 seats filled</h2>
                            <i lassName='text-xl'>⚠️ Limited seats left! Register early to reserve yours.</i>

                            <h2 className='mt-5 mb-2 text-xl font-medium'><span className='text-2xl font-bold mr-2'>Organized By:</span>Civora Nexus – SECT Internship Program</h2>
                    </div>
                </div>
                <div className='text-2xl text-left w-1/2 sticky top-1/2 transform -translate-y-1/2 h-fit'>
                    <h1 className='font-black'>Innovators Connect 2025 – Empowering Tech Minds</h1>
                    <h2 className='font-bold mt-5'>Date : 11/07/2025</h2>
                    <h2 className='font-bold mt-4 mb-5'>Time : 07:45 PM</h2>
                    <h2><span className='font-bold'>Location : </span>Sandip University Auditorium, Sijaul, Bihar</h2>
                    <h2 className='mt-2'><span className='font-bold'>Category : </span>Technical Seminar & Networking</h2>
                    <div>
                        <NavLink to='/Resister-Event'><button className='mt-12 bg-[#FEBA34] p-5 rounded-2xl'>Book Now</button></NavLink> 
                        <NavLink to='/Events'><button className='mt-12 bg-[#FEBA34] p-5 rounded-2xl ml-5'> Find More Events </button></NavLink>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EventDetails