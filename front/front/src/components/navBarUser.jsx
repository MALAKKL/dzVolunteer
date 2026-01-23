"use client"
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaWhatsapp, FaUser } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function NavbarUser({ sections, activeSection, handleNavClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  const handleSectionClick = (section) => {
    if (isHomePage) {
      handleNavClick(section);
    } else {
      navigate(`/#${section}`);
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleDashboardClick = () => {
    if (user.role === 'organization') {
      navigate('/orgdashboard');
    } else {
      navigate('/voldashboard');
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

        {/* user icon for dashboard */}
        <li>
          <button 
            className="user-icon-btn" 
            style={{ padding: "10px", marginRight: "5px", background: "none", border: "none", cursor: "pointer" }}
            onClick={handleDashboardClick}
            title="Go to Dashboard"
          >
            <FaUser size={24} />
          </button>
        </li>
      </ul>
    </nav>
  );
}