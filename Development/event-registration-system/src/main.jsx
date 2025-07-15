import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Events from './pages/Events';
import './components/styles/index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/HOC/layout';
import AdminLayout from './components/HOC/AdminLayout';
import WrongUrl from './components/HOC/WrongUrl';
import EventDetails from './pages/eventDetails';
import ResisterEvent from './pages/ResisterEvent';
import AdminLog from './pages/AdminLog';
import AdminDashboard from './pages/AdminDashboard';
import AddEvent from './pages/AddEvent';
import Resistrant from './pages/Resistrant';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,

    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/Events',
        element: <Events />
      },
      {
        path: '/:id',
        element: <WrongUrl />
      },
      {
        path: '/Event-Details/:id',
        element: <EventDetails />
      },
      {
        path: '/Resister-Event/:id',
        element: <ResisterEvent />
      }
    ]
  },


  {
  path: '/Admin-Login',
  element: <AdminLayout />,
  children: [
    {
      path: '', // ✅ this will render at /Dashobard/AdminLogin
      element: <AdminLog />
    },
    {
      path: 'Dashboard', // ✅ this will render at /Dashobard
      element: <AdminDashboard />
    },
    {
      path : '/Admin-Login/Dashboard/Add-Event',
      element : <AddEvent />
    },
    {
      path : '/Admin-Login/Dashboard/Resistrant',
      element : <Resistrant />
    }
  ]
}

])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);