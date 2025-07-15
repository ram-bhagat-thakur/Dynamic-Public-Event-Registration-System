import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'

function AddEvent() {

  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'banner') {
      setFormData(prev => ({
        ...prev,
        banner: files[0] // ✅ Store the selected file
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      title, date, time, totalSeats, location,
      tags, description, highlights, organizer, banner
    } = formData;

    if (!title || !date || !time || !totalSeats || !location ||
      !tags || !description || !highlights || !organizer || !banner) {
      alert("Please fill in all fields and upload a banner.");
      return;
    }

    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('date', formData.date);
    payload.append('time', formData.time);
    payload.append('totalSeats', formData.totalSeats);
    payload.append('leftSeate', formData.totalSeats); // default
    payload.append('location', formData.location);
    payload.append('tags', formData.tags);
    payload.append('description', formData.description);
    payload.append('highlights', formData.highlights);
    payload.append('organizer', formData.organizer);
    payload.append('banner', formData.banner); // ✅ file

    try {
      const res = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        body: payload // ✅ no JSON.stringify
      });

      const data = await res.json();
      alert(data.message || "Event added successfully");
    } catch (err) {
      console.error("❌ Error adding event:", err);
      alert("Failed to add event");
    }
  };

  return (
    <>

      <div className='mt-20'>
        <h1 className='text-center text-2xl max-md:text-xl font-bold mb-5'>Add New Event</h1>
        <hr />
      </div>

      <div className='mb-20 w-2/4 max-md:w-full max-md:pl-10 max-md:pr-10 m-auto flex flex-col gap-10 mt-15'>
        <div>
          <h3 className='text-xl font-bold mb-0'>Event Title :</h3><br />
          <input type="text" placeholder='Enter your text..' name="title"
            value={formData.title}
            onChange={handleChange}
            className='w-full border-2 rounded-xl p-3 -mt-10 text-xl' required />
        </div>
        <div className='flex flex-row gap-5 flex-wrap'>
          <div>
            <h3 className='text-xl font-bold mb-0'>Date :</h3><br />
            <input type="Date" name="date"
              value={formData.date}
              onChange={handleChange}
              className="border-2 rounded-xl p-3 -mt-10 text-xl"
              required
            />
          </div>
          <div>
            <h3 className='text-xl font-bold mb-0'>Time :</h3><br />
            <input type="time" name='time' value={formData.time} onChange={handleChange} className='border-2 rounded-xl p-3 -mt-10 text-xl' required />
          </div>
          <div>
            <h3 className='text-xl font-bold mb-0'>Total Seats :</h3><br />
            <input type="number"
              name="totalSeats"
              value={formData.totalSeats}
              onChange={handleChange}
              className="border-2 rounded-xl p-3 -mt-10 text-xl"
              required
            />
          </div>
        </div>

        <div>
          <h3 className='text-xl font-bold mb-0'>Location :</h3><br />
          <input type="text" name='location' placeholder='Enter Event Location..' value={formData.location} onChange={handleChange} className='w-full border-2 rounded-xl p-3 -mt-10 text-xl' required />
        </div>
        <div className='flex flex-row gap-8 flex-wrap'>
          <div>
            <h3 className='text-xl font-bold -mb-4'>Category :</h3><br />
            <select
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="cursor-pointer p-3 text-2xl bg-amber-200 rounded-2xl"
              required
            >
              <option value="">Select Category</option>
              <option value="Tech">Tech Event</option>
              <option value="Cultural">Cultural Event</option>
              <option value="Sports">Sports Event</option>
            </select>

          </div>
          <div className='cursor-pointer'>
            <h3 className='text-xl font-bold mb-0'>Upload Banner in size 16:9 :</h3><br />
            <input type="file"
              name="banner"
              accept="image/*"
              onChange={handleChange}
              className='cursor-pointer w-full border-2 rounded-xl p-3 -mt-10 text-xl' required />
          </div>
        </div>

        <div>
          <h3 className='text-xl font-bold mb-0'>Description :</h3>
          <textarea name="description" id="" placeholder='Write in details about events...' value={formData.description} onChange={handleChange} className='w-full border-2 rounded-2xl p-2' required></textarea>
        </div>
        <div>
          <h3 className='text-xl font-bold mb-0'>Highlights include :</h3>
          <textarea name="highlights" id="" placeholder='Include Highlights so people will understand...' value={formData.highlights} onChange={handleChange} className='w-full border-2 rounded-2xl p-2' required></textarea>
        </div>

        <div>
          <h3 className='text-xl font-bold mb-0'>Organized By :</h3><br />
          <input type="text" name='organizer' placeholder='Enter Organizer Details..' value={formData.organizer} onChange={handleChange} className='w-full border-2 rounded-xl p-3 -mt-10 text-xl' required />
        </div>
        <div className='flex gap-10 w-fit m-auto max-md:flex-col'>
          <button type='submit' onClick={handleSubmit} className='bg-[#FEBA34] p-2.5 text-2xl rounded-2xl w-full max-md:text-xl'>+ Add New Event</button>
          <NavLink to='/Admin-Login/Dashboard'><button className='border-2 p-2 pl-10 pr-10 rounded-2xl w-full text-2xl'>Cancel</button></NavLink>
        </div>
      </div>
    </>
  )
}

export default AddEvent