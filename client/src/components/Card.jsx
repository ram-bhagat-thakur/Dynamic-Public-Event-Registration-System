import React from 'react';
import { NavLink } from 'react-router-dom';

function Card({ id, title, date, location, description, bannerPath, leftSeate, time }) {
  return (
    <article
      role="group"
      aria-labelledby={`event-title-${id}`}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-2xl overflow-hidden w-full max-w-sm mx-auto transition-transform hover:scale-[1.02] duration-300"
    >
      <img
        src={`https://res.cloudinary.com/dfp3sk6qs/image/upload/${bannerPath}`}
        alt={`Banner for ${title}`}
        className="w-full h-56 object-cover"
      />

      <div className="p-5 text-gray-800 dark:text-gray-200">
        <div className="flex justify-between items-center text-xs font-medium mb-3">
          <span className="bg-yellow-100 dark:bg-yellow-600 text-gray-900 dark:text-gray-100 px-2 py-1 rounded-md">
            🪑 Seats Left: {leftSeate ?? 'N/A'}
          </span>
          <span className="bg-yellow-100 dark:bg-yellow-600 text-gray-900 dark:text-gray-100 px-2 py-1 rounded-md">
            📅 {date}
          </span>
        </div>

        <h2
          id={`event-title-${id}`}
          className="text-lg font-semibold text-indigo-700 dark:text-yellow-300 mb-2 text-center"
        >
          {title}
        </h2>

        <p className="text-xs text-gray-600 dark:text-gray-400 text-center mb-3">
          📍 {location} | ⏰ {time}
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 text-center mb-4">
          {description}
        </p>

        <div className="text-center">
          <NavLink to={`/events/${id}`}>
            <button
              aria-label={`View details for ${title}`}
              className="bg-indigo-600 hover:bg-indigo-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900 font-medium px-4 py-2 rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-500"
            >
              View Details →
            </button>
          </NavLink>
        </div>
      </div>
    </article>
  );
}

export default Card;