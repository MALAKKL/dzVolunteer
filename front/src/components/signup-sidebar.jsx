import "../App.css"
import { useNavigate } from "react-router-dom";

"use client"

export default function SignupSidebar() {
 const navigate = useNavigate();

  return (
    <div className="sidebar">
         
 <div className="logo-container">
            <img src="/logo2.svg" alt="Logo" style={{ width: "auto", height: "100px" }} />
        </div>

      <div className="sidebar-content">

        <h1>Join DZ Volunteers Today</h1>

        <div className="login-section">
          <p className="login-label">I have already an account</p>
          <button className="login-button" onClick={() => navigate("/login")}>
            Log in
            <svg className="button-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
