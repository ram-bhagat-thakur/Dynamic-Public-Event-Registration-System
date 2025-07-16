import { NavLink } from 'react-router-dom'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLog() {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await res.json();
            console.log("Login response:", data);

            if (data.token) {
                localStorage.setItem('adminToken', data.token);
                navigate('Dashboard');
            } else {
                alert("Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Something went wrong");
        }
    };

    return (
        <>
            <div className=' p-10 mt-15'>
                <form onSubmit={handleSubmit} className='m-auto max-md:w-full w-fit flex flex-col items-center border-none rounded-2xl p-10 bg-[#9C9C9C]'>
                    <div>
                        <h1 className='text-2xl text-center font-bold mt-10 mb-5'>Admin Login</h1><hr className='w-100 max-md:w-full mb-10' />
                    </div>
                    <div>
                        <h3 className='text-xl font-bold mb-0'>Email Address</h3><br />
                        <input type="email" name="email" placeholder="Admin Email" onChange={handleChange} required className='b-2 bg-[#e7dddd] rounded-xl p-3 w-120 max-md:w-full -mt-10 text-xl' />
                    </div>
                    <div>
                        <h3 className='mt-10 text-xl font-bold mb-0'>Password</h3><br />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className='b-2 bg-[#e7dddd] rounded-xl p-3 w-120 max-md:w-full -mt-10 text-xl' />
                    </div>
                    <button type='submit' className='cursor-pointer mb-5 mt-10 w-1/2 max-md:w-full bg-[#FEBA34] p-5 rounded-2xl text-center'>Login Now</button>

                </form>
                <NavLink to='/Events' className='w-1/2 max-md:w-full border-1 p-5 rounded-2xl text-center'><button className='cursor-pointer'>Go to Events Page</button></NavLink>
            </div>

        </>
    )
}

export default AdminLog