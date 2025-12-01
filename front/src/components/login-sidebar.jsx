"use client"

import { useNavigate } from "react-router-dom"


export default function LoginSidebar() {
 const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
       <div className="logo-container">
            <img src="/logo2.svg" alt="Logo" style={{ width: "auto", height: "100px" }} />
        </div>

        
        <h1>Welcome back! We're glad to see you again</h1>
        <div className="login-section">
          <p className="login-label">I don't have an account</p>
          <button className="login-button" onClick={() => navigate("/signUp")}>
            <span>→</span>
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}
