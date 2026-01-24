"use client"
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { useNavigate, useLocation } from "react-router-dom";
import { FiGrid } from "react-icons/fi"; // Simple dashboard icon
import { useEffect, useState } from "react";
import { authAPI, API_BASE_URL } from "../utils/api";

export default function NavbarVisitor({ sections, activeSection, handleNavClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [profilePic, setProfilePic] = useState("/origo.png");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
      fetchProfilePic();
    }

    const handleUpdate = () => fetchProfilePic();
    window.addEventListener("profileUpdate", handleUpdate);
    return () => window.removeEventListener("profileUpdate", handleUpdate);
  }, []);

  const fetchProfilePic = async () => {
    try {
      const profile = await authAPI.getProfile();
      if (profile.organization?.logo) {
        setProfilePic(`${API_BASE_URL}${profile.organization.logo}`);
      } else if (profile.volunteer?.photo) {
        setProfilePic(`${API_BASE_URL}${profile.volunteer.photo}`);
      } else {
        setProfilePic(profile.role === "ORGANIZATION" ? "/origo.png" : "/vol1.png");
      }
    } catch (err) {
      console.error("Failed to fetch profile pic in navbar", err);
    }
  };

  const handleDashboardClick = () => {
    // Roles are typically "VOLUNTEER" or "ORGANIZATION" (or lowercase)
    const normalizedRole = userRole ? userRole.toUpperCase() : "";

    // Check local storage again just in case state is stale
    const currentRole = localStorage.getItem("role") ? localStorage.getItem("role").toUpperCase() : normalizedRole;

    console.log("Navigating to dashboard with role:", currentRole);

    if (currentRole === "ORGANIZATION") {
      navigate("/orgdashboard");
    } else {
      navigate("/voldashboard");
    }
  };

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



        {/* Auth Buttons or Dashboard Icon */}
        <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {isAuthenticated ? (
            <>
              <button
                className="dashboard-btn"
                style={{ background: "none", border: "none", cursor: "pointer", color: "#347362", display: "flex", alignItems: "center" }}
                onClick={handleDashboardClick}
                title="Go to Dashboard"
              >
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "2px solid #347362" }}>
                  <img src={profilePic} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.onerror = null; e.target.src = userRole === "ORGANIZATION" ? "/origo.png" : "/vol1.png" }} />
                </div>
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
                style={{
                  padding: "5px 10px",
                  fontSize: "0.8rem",
                  borderRadius: "5px",
                  border: "1px solid #dba1a1",
                  background: "#fff0f0",
                  color: "#c53030",
                  cursor: "pointer"
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </li>
      </ul>
    </nav >
  );
}