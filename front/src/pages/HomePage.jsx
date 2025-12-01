"use client"
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaMobileAlt } from "react-icons/fa";
import { SiX } from "react-icons/si"; // X icon
import { FaWhatsapp } from "react-icons/fa";
import NavbarVisitor from "../components/navBarVisitor";
import "../styles/homePage.css";
import { FaMapMarkerAlt,  FaEnvelope, FaClock, FaPhone } from "react-icons/fa";


import { useEffect, useRef, useState } from "react";

import Counter from "../components/Counter";
import { useMemo } from "react";




export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const sectionRefs = useRef({})

  const sections = useMemo(() => ["home", "about", "missions", "organizations", "contact"], [])

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

  const handleNavClick = (section) => {
    const element = sectionRefs.current[section]
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

 return (
  <div className="app">
    {/* navigation */}
      <NavbarVisitor
        sections={sections}
        activeSection={activeSection}
        handleNavClick={handleNavClick}
      />


      {/* sections container stacked vertically */}
      <div className="app-container">
        {/* home section */}
        <section id="home" ref={(el) => (sectionRefs.current["home"] = el)} className="section home-section">
          <div className="home-content">
            <h1>Turn Your Time Into Hope</h1>
            <p>Find missions, support communities, and help build a better <h3 style={{color:"#EF8451" ,fontSize:"30px"}}>Algeria</h3> one action at a time.</p>
<div className="social-icons">
  <a href="#" className="social-icon">
    <FaWhatsapp  size={20} />
  </a>
  <a href="https://facebook.com" className="social-icon">
    <FaFacebookF size={20} />
  </a>
  <a href="https://linkedin.com" className="social-icon">
    <FaLinkedinIn size={20} />
  </a>
  <a href="https://instagram.com" className="social-icon">
    <FaInstagram size={20} />
  </a>
  <a href="https://x.com" className="social-icon">
    <SiX size={20} />
  </a>
</div>



            <button className="join-btn">Join us</button>
          </div>
          <div className="home-image">
            <img src="/7.png" alt="Volunteer" />
          </div>
        </section>

        {/* about section */}
        <section id="about" ref={(el) => (sectionRefs.current["about"] = el)} className="section about-section">
          <div className="about-container">
            <div className="about-image">
              <img src="/10.png" alt="About Us" />
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
        <section
          id="missions"
          ref={(el) => (sectionRefs.current["missions"] = el)}
          className="section missions-section"
        >
          <div className="missions-header">
            <h2>Current Missions</h2>
            <p>Make a difference today, one step at a time</p>
          </div>
          <div className="missions-grid">
            <div className="mission-card">
              <div className="mission-image">
                <img src="/sante.jpg" alt="Medical Mission" />
              </div>
              <div className="mission-content">
                <h3>Medical</h3>
                <p>Support our health-care community</p>
                <button className="mission-btn">See more</button>
              </div>
            </div>
            <div className="mission-card">
              <div className="mission-image">
                <img src="/nature.jpg" alt="Nature Mission" />
              </div>
              <div className="mission-content">
                <h3>Nature</h3>
                <p>Protect our environment together</p>
                <button className="mission-btn">See more</button>
              </div>
            </div>
            <div className="mission-card">
              <div className="mission-image">
                <img src="/social.jpg" alt="Social Mission" />
              </div>
              <div className="mission-content">
                <h3>Social</h3>
                <p>Build stronger communities</p>
                <button className="mission-btn">See more</button>
              </div>
            </div>
          </div>
        </section>


{/* organizations section */}
<section
  id="organizations"
  ref={(el) => (sectionRefs.current["organizations"] = el)}
  className="section organizations-section"
>
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
                <div className="volunteer-name"> Boudjerda Malak</div>
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

            {/* top volunteers */}
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
            {/* Contact form */}
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
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </form>
            </div>

            {/* contact details */}
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
  <a href="#" className="social-icon">
    <FaWhatsapp  size={20} />
  </a>
  <a href="https://facebook.com" className="social-icon">
    <FaFacebookF size={20} />
  </a>
  <a href="https://linkedin.com" className="social-icon">
    <FaLinkedinIn size={20} />
  </a>
  <a href="https://instagram.com" className="social-icon">
    <FaInstagram size={20} />
  </a>
  <a href="https://x.com" className="social-icon">
    <SiX size={20} />
  </a>
</div>


            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
