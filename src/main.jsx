import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Createtrip from './create-trip/Createtrip.jsx'
import Header from './components/custom/Header.jsx'
import Viewtrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips';

import { Toaster } from 'sonner'

const router=createBrowserRouter([
  {
    path:'/',
    element: <App />
  },{
    path:'/create-trip',
    element: <Createtrip />
  },
  {
    path:'/view-trip/:tripId',
    element:<Viewtrip/>
  },
  {
    path:'/my-trips',
    element:<MyTrips/>
    
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID }>
    <Header />
    <Toaster 
      position="top-center" // Move the toast to the center
      richColors // Enables more vibrant color schemes
      toastOptions={{
        style: {
          backgroundColor: '#4caf50', // Set a custom background color
          color: '#ffffff',          // Set text color
          fontSize: '16px',          // Adjust font size
          borderRadius: '8px'        // Add border radius for a polished look
        }
      }}
    />
   <RouterProvider router={router} />
      </GoogleOAuthProvider>;
    
  </React.StrictMode>,
)
