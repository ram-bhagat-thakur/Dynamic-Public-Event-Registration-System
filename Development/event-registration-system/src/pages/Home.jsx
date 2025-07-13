import React from 'react'
import Card from '../components/Card'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <>
    <div className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/videoplayback.mp4" type="video/mp4"/>
        </video>

        <section>
          <header className='text-[#F3F4F6] p-5 flex flex-row gap-2'>
            <div className='flex flex-col gap-10 h-screen justify-center w-1/2'>
              <h1 className='text-4xl'>Plan. Register. Attend</h1> <hr className='w-20'/>
              <h3 className='text-3xl w-2/3'>Manage your events with ease. Find and register for upcoming programs.</h3>
          <NavLink to='/Events'  className='font-semibold bg-[#2563EB] p-2 text-2xl rounded-2xl border-none text-center text-[#FFFFFF] w-3/7'><button>Browse Events</button></NavLink>
            </div>
            <div className='w-1/2 h-screen content-center'>
              <img src="/Resister-Event-Easily.png" alt="" className='h-4/5 m-auto' />
            </div>
          </header>
        </section>
      </div>
      <section className='h-fit p-5 bg-[#F3F4F6]'>
        <div className='flex flex-col items-center'>
          <h1 className='text-center text-4xl mb-9'>Seats Are Filling Fast — Grab Yours Now</h1>
          <div className='flex flex-row gap-10 justify-center flex-wrap mb-10'>
            <Card />
            <Card />
            <Card />
          </div>
          <NavLink to='/Events'  className='font-semibold bg-[#2563EB] p-2 text-2xl rounded-2xl border-none text-center text-[#FFFFFF] w-2/7'><button>See All Events</button></NavLink>
        </div>
      </section>

      <section>
        <div className='mt-5 text-center h-fit text-[#1F2937] bg-[#DAC9F1] p-10'>
          <h1 className='text-4xl mb-10'>What This Platform Does</h1>
          <div className='flex flex-row gap-5 p-5'>
            <div className='p-5 bg-[#F3F4F6] w-1/3 h-fit rounded-2xl'>
              <div>
                <img src="/pencil-solid.png" alt="Easy Resistration" className='m-auto h-20 w-20' /></div>
              <hr />
              <div>
                <h2 className='text-xl mt-5'>Easy Resistration</h2>
                <h3 className='text-2xl mt-5'>Quick form to reserve seats</h3>
              </div>
            </div>

            <div className='p-5 bg-[#F3F4F6] w-1/3 h-fit rounded-2xl'>
              <div>
                <img src="/baseline-email.png" alt="Easy Resistration" className='m-auto h-20 w-20' /></div>
              <hr />
              <div>
                <h2 className='text-xl mt-5'>Email Confirmation</h2>
                <h3 className='text-2xl mt-5'>Get instant confirmation after registering</h3>
              </div>
            </div>

            <div className='p-5 bg-[#F3F4F6] w-1/3 h-fit rounded-2xl'>
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

      <section className='p-20 bg-[#F3F4F6] mb-1'>
        <div className='flex flex-col gap-5'>
          <h1 className='text-center text-4xl font-semibold mb-5'>Frequently Asked Questions</h1>
          <div>
            <h2 className='text-2xl font-semibold'>1. How do I register for an event?</h2>
            <p className='ml-5 text-xl font-medium'>Just browse the upcoming events, click on the one you’re interested in, and fill out the registration form. You’ll receive a confirmation email right after.</p>
          </div>
          <div>
            <h2 className='text-2xl font-semibold'>2. Is there a limit to how many seats I can book?</h2>
            <p className='ml-5 text-xl font-medium'>Yes, each event has a fixed number of seats. Once all seats are booked, registration will be closed for that event.</p>
          </div>
          <div>
            <h2 className='text-2xl font-semibold'>3. Will I get an email confirmation after registering?</h2>
            <p className='ml-5 text-xl font-medium'>Absolutely! A confirmation email will be sent instantly to the email ID you provide during registration.</p>
          </div>
          <div>
            <h2 className='text-2xl font-semibold'>4. Can I cancel or change my registration?</h2>
            <p className='ml-5 text-xl font-medium'>Currently, this version does not support editing or canceling registrations. Please double-check your details before submitting.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home