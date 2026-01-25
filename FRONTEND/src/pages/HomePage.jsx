"use client"
import { FaFacebookF, FaInstagram, FaMobileAlt } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

import NavbarVisitor from "../components/navBarVisitor";
import "../styles/homePage.css";
import { FaMapMarkerAlt, FaEnvelope, FaClock, FaPhone } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Counter from "../components/Counter";
import { useMemo } from "react";
import { missionsAPI } from "../utils/api";
import { getImageUrl } from "../utils/imageUtils";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const sectionRefs = useRef({})
  const Navigate = useNavigate();
  const location = useLocation();

  const [missions, setMissions] = useState([])
  const [missionsLoading, setMissionsLoading] = useState(true)
  const [missionsError, setMissionsError] = useState(null)

  const [topOrganizations, setTopOrganizations] = useState([]);
  const [topVolunteers, setTopVolunteers] = useState([]);

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
  // Fetch missions, organizations and top volunteers
  useEffect(() => {
    const fetchData = async () => {
      const { organizationsAPI, volunteersAPI } = await import("../utils/api");

      // Fetch missions
      try {
        setMissionsLoading(true)
        const data = await missionsAPI.getAllMissions();
        if (data && Array.isArray(data)) {
          setMissions(data.slice(0, 3));
        }
        setMissionsError(null)
      } catch (error) {
        console.error('Error fetching missions:', error)
        setMissionsError(error.message)
      } finally {
        setMissionsLoading(false)
      }

      // Fetch organizations
      try {
        const orgsResponse = await organizationsAPI.getAllOrganizations("", 3, 0);
        if (orgsResponse.data) {
          setTopOrganizations(orgsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching orgs:', error);
      }

      // Fetch top volunteers
      try {
        const volsResponse = await volunteersAPI.getTopVolunteers();
        if (volsResponse) {
          setTopVolunteers(volsResponse);
        }
      } catch (error) {
        console.error('Error fetching top vols:', error);
      }
    }

    fetchData()
  }, [])

  const handleNavClick = (section) => {
    const element = sectionRefs.current[section]
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleMissionClick = (missionId) => {
    Navigate(`/volunteer/mission/${missionId}`);
  }

  return (
    <div className="app">
      <NavbarVisitor
        sections={sections}
        activeSection={activeSection}
        handleNavClick={handleNavClick}
      />

      <div className="app-container">
        {/* home section */}
        <section id="home" ref={(el) => (sectionRefs.current["home"] = el)} className="section home-section">
          <div className="home-content">
            <h1>Turn Your Time Into Hope</h1>
            <p>Find missions, support communities, and help build a better <h3 style={{ color: "#EF8451", fontSize: "30px" }}>Algeria</h3> one action at a time.</p>
            <div className="social-icons">
              <a href="https://www.facebook.com/profile.php?id=61586081911948" className="social-icon">
                <FaFacebookF size={20} />
              </a>
              <a href="mailto:dzvolunteer970@gmail.com" className="social-icon" aria-label="Send us an email">
                <MdEmail size={20} />
              </a>
              <a href="https://instagram.com" className="social-icon">
                <FaInstagram size={20} />
              </a>
            </div>
            {!localStorage.getItem("token") && (
              <button className="join-btn" onClick={() => Navigate("/signup")}>Join us</button>
            )}
          </div>
          <div className="home-image">
            <img src="/vol1.png" alt="Volunteer" />
          </div>
        </section>

        {/* about section */}
        <section id="about" ref={(el) => (sectionRefs.current["about"] = el)} className="section about-section">
          <div className="about-container">
            <div className="about-image">
              <img src="/vol2.png" alt="About Us" />
            </div>
            <div className="about-content">
              <h2>About Us</h2>
              <p>
                At DZ Volunteer, we believe that every small action can create a big impact. We connect volunteers and
                turn compassion into action.
              </p>
              <p>
                Our platform makes it safe, accessible, and rewarding for anyone to become a volunteer. By connecting
                individuals with organizations that need them, we create meaningful interactions across Algeria.
              </p>
              <p>Together, we inspire positive change and empower citizens to take action in their communities.</p>
            </div>
          </div>
        </section>

        {/* missions section */}
        <section id="missions" ref={(el) => (sectionRefs.current["missions"] = el)} className="section missions-section">
          <div className="missions-header">
            <h2>Current Missions</h2>
            <p>Make a difference today, one step at a time</p>
          </div>

          {missionsLoading && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Loading missions...</p>
            </div>
          )}

          {missionsError && !missionsLoading && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#EF8451' }}>
              <p>Unable to load missions. Showing cached data.</p>
            </div>
          )}

          {!missionsLoading && (
            <>
              <div className="missions-grid">
                {missions.map((mission) => (
                  <div className="mission-card" key={mission.id}>
                    <div className="mission-image">
                      <img
                        src={getImageUrl(mission.image)}
                        alt={mission.title}
                        onError={(e) => {
                          e.target.src = '/placeholder.jpg'
                        }}
                      />
                    </div>
                    <div className="mission-content">
                      <h3>{mission.title}</h3>
                      <p>{mission.description}</p>
                      <button
                        className="mission-btn"
                        onClick={() => handleMissionClick(mission.id)}
                      >
                        See more
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="missions-footer">
                <button className="view-all-btn" onClick={() => Navigate("/missions")}>
                  Search for missions
                </button>
              </div>
            </>
          )}
        </section>

        {/* organizations section */}
        <section id="organizations" ref={(el) => (sectionRefs.current["organizations"] = el)} className="section organizations-section">
          <div className="organizations-header">
            <h2>Top Organizations</h2>
            <p>Explore the top organizations turning passion into meaningful change</p>
          </div>

          <div className="organizations-grid">
            {topOrganizations.map((org, index) => (
              <div className="org-card" key={org.id || index}>
                <img
                  src={getImageUrl(org.logo, "/green.jpg")}
                  alt={org.name}
                  className="org-img"
                  onError={(e) => e.target.src = "/green.jpg"}
                />
                <h3>{org.fieldOfActivity || "Organization"}</h3>
                <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{org.name}</p>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>{org.description ? (org.description.substring(0, 100) + "...") : "No description available."}</p>
              </div>
            ))}
          </div>

          <div className="missions-footer">
            <button className="view-all-btn" onClick={() => Navigate("/organizations")}>
              see all organizations
            </button>
          </div>

          {/* volunteers section */}
          <div className="volunteers-section">
            <h3>Our Most Inspiring Volunteers</h3>
            <p style={{ marginBottom: "2rem", opacity: 0.95 }}>
              Highlighting the volunteers whose dedication drives our missions forward
            </p>
            <div className="volunteers-grid">
              {topVolunteers.map((vol, index) => (
                <div className="volunteer" key={vol.id || index}>
                  <div className="volunteer-avatar" style={{ overflow: "hidden" }}>
                    <img
                      src={getImageUrl(vol.photo, "/vol1.png")}
                      alt={`${vol.firstName} ${vol.lastName}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => e.target.src = "/vol1.png"}
                    />
                  </div>
                  <div className="volunteer-name">{vol.firstName} {vol.lastName}</div>
                  <div className="volunteer-hours" style={{ fontSize: "0.8rem", opacity: 0.8 }}>{vol.totalHoursVolunteered} hrs</div>
                </div>
              ))}
            </div>

            <div className="stats">
              <div className="stat">
                <div className="stat-number">+<Counter target={1000} duration={4000} /></div>
                <div className="stat-label">Organizations</div>
              </div>
              <div className="stat">
                <div className="stat-number">+<Counter target={1450} duration={4000} /></div>
                <div className="stat-label">Volunteers</div>
              </div>
              <div className="stat">
                <div className="stat-number">+<Counter target={250} duration={4000} /></div>
                <div className="stat-label">Missions</div>
              </div>
              <div className="stat">
                <div className="stat-number">+<Counter target={560} duration={4000} /></div>
                <div className="stat-label">Completed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section id="contact" ref={(el) => (sectionRefs.current["contact"] = el)} className="section contact-section">
          <div className="contact-header">
            <h2>Be the change you want to see — join us today!</h2>
            <p>Join DZ Volunteers and turn compassion into action</p>
          </div>

          <div className="contact-container">
            <div className="contact-form">
              <h3>Get in touch with us</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="your@email.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" placeholder="Type your message here..."></textarea>
                </div>
                <button type="submit" className="submit-btn">Submit</button>
              </form>
            </div>

            <div className="contact-details">
              <h3>Contact Details</h3>
              <p style={{ color: "black", marginTop: "20px" }}>If you have any questions at all, we're here to help! Our friendly team is ready to assist you and provide the answers you need. Feel free to contact us anytime.</p> <br />
              <div className="detail-item">
                <div className="detail-icon"><FaMapMarkerAlt /></div>
                <div className="detail-content">
                  <h4>Address</h4>
                  <p>Algiers, Algeria</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon"><FaMobileAlt /></div>
                <div className="detail-content">
                  <h4>Mobile</h4>
                  <p>+213 558 10 30 40</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon"><FaEnvelope /></div>
                <div className="detail-content">
                  <h4>Email</h4>
                  <p>info@dzvolunteer.com</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon"><FaClock /></div>
                <div className="detail-content">
                  <h4>Availability</h4>
                  <p>Available 24/7</p>
                </div>
              </div>
            </div>
          </div>

          <div className="footer">
            <p>
              <FaPhone /> +213 558 10 30 40 • <FaEnvelope /> info@dzvolunteer.com
            </p>

            <div className="footer-icons">
              <div className="social-icons">
                <a href="https://www.facebook.com/profile.php?id=61586081911948" className="social-icon">
                  <FaFacebookF size={20} />
                </a>
                <a href="https://linkedin.com" className="social-icon">
                  <MdEmail size={20} />
                </a>
                <a href="https://instagram.com" className="social-icon">
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}