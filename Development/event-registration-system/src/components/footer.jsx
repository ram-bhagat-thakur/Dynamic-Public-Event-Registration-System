import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <div className="bg-[#DCBEFD] text-[#1F2937] pt-10 pb-6 px-4">
            {/* Spacer */}
            <div className="h-4"></div>

            {/* Internship Message */}
            <p className="text-center text-2xl max-md:text-lg font-semibold max-w-3xl mx-auto mb-6">
                Built as part of the Civora Nexus Internship, empowering student developers to build real-world apps.
            </p>

            {/* Social Icons */}
            <div className="flex justify-center gap-6 mb-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src="/facebook.png" alt="Facebook" className="w-8 h-8 hover:scale-110 transition" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src="/instagram.png" alt="Instagram" className="w-8 h-8 hover:scale-110 transition" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <img src="/linkedin.png" alt="LinkedIn" className="w-8 h-8 hover:scale-110 transition" />
                </a>
            </div>

            {/* Contact Email */}
            <p className="text-center text-lg font-medium mb-4">📧 exam@gmail.com</p>

            {/* Footer Links */}
            <ul className="flex justify-center gap-8 text-lg font-semibold mb-6 max-md:flex-wrap max-md:text-sm">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/Events">Events</NavLink></li>
                <li><NavLink to="/Contact">Contact</NavLink></li>
                <li><NavLink to="/Admin-Login">Admin Login</NavLink></li>
            </ul>

            {/* Copyright */}
            <div className="text-center text-lg font-semibold">
                <h3>&copy; 2025 SECT India</h3>
            </div>
        </div>
    )
}

export default Footer