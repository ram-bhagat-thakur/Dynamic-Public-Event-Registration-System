import React from 'react'
import Card from '../components/Card'
import { NavLink } from 'react-router-dom'
import TechData from '../components/DataComponents/TechData'
import SportsData from '../components/DataComponents/SportsData'
import CultureData from '../components/DataComponents/CultureData'

function Home() {
  return (
    <>
      <div className="relative w-full h-screen max-md:h-fit overflow-hidden max-md:pb-10">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/videoplayback.mp4" type="video/mp4" />
        </video>

        <section className='max-md:mt-25 max-md:m-auto max-md:text-center'>
          <header className='text-[#F3F4F6] p-5 flex flex-row gap-2 max-md:flex-col '>
            <div className='flex flex-col gap-10 h-screen max-md:h-fit justify-center w-1/2 max-md:w-full'>
              <h1 className='text-4xl max-md:text-3xl max-md:m-auto font-black'>Plan. Register. Attend</h1> <hr className='w-20 max-md:m-auto'/>
              <h3 className='text-3xl max-md:text-2xl w-2/3 max-md:w-full font-bold'>Manage your events with ease. Find and register for upcoming programs.</h3>
              <NavLink to='/Events' className='max-md:m-auto max-md:text-xl font-semibold bg-[#2563EB] p-2 text-2xl rounded-2xl border-none text-center text-[#FFFFFF] w-3/7'><button>Browse Events</button></NavLink>
            </div>
            <div className='w-1/2 max-md:w-full h-screen max-md:h-fit content-center'>
              <img src="/Resister-Event-Easily.png" alt="" className='h-4/5 m-auto max-md:hidden' />
            </div>
          </header>
        </section>
      </div>
      <section className='h-fit p-5 bg-[#F3F4F6]'>
        <div className='flex flex-col items-center mt-15'>
          <h1 className='text-center text-4xl mb-9 max-md:text-3xl font-bold'>Seats Are Filling Fast — Grab Yours Now</h1>
          <div className='flex flex-row gap-10 max-md:gap-0 justify-center flex-wrap mb-10 mt-10'>
            {TechData.map(event => (
              <div key={event.id} className='flex flex-row gap-10 justify-center flex-wrap mb-10'>


                <Card id={event.id} title={event.title} date={event.date} location={event.location} description={event.description} leftSeate={event.leftSeate} image={event.image} />
              </div>
            ))}
            {CultureData.map(event => (
              <div key={event.id} className='flex flex-row gap-10 justify-center flex-wrap mb-10'>


                <Card id={event.id} title={event.title} date={event.date} location={event.location} description={event.description} leftSeate={event.leftSeate} image={event.image} />
              </div>
            ))}
            {SportsData.map(event => (
              <div key={event.id} className='flex flex-row gap-10 justify-center flex-wrap mb-10'>


                <Card id={event.id} title={event.title} date={event.date} location={event.location} description={event.description} leftSeate={event.leftSeate} image={event.image} />
              </div>
            ))}
          </div>
          <NavLink to='/Events' className='font-semibold bg-[#2563EB] p-2 text-2xl rounded-2xl border-none text-center text-[#FFFFFF] w-2/7 max-md:text-xl max-md:w-fit'><button>See All Events</button></NavLink>
        </div>
      </section>

      <section>
        <div className='mt-5 text-center h-fit text-[#1F2937] bg-[#DAC9F1] p-10'>
          <h1 className='text-4xl mb-10 max-md:text-2xl font-bold'>What This Platform Does</h1>
          <div className='flex flex-row gap-5 p-5 max-md:flex-col'>
            <div className='p-5 bg-[#F3F4F6] w-1/3 h-fit rounded-2xl max-md:w-full'>
              <div>
                <img src="/pencil-solid.png" alt="Easy Resistration" className='m-auto h-20 w-20' /></div>
              <hr />
              <div>
                <h2 className='text-xl mt-5'>Easy Resistration</h2>
                <h3 className='text-2xl mt-5'>Quick form to reserve seats</h3>
              </div>
            </div>

            <div className='p-5 bg-[#F3F4F6] w-1/3 h-fit rounded-2xl max-md:w-full'>
              <div>
                <img src="/baseline-email.png" alt="Easy Resistration" className='m-auto h-20 w-20' /></div>
              <hr />
              <div>
                <h2 className='text-xl mt-5'>Email Confirmation</h2>
                <h3 className='text-2xl mt-5'>Get instant confirmation after registering</h3>
              </div>
            </div>

            <div className='p-5 bg-[#F3F4F6] w-1/3 h-fit rounded-2xl max-md:w-full'>
              <div>
                <img src="/safe-lock-fill.png" alt="Easy Resistration" className='m-auto h-20 w-20' /></div>
              <hr />
              <div>
                <h2 className='text-xl mt-5'>Admin Control</h2>
                <h3 className='text-2xl mt-5'>Admins can create and manage events securely</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='p-10 bg-[#F3F4F6] mb-1'>
        <div className='flex flex-col gap-5'>
          <h1 className='text-center text-4xl font-bold mb-5 max-md:text-3xl'>Frequently Asked Questions</h1>
          <div>
            <h2 className='max-md:text-xl font-bold text-2xl'>1. How do I register for an event?</h2>
            <p className='max-md:text-sm ml-5 text-xl font-medium'>Just browse the upcoming events, click on the one you’re interested in, and fill out the registration form. You’ll receive a confirmation email right after.</p>
          </div>
          <div>
            <h2 className='max-md:text-xl font-bold text-2xl'>2. Is there a limit to how many seats I can book?</h2>
            <p className='max-md:text-sm ml-5 text-xl font-medium'>Yes, each event has a fixed number of seats. Once all seats are booked, registration will be closed for that event.</p>
          </div>
          <div>
            <h2 className='max-md:text-xl font-bold text-2xl'>3. Will I get an email confirmation after registering?</h2>
            <p className='max-md:text-sm not-first:ml-5 text-xl font-medium'>Absolutely! A confirmation email will be sent instantly to the email ID you provide during registration.</p>
          </div>
          <div>
            <h2 className='max-md:text-xl font-bold text-2xl'>4. Can I cancel or change my registration?</h2>
            <p className='max-md:text-sm ml-5 text-xl font-medium'>Currently, this version does not support editing or canceling registrations. Please double-check your details before submitting.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home