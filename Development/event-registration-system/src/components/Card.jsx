import React from 'react'
import { NavLink } from 'react-router-dom'

function Card(props) {
    return (
        <>
            <div className='inset-shadow-sm inset-shadow-indigo-500 shadow-xl bg-[#DCBEFD] h-fit w-fit p-5 rounded-2xl text-[#1F2937]'>
                <div>
                    <img src={props.image} alt="Event Poster" className='w-80 h-50 rounded-2xl' />
                    <div className='grid grid-cols-2 gap-5'>
                        <h3 className='text-sm w-fit h-fit p-2 bg-amber-300 rounded-2xl mt-5'>Left Seat : {props.leftSeate}</h3>
                        <h3 className='text-sm w-fit h-fit p-2 bg-amber-300 rounded-2xl mt-5'>Date : {props.date}</h3>
                    </div>
                </div>
                <div className='w-80 mt-4'>
                    <h2 className='mb-1 text-lg font-bold'>{props.title}</h2><hr className='outline-amber-500 outline-1' />
                    <h3 className='font-normal mb-4 mt-4 overflow-clip text-justify text-ellipsis text-base'>{props.description}</h3>
                    <NavLink to={`/Event-Details/${props.id}`}><button className='font-semibold bg-[#FFFFFF] p-2 text-xl rounded-2xl border-none text-[#000000]'>
                        View Details →</button></NavLink>
                </div>
            </div>
        </>
    )
}

export default Card