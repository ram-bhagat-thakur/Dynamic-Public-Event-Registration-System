import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Events from './pages/Events';
import './components/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
    {/* <Events /> */}
  </React.StrictMode>
);