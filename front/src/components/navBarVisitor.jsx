"use client"
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function NavbarVisitor({ sections, activeSection, handleNavClick }) {
  return (
    <nav className="navbar">
      {/* logo */}
      <Link to="/">
        <img src="/logo1.svg" alt="Logo" style={{ width: "auto", height: "80px", cursor: "pointer" }} />
      </Link>

      {/* menu */}
      <ul className="nav-menu">
        {sections.map((section) => (
          <li key={section}>
            {section === "missions" ? (
              <Link
                to="/missions"
                className={`nav-link ${activeSection === section ? "active" : ""}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ) : (
              <button
                className={`nav-link ${activeSection === section ? "active" : ""}`}
                onClick={() => handleNavClick(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            )}
          </li>
        ))}

        {/* login / signup */}
        <li className="nav-auth-buttons">
          <Link to="/login" className="login-btn-link">
            <span className="btn-text">Login</span>
            <span className="btn-icon">→</span>
          </Link>
          <Link to="/signup" className="signup-btn-link">
            <span className="btn-text">Sign up</span>
            <span className="btn-shine"></span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
