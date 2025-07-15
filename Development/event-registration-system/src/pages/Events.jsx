import React from 'react'
import Nav from '../components/nav'
import Card from '../components/Card'
import Footer from '../components/footer'
import TechData from '../components/DataComponents/TechData'
import CultureData from '../components/DataComponents/CultureData'
import SportsData from '../components/DataComponents/SportsData'




function Events() {
  return (
    <>
      <div className='fixed top-0 right-0 left-0 z-10'>
        <Nav />
      </div>

      {/* <section className=' fixed top-2 ml-[20%] z-20'>
        <div className='flex flex-row gap-5'>
          <div>
            <input type="text" placeholder='Search Events...' className='outline-none text-xl p-2 border-1 rounded-xl rounded-r-none' />
            <button className='text-xl bg-[#2563EB] rounded-r-xl p-2 cursor-pointer text-[#F3F4F6]'>Search</button>
          </div>
          <select className="border p-3 rounded-xl cursor-pointer outline-none">
            <option value="">All Categories</option>
            <option value="tech">Tech</option>
            <option value="cultural">Cultural</option>
            <option value="sports">Sports</option>
          </select>
        </div>
      </section> */}


      <section className='mt-15 bg-[#F3F4F6]'>
        <div className="pl-5 pr-5 text-center py-15 pb-30 bg-gradient-to-r from-indigo-100 to-purple-100">
          <h1 className="text-7xl font-bold text-indigo-900">Explore Events</h1>
          {/* Line */}
          <div className="w-50 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto my-8 rounded-full"></div>
          <p className="w-200 m-auto text-xl text-indigo-700 mt-2">
            Browse a wide range of exciting events including hands-on workshops, cutting-edge tech talks, vibrant cultural festivals, and more—all curated to match your interests and happening right around you.
          </p>

          <div className='flex justify-center mt-10'>
            <div className='flex flex-row gap-5'>
              <div>
                <input type="search" placeholder='Search Events...' className='outline-none text-xl p-2 border-1 rounded-xl rounded-r-none' />
                <button className='text-xl bg-[#2563EB] rounded-r-xl p-2 cursor-pointer text-[#F3F4F6]'>Search</button>
              </div>
              <select className="border p-3 rounded-xl cursor-pointer outline-none">
                <option value="">All Categories</option>
                <option value="tech">Tech</option>
                <option value="cultural">Cultural</option>
                <option value="sports">Sports</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className='mt-20'>
        <div>
          <hr />
          <h1 className='text-3xl text-center mt-5 mb-5 font-bold'>💻 Tech Eventt</h1>
          <hr />
          {TechData.map(event => (
            <div key={event.id} className='flex flex-row gap-10 justify-center flex-wrap mb-10 mt-12'>


              <Card id={event.id} title={event.title} date={event.date} location={event.location} description={event.description} leftSeate={event.leftSeate} image={event.image} />
            </div>
          ))}

        </div>

        <div>
          <hr />
          <h1 className='text-3xl text-center mt-5 mb-5 font-bold'>🎭 Cultural Event</h1>
          <hr />
          {CultureData.map(event => (
            <div key={event.id} className='flex flex-row gap-10 justify-center flex-wrap mb-10 mt-12'>


              <Card id={event.id} title={event.title} date={event.date} location={event.location} description={event.description} leftSeate={event.leftSeate} image={event.image} />
            </div>
          ))}
        </div>

        <div>
          <hr />
          <h1 className='text-3xl text-center mt-5 mb-5 font-bold'>🏅 Sports Events</h1>
          <hr />
          {SportsData.map(event => (
            <div key={event.id} className='flex flex-row gap-10 justify-center flex-wrap mb-10 mt-12'>


              <Card id={event.id} title={event.title} date={event.date} location={event.location} description={event.description} leftSeate={event.leftSeate} image={event.image} />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Events