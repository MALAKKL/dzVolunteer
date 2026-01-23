"use client"
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavbarVisitor({ sections, activeSection, handleNavClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  const handleSectionClick = (section) => {
    // If we're on the home page, use the scroll behavior
    if (isHomePage) {
      handleNavClick(section);
    } else {
      // If we're on another page, navigate to home with the section hash
      navigate(`/#${section}`);
      
      // After navigation, scroll to the section
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <nav className="navbar">
      {/* logo */}
      <img 
        src="/logo1.svg" 
        alt="Logo" 
        style={{ width: "auto", height: "80px", cursor: "pointer" }} 
        onClick={() => navigate("/")}
      />

      {/* menu */}
      <ul className="nav-menu">
        {sections.map((section) => (
          <li key={section}>
            <button
              className={`nav-link ${activeSection === section ? "active" : ""}`}
              onClick={() => handleSectionClick(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          </li>
        ))}

        {/* login / signup */}
        <li>
          <button 
            className="login-btn" 
            style={{ padding: "10px", marginRight: "5px" }}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button 
            className="signup-btn" 
            style={{ padding: "15px" }}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </li>
      </ul>
    </nav>
  );
}