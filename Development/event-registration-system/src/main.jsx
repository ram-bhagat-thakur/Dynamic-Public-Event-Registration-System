import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Events from './pages/Events';
import './components/styles/index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/HOC/layout';
import WrongUrl from './components/HOC/WrongUrl';
import EventDetails from './pages/eventDetails';

const router=createBrowserRouter([
  {
    path : '/',
    element : <Layout />,

    children:[{
      path : '/',
      element : <Home />
    },
    {
    path : '/Events',
    element : <Events />
    },
    {
      path : '/:id',
      element : <WrongUrl />
    },
    {
      path : '/Event-Details',
      element : <EventDetails />
    }
  ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);