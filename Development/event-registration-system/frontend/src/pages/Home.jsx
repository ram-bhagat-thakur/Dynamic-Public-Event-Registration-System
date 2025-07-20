import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { NavLink } from 'react-router-dom'

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Failed to fetch events:", err));
  }, []);

  const techEvent = events.find(ev => ev.tags === 'Tech');
  const culturalEvent = events.find(ev => ev.tags === 'Cultural');
  const sportsEvent = events.find(ev => ev.tags === 'Sports');
  return (
    <>
      <div className="relative w-full h-screen max-md:h-fit overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/videoplayback.mp4" type="video/mp4" />
        </video>

        <section className="mt-24 flex flex-col md:flex-row items-center justify-center h-full px-6 text-white">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-5xl max-md:text-3xl font-black">Plan. Register. Attend</h1>
            <hr className="w-20 mx-auto md:mx-0 border-white" />
            <h3 className="text-2xl max-md:text-xl font-semibold">
              Manage your events with ease. Find and register for upcoming programs.
            </h3>
            <NavLink to="/Events">
              <button className="mb-24 bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-xl font-semibold transition">
                Browse Events
              </button>
            </NavLink>
          </div>
          <div className="md:w-1/2 h-3/4 md:block flex items-center ">
            <img src="/Resister-Event-Easily.png" alt="Event Preview" className="h-[100%] pb-15 max-md:hidden m-auto mx-auto" />
          </div>
        </section>
      </div>


      <section className="bg-[#F3F4F6] py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-10">Seats Are Filling Fast — Grab Yours Now</h1>
        <div className="flex flex-wrap justify-center gap-10 mb-10">
          {[techEvent, culturalEvent, sportsEvent].map(
            (event) =>
              event && (
                <Card
                  key={event._id}
                  id={event._id}
                  title={event.title}
                  date={event.date}
                  location={event.location}
                  description={event.description}
                  leftSeate={event.leftSeate}
                  bannerPath={event.bannerPath}
                />
              )
          )}
        </div>
        <NavLink to="/Events">
          <button className="bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-xl font-semibold transition">
            See All Events
          </button>
        </NavLink>
      </section>


      <section className="bg-[#DAC9F1] py-16 px-6 text-center text-[#1F2937]">
        <h1 className="text-4xl font-bold mb-10">What This Platform Does</h1>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            {
              icon: "/pencil-solid.png",
              title: "Easy Registration",
              desc: "Quick form to reserve seats",
            },
            {
              icon: "/baseline-email.png",
              title: "Email Confirmation",
              desc: "Get instant confirmation after registering",
            },
            {
              icon: "/safe-lock-fill.png",
              title: "Admin Control",
              desc: "Admins can create and manage events securely",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#F3F4F6] w-full md:w-1/4 p-6 rounded-2xl shadow hover:scale-105 transition"
            >
              <img src={feature.icon} alt={feature.title} className="h-20 w-20 mx-auto mb-4" />
              <hr />
              <h2 className="text-xl font-bold mt-4">{feature.title}</h2>
              <p className="text-lg mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="bg-[#F3F4F6] py-16 px-6">
        <h1 className="text-4xl font-bold text-center mb-10">Frequently Asked Questions</h1>
        <div className="space-y-8 max-w-4xl mx-auto">
          {[
            {
              q: "1. How do I register for an event?",
              a: "Just browse the upcoming events, click on the one you’re interested in, and fill out the registration form. You’ll receive a confirmation email right after.",
            },
            {
              q: "2. Is there a limit to how many seats I can book?",
              a: "Yes, each event has a fixed number of seats. Once all seats are booked, registration will be closed for that event.",
            },
            {
              q: "3. Will I get an email confirmation after registering?",
              a: "Absolutely! A confirmation email will be sent instantly to the email ID you provide during registration.",
            },
            {
              q: "4. Can I cancel or change my registration?",
              a: "Currently, this version does not support editing or canceling registrations. Please double-check your details before submitting.",
            },
          ].map((faq, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-bold text-[#1F2937]">{faq.q}</h2>
              <p className="text-lg text-gray-700 mt-2">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <>

        {/* Why Choose Us Section */}
        <section className="bg-[#DAC9F1] py-16 px-6 text-center">
          <h1 className="text-4xl font-bold mb-10">Why Choose This Platform?</h1>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                icon: "/Real-Time-Seat-Tracking.png",
                title: "Real-Time Seat Tracking",
                desc: "Users can see live updates on available seats during registration.",
              },
              {
                icon: "/shield-lock.png",
                title: "Secure and Verified",
                desc: "Admin tools ensure your data is protected and spam-free.",
              },
              {
                icon: "/sparkles.png",
                title: "Celebratory UI",
                desc: "Enjoy confetti, smooth feedback animations, and personalized responses.",
              },
              {
                icon: "/dashboard.png",
                title: "Event Dashboard",
                desc: "Admins manage registrations, inbox, and analytics with ease.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white w-full md:w-[22%] p-6 rounded-xl shadow hover:scale-105 transition text-center">
                <img src={feature.icon} alt={feature.title} className="h-20 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
                <p className="text-md text-gray-700">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white py-16 px-6 text-center">
          <h1 className="text-4xl font-bold mb-10">How to Book an Event</h1>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                step: "1",
                title: "Explore Events",
                desc: "View all upcoming events — tech, cultural, sports, and more.",
              },
              {
                step: "2",
                title: "Fill Registration",
                desc: "Submit your name, email, and reserve your seat.",
              },
              {
                step: "3",
                title: "Get Confirmation",
                desc: "Receive instant feedback and a confirmation email.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#F3F4F6] w-full md:w-[28%] p-6 rounded-xl shadow text-center hover:scale-105 transition">
                <div className="text-4xl font-bold text-blue-600">{item.step}</div>
                <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
                <p className="text-md mt-2 text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-[#DAC9F1] py-16 px-6 text-center text-[#1F2937]">
          <h1 className="text-3xl font-bold mb-6">Ready to Attend Your Next Event?</h1>
          <p className="text-lg mb-8">
            Don’t wait — seats are limited and events are happening now. Be part of the experience.
          </p>
          <NavLink to="/Events">
            <button className="bg-[#2563EB] hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-xl font-semibold transition">
              Browse & Register Now
            </button>
          </NavLink>
        </section>
      </>


    </>
  )
}

export default Home