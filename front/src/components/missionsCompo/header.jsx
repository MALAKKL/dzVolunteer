"use client"
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function Header({ sections = [], activeSection = "", handleNavClick = null }) {
  const handleSectionClick = (section) => {
    if (handleNavClick) {
      handleNavClick(section);
    }
    
    // Scroll to the section if it exists on the current page
    if (section !== "missions" && section !== "home") {
      const targetElement = document.getElementById(section);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Account for fixed header height
          behavior: 'smooth'
        });
      }
    }
  };
  const defaultSections = ["home", "about", "missions", "organizations", "contact"];
  const displaySections = sections && sections.length > 0 ? sections : defaultSections;

  return (
    <nav className="navbar missions-navbar missions-navbar-fixed">
      {/* logo */}
      <Link to="/">
        <img src="/logo1.svg" alt="Logo" style={{ width: "auto", height: "80px", cursor: "pointer" }} />
      </Link>

      {/* menu */}
      <ul className="nav-menu">
        {displaySections.map((section) => (
          <li key={section}>
            {section === "home" ? (
              <Link
                to="/"
                className={`nav-link ${activeSection === section ? "active" : ""}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ) : section === "missions" ? (
              <Link
                to="/missions"
                className={`nav-link ${activeSection === section ? "active" : ""}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ) : section === "about" ? (
              <Link
                to="/"
                className={`nav-link ${activeSection === section ? "active" : ""}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ) : handleNavClick ? (
              <button
                className={`nav-link ${activeSection === section ? "active" : ""}`}
                onClick={() => handleSectionClick(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ) : section === "contact" ? (
              <a
                href="#footer"
                onClick={(e) => {
                  e.preventDefault();
                  const targetElement = document.getElementById('footer');
                  if (targetElement) {
                    // Scroll to the footer (end of the page)
                    window.scrollTo({
                      top: targetElement.offsetTop - 100, // Account for fixed header height
                      behavior: 'smooth'
                    });
                  } else {
                    // Fallback: scroll to bottom of page
                    window.scrollTo({
                      top: document.documentElement.scrollHeight,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`nav-link ${activeSection === section ? "active" : ""}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ) : (
              <a
                href={`#${section}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionClick(section);
                }}
                className={`nav-link ${activeSection === section ? "active" : ""}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
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
