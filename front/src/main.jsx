import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'

const GOOGLE_CLIENT_ID = '451493476296-cragrmoha3tc789ppif9r22ec4pp74ms.apps.googleusercontent.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
) 
