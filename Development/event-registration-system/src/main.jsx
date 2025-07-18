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
import ProtectedRoute from './components/HOC/ProtectedRoute';
import EditEvent from './pages/EditEvent';
import Welcome from './pages/Welcome'; 
import AdminRegister from './pages/AdminRegister';
import Contact from './pages/Contact';
import AdminMessages from './pages/AdminMessages';

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
      },
      {
        path:'/welcome',
         element:<Welcome />
      },
      {
        path: 'Contact',
        element : <Contact />
      }

    ]
  },

  {
    path: '/Admin-Login',
    element: <AdminLayout />,
    children: [
      {
        path: '', // ✅ renders at /Admin-Login
        element: <AdminLog />
      },
      {
        path: 'Dashboard',
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: 'Dashboard/Add-Event',
        element: (
          <ProtectedRoute>
            <AddEvent />
          </ProtectedRoute>
        )
      },
      {
        path: 'Dashboard/Resistrant',
        element: (
          <ProtectedRoute>
            <Resistrant />
          </ProtectedRoute>
        )
      },
      {
        path: '/Admin-Login/Dashboard/Edit-Event/:id',
        element: (
          <ProtectedRoute>
            <EditEvent />
          </ProtectedRoute>
        )
      },
      {
        path:'/Admin-Login/Dashboard/Resistrant/:eventId',
        
        element:(
        <ProtectedRoute>
          <Resistrant />
        </ProtectedRoute>
        )
      },
      {
        path:'/Admin-Login/Dashboard/Messages',
        
        element:(
        <ProtectedRoute>
          <AdminMessages />
        </ProtectedRoute>
        )
      },
      {
        path: 'Events',
        element: <Events />
      },
      {
        path : 'Admin-Register',
        element : <AdminRegister />
      }
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);