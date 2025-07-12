import React from 'react'
import { NavLink, useParams } from 'react-router-dom'


function WrongUrl() {
    const { id } = useParams()
    return (
        <>
            <div className='text-4xl text-center text-amber-600 h-screen pt-[20%]'>
                <h1 className='mb-10'>You are Searching for page " {id} ", that doesn't exist <br /> Make sure to check url and or visit to </h1>
                <NavLink to='/Contact' className={"bg-amber-200 border-none rounded-2xl p-1"}>Contact Page</NavLink> <br /> <br />
                <NavLink to='/' className={"bg-amber-200 border-none rounded-2xl p-1"}>Home Page</NavLink>
            </div>
        </>
    )
}

export default WrongUrl