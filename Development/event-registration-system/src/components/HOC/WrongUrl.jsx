import React from 'react'
import { NavLink, useParams } from 'react-router-dom'


function WrongUrl() {
    const { id } = useParams()
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8E1] text-center px-6">
            <h1 className="text-4xl max-md:text-2xl font-bold text-amber-600 mb-6">
                🚫 Page Not Found
            </h1>
            <p className="text-xl max-md:text-base text-gray-700 mb-8">
                You searched for page "<span className="font-semibold text-red-500">{id}</span>", but it doesn't exist.<br />
                Please check the URL or use the links below to navigate.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
                <NavLink to="/Contact">
                    <button className="bg-amber-300 hover:bg-amber-400 text-[#1F2937] font-semibold px-6 py-2 rounded-xl transition">
                        📞 Contact Page
                    </button>
                </NavLink>
                <NavLink to="/">
                    <button className="bg-amber-300 hover:bg-amber-400 text-[#1F2937] font-semibold px-6 py-2 rounded-xl transition">
                        🏠 Home Page
                    </button>
                </NavLink>
            </div>
        </div>
    )
}

export default WrongUrl