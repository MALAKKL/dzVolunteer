import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import './styles/orgdash.css'
import App from './App.jsx'
import './index.css'


/* export const metadata = {
  title: "DZ Volunteer - Sign Up",
  description: "Join DZ Volunteers and make a difference in your community",
  viewport: "width=device-width, initial-scale=1",
} */




const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
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
