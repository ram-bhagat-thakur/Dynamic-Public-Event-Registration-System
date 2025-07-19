import React from 'react'
import { NavLink } from 'react-router-dom'

function Card(props) {
    console.log("Banner path:", props.bannerPath);
    return (
        <div className="bg-[#DCBEFD] shadow-xl rounded-2xl p-5 text-[#1F2937] w-full max-w-sm mx-auto transition hover:scale-[1.02] duration-300">
            {/* Banner */}
            <img
                src={`http://localhost:5000/${props.bannerPath}`}
                alt="Event Poster"
                className="w-full h-48 object-cover rounded-xl mb-4"
            />

            {/* Info Badges */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <span className="bg-amber-300 text-sm font-medium px-3 py-1 rounded-xl text-center">
                    🪑 Seats Left: {props.leftSeate}
                </span>
                <span className="bg-amber-300 text-sm font-medium px-3 py-1 rounded-xl text-center">
                    📅 Date: {props.date}
                </span>
            </div>

            {/* Title & Description */}
            <div>
                <h2 className="text-lg font-bold mb-2">{props.title}</h2>
                <hr className="border-amber-500 mb-3" />
                <p className="text-base text-gray-800 line-clamp-3 text-justify">
                    {props.description}
                </p>
            </div>

            {/* CTA */}
            <div className="mt-4 text-center">
                <NavLink to={`/Event-Details/${props.id}`}>
                    <button className="bg-white hover:bg-gray-200 text-black font-semibold px-4 py-2 rounded-xl text-lg transition">
                        View Details →
                    </button>
                </NavLink>
            </div>
        </div>
    )
}

export default Card