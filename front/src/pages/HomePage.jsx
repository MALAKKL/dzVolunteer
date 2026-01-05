"use client"

import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
  FaMobileAlt
} from "react-icons/fa"
import { SiX } from "react-icons/si"

import Header from "../components/header"
import Footer from "../components/Footer"
import Counter from "../components/Counter"

import "../styles/homePage.css"

export default function Page() {
  return (
    <div className="app">
      {/* Header */}
      <Header />

      <div className="app-container">

        {/* Home Section */}
        <section id="home" className="section home-section">
          <div className="home-content">
            <h1>Turn Your Time Into Hope</h1>
            <p>
              Find missions, support communities, and help build a better{" "}
              <span style={{ color: "#EF8451", fontSize: "30px", fontWeight: "bold" }}>
                Algeria
              </span>
              {" "}one action at a time.
            </p>

            <div className="social-icons">
              <a href="#" className="social-icon"><FaWhatsapp size={20} /></a>
              <a href="https://facebook.com" className="social-icon"><FaFacebookF size={20} /></a>
              <a href="https://linkedin.com" className="social-icon"><FaLinkedinIn size={20} /></a>
              <a href="https://instagram.com" className="social-icon"><FaInstagram size={20} /></a>
              <a href="https://x.com" className="social-icon"><SiX size={20} /></a>
            </div>

            <button className="join-btn">Join us</button>
          </div>

          <div className="home-image">
            <img src="/vol1.png" alt="Volunteer" />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section about-section">
          <div className="about-container">
            <div className="about-image">
              <img src="/vol2.png" alt="About Us" />
            </div>
            <div className="about-content">
              <h2>About Us</h2>
              <p>
                At DZ Volunteer, we believe that every small action can create a big impact.
              </p>
              <p>
                Our platform makes it safe, accessible, and rewarding for anyone to become a volunteer.
              </p>
              <p>
                Together, we inspire positive change and empower citizens to take action.
              </p>
            </div>
          </div>
        </section>

        {/* Missions Section */}
        <section id="missions" className="section missions-section">
          <div className="missions-header">
            <h2>Current Missions</h2>
            <p>Make a difference today, one step at a time</p>
          </div>

          <div className="missions-grid">
            {[
              { title: "Medical", img: "/sante.jpg", text: "Support our health-care community" },
              { title: "Nature", img: "/nature.jpg", text: "Protect our environment together" },
              { title: "Social", img: "/social.jpg", text: "Build stronger communities" },
            ].map((m, i) => (
              <div className="mission-card" key={i}>
                <div className="mission-image">
                  <img src={m.img} alt={m.title} />
                </div>
                <div className="mission-content">
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                  <button className="mission-btn">See more</button>
                </div>
              </div>
            ))}
          </div>
        </section> 
        {/* Organizations section */}
<section id="organizations" className="section organizations-section">
  <div className="organizations-header">
    <h2>Top Organizations</h2>
    <p>Explore the top organizations turning passion into meaningful change</p>
  </div>

  <div className="organizations-grid">
    {[
      {
        type: "Nature",
        name: "Green Algeria",
        description: "جزائر خضراء باذن الله",
        img: "/green.jpg",
      },
      {
        type: "Education",
        name: "Learn Together",
        description: "Promoting literacy and learning opportunities.",
        img: "/learn.jpg",
      },
      {
        type: "Health",
        name: "Health Aid",
        description: "Supporting medical aid and community health programs.",
        img: "/aid.jpeg",
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
</section>

         {/* Volunteers Section */}
        <section id="volunteers" className="section volunteers-section-wrapper">
          <div className="volunteers-section">
            <h2>Our Most Inspiring Volunteers</h2>
            <p>Highlighting the volunteers whose dedication drives our missions forward</p>
            <div className="volunteers-grid">
      {[
        { name: "billal mohsin", img: "/billal.jpg" },
        { name: "ghayth nazim", img: "/ghayth.jpg" },
        { name: "nour mohamed", img: "/nour.jpg" },
        { name: "moussa ahmed", img: "/moussa.jpg" },
      ].map((v, index) => (
        <div className="volunteer" key={index}>
          <div className="volunteer-avatar">
            <img src={v.img} alt={v.name} />
          </div>
          <div className="volunteer-name">{v.name}</div>
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

      </div>
        {/* Contact section */}
<section id="contact" className="section contact-section">
  <div className="contact-header">
    <h2>Be the change you want to see — join us today!</h2>
    <p>Join DZ Volunteers and turn compassion into action</p>
    <button className="join-btn">join us</button>
  </div>

  <div className="contact-container">
    {/* Contact form */}
    <div className="footer-contact-form">
      <h3>Get in touch with us</h3>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="footer-form-row">
          <div className="footer-form-group">
            <label>Name</label>
            <input type="text" placeholder="Your name" />
          </div>

          <div className="footer-form-group">
            <label>Phone</label>
            <input type="text" placeholder="Phone" />
          </div>
        </div>

        <div className="footer-form-group">
          <label>Email</label>
          <input type="email" placeholder="your@email.com" />
        </div>

        <div className="footer-form-group">
          <label>Type your demande</label>
          <textarea placeholder="Type your message here..."></textarea>
        </div>

        <button type="submit" className="footer-submit-btn">
          Submit
        </button>
      </form>
    </div>

    {/* Contact details */}
    <div className="footer-contact-details">
      <h3>Contact details</h3>
      <p>
        If you have any questions at all, we're here to help! Our friendly team is ready to assist you.
      </p>

      <div className="footer-detail-item">
        <FaMapMarkerAlt className="footer-detail-icon" />
        <span>Address:</span> Algeria
      </div>

      <div className="footer-detail-item">
        <FaMobileAlt className="footer-detail-icon" />
        <span>Mobile:</span> +213 555 123 456
      </div>

      <div className="footer-detail-item">
        <FaEnvelope className="footer-detail-icon" />
        <span>Email:</span> dz_volunteers@gmail.com
      </div>

      <div className="footer-detail-item">
        <FaClock className="footer-detail-icon" />
        <span>Availability:</span> 9:00 - 19:00
      </div>
    </div>
  </div>
</section>


      

      <Footer />
    </div>
  )
}
