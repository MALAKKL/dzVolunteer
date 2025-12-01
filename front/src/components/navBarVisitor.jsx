"use client"
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function NavbarVisitor({ sections, activeSection, handleNavClick }) {
  return (
    <nav className="navbar">
      {/* logo */}
      <img src="/logo1.svg" alt="Logo" style={{ width: "auto", height: "80px" }} />

      {/* ;enu */}
      <ul className="nav-menu">
        {sections.map((section) => (
          <li key={section}>
            <button
              className={`nav-link ${activeSection === section ? "active" : ""}`}
              onClick={() => handleNavClick(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          </li>
        ))}

        {/* login / signup */}
        <li>
          <button className="login-btn" style={{ padding: "10px",marginRight:"5px" }}>Login</button>
          <button className="signup-btn" style={{ padding: "15px" }}>Sign up</button>
        </li>
      </ul>
    </nav>
  );
}
