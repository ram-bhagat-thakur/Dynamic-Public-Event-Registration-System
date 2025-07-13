import React from 'react'
import Footer from '../footer'
import { Outlet } from 'react-router-dom'
import AdminNav from '../AdminNav'

function AdminLayout() {
  return (
    <>
    <AdminNav />
    <Outlet />
    <Footer />
    </>
  )
}

export default AdminLayout