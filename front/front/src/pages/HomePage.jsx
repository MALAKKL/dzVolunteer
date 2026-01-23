"use client"
import { FaFacebookF, FaInstagram, FaMobileAlt } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

import NavbarVisitor from "../components/navBarVisitor";
import NavbarUser from "../components/navBarUser";
import "../styles/homePage.css";
import { FaMapMarkerAlt, FaEnvelope, FaClock, FaPhone } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Counter from "../components/Counter";
import { useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const sectionRefs = useRef({})
  const Navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const [missions, setMissions] = useState([])
  const [missionsLoading, setMissionsLoading] = useState(true)
  const [missionsError, setMissionsError] = useState(null)

  const sections = useMemo(() => ["home", "about", "missions", "organizations", "contact"], [])

  // Handle hash navigation when coming from other pages
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && sectionRefs.current[hash]) {
      setTimeout(() => {
        sectionRefs.current[hash].scrollIntoView({ behavior: "smooth" });
        setActiveSection(hash);
      }, 100);
    }
  }, [location]);

  // Intersection observer for scroll detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach((section) => {
      const element = sectionRefs.current[section]
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [sections])

  // Fetch missions from backend
  useEffect(() => {
    const fetchMissions = async () => {
      try {
        setMissionsLoading(true)
        const response = await fetch('http://localhost:5000/api/missions')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setMissions(data)
        setMissionsError(null)
      } catch (error) {
        console.error('Error fetching missions:', error)
        setMissionsError(error.message)
        setMissions([
          {
            id: 1,
            title: "Medical",
            description: "Support our health-care community",
            image: "/sante.jpg"
          },
          {
            id: 2,
            title: "Nature",
            description: "Protect our environment together",
            image: "/nature.jpg"
          },
          {
            id: 3,
            title: "Social",
            description: "Build stronger communities",
            image: "/social.jpg"
          }
        ])
      } finally {
        setMissionsLoading(false)
      }
    }

    fetchMissions()
  }, [])

  const handleNavClick = (section) => {
    const element = sectionRefs.current[section]
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(section)
    }
  }

  return (
    <div>
      {user ? (
        <NavbarUser sections={sections} activeSection={activeSection} handleNavClick={handleNavClick} />
      ) : (
        <NavbarVisitor sections={sections} activeSection={activeSection} handleNavClick={handleNavClick} />
      )}

      {/* Hero Section */}
      <section id="home" ref={(el) => (sectionRefs.current.home = el)} className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Make a Difference in Your Community
          </h1>
          <p className="hero-subtitle">
            Join thousands of volunteers making a positive impact across Algeria. Find missions that match your skills and passion.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => Navigate("/missions")}>
              Explore Missions
            </button>
            <button className="btn-secondary" onClick={() => Navigate("/organizations")}>
              View Organizations
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/hero-image.jpg" alt="Volunteers helping community" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={(el) => (sectionRefs.current.about = el)} className="about-section">
        <div className="container">
          <div className="about-content">
            <h2>About DZ Volunteer</h2>
            <p>
              DZ Volunteer is a platform connecting passionate individuals with meaningful volunteer opportunities across Algeria. Whether you're a student looking to gain experience, a professional wanting to give back, or someone seeking to make new connections, we have the perfect mission for you.
            </p>
            <div className="stats">
              <div className="stat">
                <Counter end={5000} suffix="+" />
                <span>Active Volunteers</span>
              </div>
              <div className="stat">
                <Counter end={200} suffix="+" />
                <span>Partner Organizations</span>
              </div>
              <div className="stat">
                <Counter end={1000} suffix="+" />
                <span>Missions Completed</span>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src="/about-image.jpg" alt="About DZ Volunteer" />
          </div>
        </div>
      </section>

      {/* Missions Section */}
      <section id="missions" ref={(el) => (sectionRefs.current.missions = el)} className="missions-section">
        <div className="container">
          <h2>Featured Missions</h2>
          <p>Discover volunteer opportunities that align with your interests and skills.</p>
          {missionsLoading ? (
            <div className="loading">Loading missions...</div>
          ) : missionsError ? (
            <div className="error">Error loading missions: {missionsError}</div>
          ) : (
            <div className="missions-grid">
              {missions.slice(0, 3).map((mission) => (
                <div key={mission.id} className="mission-card">
                  <img src={mission.image || "/default-mission.jpg"} alt={mission.title} />
                  <h3>{mission.title}</h3>
                  <p>{mission.description}</p>
                  <button className="btn-outline" onClick={() => Navigate(`/missioncard/${mission.id}`)}>
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="view-all">
            <button className="btn-primary" onClick={() => Navigate("/missions")}>
              View All Missions
            </button>
          </div>
        </div>
      </section>

      {/* Organizations Section */}
      <section id="organizations" ref={(el) => (sectionRefs.current.organizations = el)} className="organizations-section">
        <div className="container">
          <h2>Partner Organizations</h2>
          <p>Work with established organizations making a real difference in communities.</p>
          <div className="organizations-grid">
            <div className="organization-card">
              <img src="/org1.jpg" alt="Red Crescent" />
              <h3>Red Crescent</h3>
              <p>Providing humanitarian aid and disaster relief across Algeria.</p>
            </div>
            <div className="organization-card">
              <img src="/org2.jpg" alt="Green Future" />
              <h3>Green Future</h3>
              <p>Environmental conservation and sustainability initiatives.</p>
            </div>
            <div className="organization-card">
              <img src="/org3.jpg" alt="Education for All" />
              <h3>Education for All</h3>
              <p>Improving access to quality education for all Algerians.</p>
            </div>
          </div>
          <div className="view-all">
            <button className="btn-primary" onClick={() => Navigate("/organizations")}>
              View All Organizations
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={(el) => (sectionRefs.current.contact = el)} className="contact-section">
        <div className="container">
          <h2>Contact Us</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>Algiers, Algeria</span>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <span>info@dzvolunteer.dz</span>
              </div>
              <div className="contact-item">
                <FaPhone />
                <span>+213 XX XX XX XX</span>
              </div>
              <div className="contact-item">
                <FaClock />
                <span>Mon - Fri: 9AM - 6PM</span>
              </div>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">
                <FaFacebookF />
              </a>
              <a href="#" className="social-link">
                <SiX />
              </a>
              <a href="#" className="social-link">
                <FaInstagram />
              </a>
              <a href="#" className="social-link">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}