import React from 'react'
import Nav from '../nav'
import Footer from '../footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <Nav />
    <Outlet />
    <Footer />
    </>
  )
}

export default Layout