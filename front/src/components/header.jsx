"use client"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { useEffect } from 'react';

export default function Header({ sections = [], activeSection = "", handleNavClick = null }) {
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // Already on home page, scroll to home section
      const targetElement = document.getElementById('home');
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Account for fixed header height
          behavior: 'smooth'
        });
      }
    } else {
      // Navigate to home page, then scroll after navigation
      navigate("/");
      // Use setTimeout to ensure the page has loaded before scrolling
      setTimeout(() => {
        const targetElement = document.getElementById('home');
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  const defaultSections = ["home", "about", "missions", "organizations", "contact"];
  const displaySections = sections && sections.length > 0 ? sections : defaultSections;

  return (
    <nav className="navbar" style={{
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease'
    }}>
      {/* logo */}
      <Link to="/">
        <img src="/logo1.svg" alt="Logo" style={{ width: "auto", height: "80px", cursor: "pointer" }} />
      </Link>

      {/* menu */}
      <ul className="nav-menu">
        {displaySections.map((section) => (
          <li key={section}>
            {section === "home" ? (
              <a
                href="#home"
                onClick={handleHomeClick}
                className={`nav-link ${activeSection === section ? "active" : ""}`}
                style={{
                  color: activeSection === section ? '#3d8b85' : '#1a1a1a',
                  fontWeight: 600,
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#3d8b85';
                  e.target.style.backgroundColor = 'rgba(61, 139, 133, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = activeSection === section ? '#3d8b85' : '#1a1a1a';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ) : section === "missions" ? (
              <Link
                to="/missions"
                className={`nav-link ${activeSection === section ? "active" : ""}`}
                style={{
                  color: activeSection === section ? '#3d8b85' : '#1a1a1a',
                  fontWeight: 600,
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#3d8b85';
                  e.target.style.backgroundColor = 'rgba(61, 139, 133, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = activeSection === section ? '#3d8b85' : '#1a1a1a';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ) : section === "organizations" ? (
              <Link
                to="/orgpage"
                className={`nav-link ${activeSection === section ? "active" : ""}`}
                style={{
                  color: activeSection === section ? '#3d8b85' : '#1a1a1a',
                  fontWeight: 600,
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#3d8b85';
                  e.target.style.backgroundColor = 'rgba(61, 139, 133, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = activeSection === section ? '#3d8b85' : '#1a1a1a';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ) : handleNavClick ? (
              <button
                className={`nav-link ${activeSection === section ? "active" : ""}`}
                onClick={() => handleSectionClick(section)}
                style={{
                  color: activeSection === section ? '#3d8b85' : '#1a1a1a',
                  fontWeight: 600,
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 'inherit'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#3d8b85';
                  e.target.style.backgroundColor = 'rgba(61, 139, 133, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = activeSection === section ? '#3d8b85' : '#1a1a1a';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ) : section === "contact" ? (
              <a
                href="#contact"
                className={`nav-link ${activeSection === section ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  const targetElement = document.getElementById('contact');
                  if (targetElement) {
                    window.scrollTo({
                      top: targetElement.offsetTop - 100, // Account for fixed header height
                      behavior: 'smooth'
                    });
                  }
                }}
                style={{
                  color: activeSection === section ? '#3d8b85' : '#1a1a1a',
                  fontWeight: 600,
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#3d8b85';
                  e.target.style.backgroundColor = 'rgba(61, 139, 133, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = activeSection === section ? '#3d8b85' : '#1a1a1a';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ) : (
              <a
                href={`#${section}`}
                className={`nav-link ${activeSection === section ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionClick(section);
                }}
                style={{
                  color: activeSection === section ? '#3d8b85' : '#1a1a1a',
                  fontWeight: 600,
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#3d8b85';
                  e.target.style.backgroundColor = 'rgba(61, 139, 133, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = activeSection === section ? '#3d8b85' : '#1a1a1a';
                  e.target.style.backgroundColor = 'transparent';
                }}
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
