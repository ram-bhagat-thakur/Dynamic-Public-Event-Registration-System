import React from 'react'

function Footer() {
    return (
        <>
            <div>
                <div className='h-15 flex items-center aflex-row text-2xl w-full bg-[#DCBEFD] text-[#1F2937]'></div>
                <p className='text-center text-2xl w-169 m-auto mt-5'>Built as part of the Civora Nexus Internship, empowering student developers to build real-world apps</p>
                <div className='flex flex-row justify-center mt-5'>
                    <div className='w-25 h-25 p-5'><img src="/facebook.png" alt="" /></div>
                    <div className='w-25 h-25 p-5'><img src="/instagram.png" alt="" /></div>
                    <div className='w-25 h-25 p-5'><img src="/linkedin.png" alt="" /></div>
                </div>
                <p className='text-center text-2xl w-169 m-auto text-[#1F2937]'>exam@gmail.com</p>
                <div className="mt-5">
                    <ul className='flex flex-row gap-6 justify-self-center'>
                        <li>Home</li>
                        <li>Events</li>
                        <li>Contact</li>
                        <li>Admin Login</li>
                    </ul>
                </div>
                <div className='flex items-center justify-center h-15 mt-5 text-2xl w-full bg-[#DCBEFD] text-[#1F2937]'>
                    <h3>&copy; 2025 SECT</h3>
                </div>
            </div>
        </>
    )
}

export default Footer