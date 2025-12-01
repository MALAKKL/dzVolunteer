import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// hadou ta3 routing



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


/* export const metadata = {
  title: "DZ Volunteer - Sign Up",
  description: "Join DZ Volunteers and make a difference in your community",
  viewport: "width=device-width, initial-scale=1",
} */


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
) 



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
// to enable routing





export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 
