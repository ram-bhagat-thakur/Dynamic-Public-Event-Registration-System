import React, { useEffect, useState } from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom'


function ResisterEvent() {
    const { id } = useParams();
    const [event, setEvent] = useState();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });


    useEffect(() => {
        fetch(`http://localhost:5000/api/events/${id}`)
            .then(res => res.json())
            .then(data => setEvent(data))
            .catch(err => console.error("Failed to fetch event:", err));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("📤 Sending registration:", formData);
        try {
            const res = await fetch(`http://localhost:5000/api/register/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    mobile: formData.phone,
                    message: formData.message
                })
            });

            const data = await res.json();
            console.log("✅ Registration response:", data);

            if (!res.ok) {
                throw new Error(data.error || "Server error");
            }

            const message = `
  ✅ Registration Successful!

  👤 Name: ${data.registration.name}
  📧 Email: ${data.registration.email}
  📞 Phone: ${data.registration.mobile}

  📅 Event: ${data.updatedEvent.title}
  📍 Location: ${data.updatedEvent.location}
  🗓️ Date: ${data.updatedEvent.date}
`;
            // ✅ Show alert safely
            window.alert(message);

            // ✅ Reset form
            setFormData({ name: '', email: '', phone: '', message: '' });
            // navigate('http://localhost:5173/Events');
        } catch (err) {
            console.error("❌ Registration failed:", err);

            // If using fetch, you won't get err.response like Axios
            alert(err.message || "Something went wrong");
        }

    };

    if (!event) return <p>Loading event...</p>;



    return (
        <>
            <h2 className='mt-20 text-2xl font-bold text-center'>Let’s Book Event</h2> <hr className='h-1 w-full' />
            <h1 className='mt-5 text-3xl max-md:text-xl font-black text-center'>{event.title}</h1>
            <form onSubmit={handleSubmit} className='pt-10 m-auto w-fit flex flex-col gap-10 pb-10 bg-[#D9D9D9] p-5 rounded-2xl mt-10 mb-10 max-md:ml-10 max-md:mr-10'>
                <div>
                    <h3 className='text-xl font-bold mb-0'>👤 Full Name</h3><br />
                    <input name='name' type="text" placeholder="Your Name" value={formData.name} onChange={handleChange} required className='b-2 bg-amber-300 rounded-xl p-3 w-120 max-md:w-full -mt-10 text-xl' />
                </div>
                <div>
                    <h3 className='text-xl font-bold mb-0'>📧 Email Address</h3><br />
                    <input type="Email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className='b-2 bg-amber-300 rounded-xl p-3 w-120 max-md:w-full -mt-10 text-xl' />
                </div>
                <div>
                    <h3 className='text-xl font-bold mb-0'>📞  Phone Number</h3><br />
                    <input type="tel" name="phone" placeholder="Your Phone" value={formData.phone} onChange={handleChange} required className='b-2 bg-amber-300 rounded-xl p-3 w-120 max-md:w-full -mt-10 text-xl' />
                </div>
                <div className='w-120 max-md:w-full'>
                    <h3 className='text-xl font-bold mb-0'>🧾 Additional Notes or Special Request</h3><br />
                    <textarea name="message" placeholder='Enter your Message here..' value={formData.message} onChange={handleChange} className='b-2 bg-amber-300 rounded-xl p-3 w-120 max-md:w-full -mt-5 text-xl' /> <br />
                    <i className='font-light text-small text-amber-700'>Your information will only be used to confirm registration. We never share your data</i>
                </div>

                {/* SoldOut text */}
                {parseInt(event.leftSeate) === 0 && (
                    <p className="text-red-600 font-medium mt-2">Sorry, this event is fully booked.</p>
                )}

                <button type='submit'
                    disabled={parseInt(event.leftSeate) === 0}
                    className={`cursor-pointer w-120 max-md:w-full bg-[#FEBA34] p-5 rounded-2xl text-center ${parseInt(event.leftSeate) === 0 ? 'bg-gray-400 cursor-not-allowed w-120 max-md:w-full p-5 rounded-2xl text-center' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {parseInt(event.leftSeate) === 0 ? 'Sold Out' : 'Register'}
                </button>
                <NavLink to='/Events' className='border-1 p-5 rounded-2xl text-center'><button className='cursor-pointer'>Find More Events</button></NavLink>
            </form>
        </>
    )
}

export default ResisterEvent