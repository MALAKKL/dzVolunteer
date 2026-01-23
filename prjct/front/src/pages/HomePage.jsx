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

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const sectionRefs = useRef({})
  const Navigate = useNavigate();
  const location = useLocation();
  
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
    }
  }

  const handleMissionClick = (missionId) => {
    console.log('Mission clicked:', missionId)
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
            <p>Find missions, support communities, and help build a better <h3 style={{color:"#EF8451", fontSize:"30px"}}>Algeria</h3> one action at a time.</p>
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
            <button className="join-btn" onClick={() => Navigate("/signup")}>Join us</button>
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
                        src={mission.image || '/placeholder.jpg'} 
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
            {[
              {
                type: "Nature",
                name: "Green Algeria",
                description: "  جزائر خضراء باذن الله  ",
                img: "/green.jpg"
              },
              {
                type: "Education",
                name: "Learn Together",
                description: "Promoting literacy and learning opportunities.",
                img: "/learn.jpg"
              },
              {
                type: "Health",
                name: "Health Aid",
                description: "Supporting medical aid and community health programs.",
                img: "/aid.jpeg"
              },
            ].map((org, index) => (
              <div className="org-card" key={index}>
                <img src={org.img} alt={org.name} className="org-img" />
                <h3>{org.type}</h3>
                <p><strong>{org.name}</strong></p>
                <p>{org.description}</p>
                <button className="mission-btn">See more</button>
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
              <div className="volunteer">
                <div className="volunteer-avatar">
                  <img src="/" alt="Grimed Ikram" />
                </div>
                <div className="volunteer-name">Grimed Ikram</div>
              </div>
              <div className="volunteer">
                <div className="volunteer-avatar">
                  <img src="/" alt="Boudjerda Malak" />
                </div>
                <div className="volunteer-name">Boudjerda Malak</div>
              </div>
              <div className="volunteer">
                <div className="volunteer-avatar">
                  <img src="/" alt="Kouda Rania" />
                </div>
                <div className="volunteer-name">Kouda Rania</div>
              </div>
              <div className="volunteer">
                <div className="volunteer-avatar">
                  <img src="/" alt="Boukersi Asma" />
                </div>
                <div className="volunteer-name">Boukersi Asma</div>
              </div>
            </div>

            <div className="stats">
              <div className="stat">
                <div className="stat-number">+<Counter target={1000} duration={4000} /></div>
                <div className="stat-label">Organizations</div>
              </div>
              <div className="stat">
                <div className="stat-number">+<Counter target={1450} duration={4000}/></div>
                <div className="stat-label">Volunteers</div>
              </div>
              <div className="stat">
                <div className="stat-number">+<Counter target={250} duration={4000}/></div>
                <div className="stat-label">Missions</div>
              </div>
              <div className="stat">
                <div className="stat-number">+<Counter target={560} duration={4000}/></div>
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
              <p style={{color:"black", marginTop:"20px"}}>If you have any questions at all, we're here to help! Our friendly team is ready to assist you and provide the answers you need. Feel free to contact us anytime.</p> <br/>
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