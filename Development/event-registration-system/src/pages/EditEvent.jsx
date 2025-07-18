import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

function EditEvent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    const [eventData, setEventData] = useState({
        id: '',
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        organizer: '',
        highlights: '',
        leftSeate: '',
        totalSeats: '',
        tags: '',
        banner: ''
    });

    useEffect(() => {
        fetch(`http://localhost:5000/api/events/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setEventData(data))
            .catch(err => console.error("Failed to fetch event:", err));
    }, [id, token]);



    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setEventData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) : value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title: eventData.title,
            date: eventData.date,
            time: eventData.time,
            location: eventData.location,
            description: eventData.description,
            organizer: eventData.organizer,
            highlights: eventData.highlights,
            leftSeate: eventData.leftSeate,
            totalSeats: parseInt(eventData.totalSeats),
            tags: eventData.tags
        };
        try {
            const res = await fetch(`http://localhost:5000/api/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (res.ok) {
                alert("Event updated successfully");
                navigate('/Admin-Login/Dashboard');
            } else {
                alert(data.error || "Failed to update event");
            }
        } catch (err) {
            console.error("Update error:", err);
            alert("Something went wrong");
        }
    };

    return (
        <>
            <div className='mt-20'>
                <h1 className='text-center text-2xl max-md:text-xl font-bold mb-5'>Edit Event</h1>
                <hr />
            </div>

            <form onSubmit={handleSubmit} className='mb-20 w-2/4 max-md:w-full max-md:pl-10 max-md:pr-10 m-auto flex flex-col gap-10 mt-15'>
                <div>
                    <h3 className='text-xl font-bold mb-0'>Event Title :</h3><br />
                    <input type="text" placeholder='Enter your text..' name="title"
                        value={eventData.title} onChange={handleChange}
                        className='w-full border-2 rounded-xl p-3 -mt-10 text-xl' required />
                </div>
                <div className='flex flex-row gap-5 flex-wrap'>
                    <div>
                        <h3 className='text-xl font-bold mb-0'>Date :</h3><br />
                        <input type="Date" name="date"
                            value={eventData.date} onChange={handleChange}
                            className="border-2 rounded-xl p-3 -mt-10 text-xl"
                            required
                        />
                    </div>
                    <div>
                        <h3 className='text-xl font-bold mb-0'>Time :</h3><br />
                        <input type="time" name='time' value={eventData.time} onChange={handleChange} className='border-2 rounded-xl p-3 -mt-10 text-xl' required />
                    </div>
                    <div>
                        <h3 className='text-xl font-bold mb-0'>Total Seats :</h3><br />
                        <input type="number"
                            name="totalSeats"
                            value={eventData.totalSeats} onChange={handleChange}
                            className="border-2 rounded-xl p-3 -mt-10 text-xl"
                            required
                        />
                    </div>
                </div>

                <div>
                    <h3 className='text-xl font-bold mb-0'>Location :</h3><br />
                    <input type="text" name='location' placeholder='Enter Event Location..' value={eventData.location} onChange={handleChange} className='w-full border-2 rounded-xl p-3 -mt-10 text-xl' required />
                </div>
                <div>
                    <h3 className='text-xl font-bold -mb-4'>Category :</h3><br />
                    <select type="text" name="tags" value={eventData.tags} onChange={handleChange}
                        className="cursor-pointer p-3 text-2xl bg-amber-200 rounded-2xl"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Tech">Tech Event</option>
                        <option value="Cultural">Cultural Event</option>
                        <option value="Sports">Sports Event</option>
                    </select>

                </div>

                <div>
                    <h3 className='text-xl font-bold mb-0'>Description :</h3>
                    <textarea name="description" placeholder='Write in details about events...' value={eventData.description} onChange={handleChange} className='w-full border-2 rounded-2xl p-2' required></textarea>
                </div>
                <div>
                    <h3 className='text-xl font-bold mb-0'>Highlights include :</h3>
                    <textarea name="highlights" placeholder='Include Highlights so people will understand...' value={eventData.highlights} onChange={handleChange} className='w-full border-2 rounded-2xl p-2' required></textarea>
                </div>

                <div>
                    <h3 className='text-xl font-bold mb-0'>Organized By :</h3><br />
                    <input type="text" name='organizer' placeholder='Enter Organizer Details..' value={eventData.organizer} onChange={handleChange} className='w-full border-2 rounded-xl p-3 -mt-10 text-xl' required />
                </div>
                <div className='flex gap-10 w-fit m-auto max-md:flex-col'>
                    <button type='submit' className='bg-[#FEBA34] p-2.5 text-2xl rounded-2xl w-full max-md:text-xl'>Update Event</button>
                    <NavLink to='/Admin-Login/Dashboard'><button className='border-2 p-2 pl-10 pr-10 rounded-2xl w-full text-2xl'>Cancel</button></NavLink>
                </div>
            </form>
        </>
    );
}

export default EditEvent;