import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import TechData from '../components/DataComponents/TechData'
import SportsData from '../components/DataComponents/SportsData'
import CultureData from '../components/DataComponents/CultureData'

const allEvents = [...TechData, ...SportsData, ...CultureData];

function ResisterEvent() {
    const { id } = useParams();
    const event = allEvents.find(e => e.id === parseInt(id));

        const [formData, setFormData] = useState({
            name: '',
            email: '',
            message: '',
            phone: ''
        });

        const handleChange = (e) => {
            setFormData({name, email, message, phone})
        };


        const handleSubmit = (e) => {
            e.preventDefault();
            console.log("Form submitted:", formData);
            alert("Registration successful!");
        };


        return (
            <>
                <h2 className='mt-20 text-2xl font-bold text-center'>Let’s Book Event</h2> <hr className='h-1 w-full' />
                <h1 className='mt-5 text-3xl font-black text-center'>{event.title}</h1>
                <form onSubmit={handleSubmit} className='pt-10 m-auto w-fit flex flex-col gap-10 pb-10 bg-[#D9D9D9] p-5 rounded-2xl mt-10 mb-10'>
                    <div>
                        <h3 className='text-xl font-bold mb-0'>👤 Full Name</h3><br />
                        <input type="text" placeholder='Enter your name..' value={formData.name} onChange={handleChange} className='b-2 bg-amber-300 rounded-xl p-3 w-120 -mt-10 text-xl' />{formData.name}
                    </div>
                    <div>
                        <h3 className='text-xl font-bold mb-0'>📧 Email Address</h3><br />
                        <input type="Email" placeholder='Enter your Email..' value={formData.email} onChange={handleChange} required className='b-2 bg-amber-300 rounded-xl p-3 w-120 -mt-10 text-xl' />
                    </div>
                    <div>
                        <h3 className='text-xl font-bold mb-0'>📞  Phone Number</h3><br />
                        <input type="Contact" placeholder='Enter your Contact Number..' value={formData.phone} onChange={handleChange} required className='b-2 bg-amber-300 rounded-xl p-3 w-120 -mt-10 text-xl' />
                    </div>
                    <div className='w-120'>
                        <h3 className='text-xl font-bold mb-0'>🧾 Additional Notes or Special Request</h3><br />
                        <textarea type="text" placeholder='Enter your Message here..' value={formData.message} onChange={handleChange} className='b-2 bg-amber-300 rounded-xl p-3 w-120 -mt-5 text-xl' /> <br />
                        <i className='font-light text-small text-amber-700'>Your information will only be used to confirm registration. We never share your data</i>
                    </div>
                    <button type='submit' className='cursor-pointer w-120 bg-[#FEBA34] p-5 rounded-2xl text-center'>Book Now</button>
                    <NavLink to='/Events' className='border-1 p-5 rounded-2xl text-center'><button className='cursor-pointer'>Find More Events</button></NavLink>
                </form>
            </>
        )
    }

    export default ResisterEvent