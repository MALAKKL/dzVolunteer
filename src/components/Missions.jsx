// src/components/Missions.jsx
"use client";

import { useState } from "react";
import "./Missions.css";
import { WhatsappIcon, InstagramIcon, FacebookIcon, LinkedinIcon } from "./SocialIcons";
import { Link } from "react-router-dom";




export default function Missions() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const missions = [
    {
      id: 1,
      title: "Planting 1 Million Trees",
      organization: "Aldjazayer khedra",
      date: "1 avril 2026",
      description: "Check the Schedule in our social media platforms",
      number: "22",
      location: "Tizi Ouzou",
      image: "/mp2.png",
      category: "Nature",
    },
    {
      id: 2,
      title: "Planting 1 Million Trees",
      organization: "Water for All Algeria",
      date: "15 mai 2026",
      description: "Join us in providing clean water to rural communities",
      number: "45",
      location: "Skikda",
      image: "/mp4.jpg",
      category: "Nature",
    },
    {
      id: 3,
      title: "Education for Every Child",
      organization: "Future Builders DZ",
      date: "20 juin 2026",
      description: "Help us build schools and provide supplies to children",
      number: "38",
      location: "Sidi Belabes",
      image: "/mp6.jpg",
      category: "Social",
    },
    {
      id: 4,
      title: "Beach Cleanup Campaign",
      organization: "Ocean Guardians",
      date: "10 juillet 2026",
      description: "Protect our coastline and marine life together",
      number: "67",
      location: "Boumerdes",
      image: "/mp5.jpg",
      category: "Nature",
    },
    {
      id: 5,
      title: "Food Bank Support",
      organization: "Hearts of Hope",
      date: "5 août 2026",
      description: "Distribute food packages to families in need",
      number: "52",
      location: "Batna",
      image: "/mp7.jpg",
      category: "Social",
    },
    {
      id: 6,
      title: "Youth Mentorship Program",
      organization: "Next Generation Leaders",
      date: "12 septembre 2026",
      description: "Guide young people towards their dreams and goals",
      number: "31",
      location: "Jijel",
      image: "/mp8.jpg",
      category: "Events",
    },
  ];

  const organizations = [
    {
      id: 1,
      category: "Nature",
      title: "Aldjazayer khedra",
      subtitle: "khedra bidni allah",
      image: "/mp3.png",
    },
    {
      id: 2,
      category: "Medical",
      title: "White Hands",
      subtitle: "Medical aid for vulnerable communities",
      image: "/org2.jpg",
    },
    {
      id: 3,
      category: "Social",
      title: "Together We Can",
      subtitle: "Supporting families in need",
      image: "/org3.jpg",
    },
    {
      id: 4,
      category: "Youth",
      title: "Youth Impact",
      subtitle: "Empowering young leaders",
      image: "/org4.jpg",
    },
  ];

  const categories = ["Nature", "Medical", "Social", "Youth", "Events", "Culture"];

  return (
 <>
     {/* Header outside container */}
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="DZ Volunteer Logo" className="logo-img" />
      </div>
      <nav className="nav">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#missions" className="active">Missions</a>
        <a href="#organizations">Organizations</a>
      </nav>
      <div className="profile">
        <img src="/abstract-profile.png" alt="Profile" />
        <span>profile name</span>
      </div>
    </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-image">
            <img src="/mp1.png" alt="Volunteer" />
          </div>
          <div className="hero-text">
            <div className="decoration-star"></div>
            <h1>
              Every Mission
              <br />
              Starts With <span className="highlight">Purpose</span>
            </h1>
            <p>Step into the heart of our work and discover the impact we're creating together</p>
            <div className="social-links">
               <a href="#" className="social-icon" aria-label="WhatsApp">
                <WhatsappIcon />
               </a>
               <a href="#" className="social-icon" aria-label="Instagram">
               <InstagramIcon />
               </a>
               <a href="#" className="social-icon" aria-label="Facebook">
               <FacebookIcon />
               </a>
               <a href="#" className="social-icon" aria-label="LinkedIn">
                <LinkedinIcon />
               </a>
             </div>

            <div className="search-bar">
              <input type="text" placeholder="search for a mission" />
            </div>
            <div className="decoration-spiral"></div>
          </div>
        </div>
      </section>

      <div className="container">
         {/* Mission Card Slider */}

         {/* Explore Missions */}
           <section className="explore-missions">
             <h2>Explore Our Missions</h2>
               <div className="categories">
                  {categories.map((category) => (
                  <button
                  key={category}
                  className={category === missions[currentSlide].category ? "active" : ""}>
                  {category}
                  </button>
                   ))}
                </div>

            </section>

            <section className="mission-slider">
                <div className="mission-card">
                   <div className="mission-image">
                       <img src={missions[currentSlide].image} alt={missions[currentSlide].title} />
                  </div>
                 <div className="mission-details">
                  <h3>{missions[currentSlide].title}</h3>
                  <p className="mission-org">{missions[currentSlide].organization}</p>
                  <p className="mission-date">{missions[currentSlide].date}</p>
                  <p className="mission-description">{missions[currentSlide].description}</p>
                  <p className="mission-number">{missions[currentSlide].number}</p>
                  <p className="mission-location">{missions[currentSlide].location}</p>
                 <Link to={`/missioncard/${missions[currentSlide].id}`} className="see-more">
                   see more
                 </Link>

                    </div>
             </div> 
              <div className="slider-controls">
                 <button
                  className="slider-btn"
                  onClick={() =>
                  setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : missions.length - 1)
                  }
                 >
                  ←
                 </button>
                 <button
                  className="slider-btn"
                 onClick={() =>
                   setCurrentSlide(currentSlide < missions.length - 1 ? currentSlide + 1 : 0)
                  }
                   >
                   →
                  </button>
               </div>
          </section>
       </div>
         {/* Best Organizations */}
      <section className="best-organizations">
         <h2 className="best-title">Best organizations</h2>

            <p className="best-subtitle">
            Explore the top organizations turning passion into meaningful change
             </p>

           <div className="organizations-grid">
               {organizations.map((org) => (
              <div key={org.id} className="org-card">
                 <h3 className="org-category">{org.category}</h3>

                 <p className="org-title">{org.title}</p>
                 <p className="org-subtitle">{org.subtitle}</p>

                   <div className="org-image">
                      <img src={org.image} alt={org.title} />
                   </div>
                </div>
                ))}
         </div>
     </section>


      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <button className="contact-btn">contact us</button>
            <div className="footer-info">
              <span className="phone">+213 555 123 456</span>
              <span className="email">dz_voulnteers@gmail.com</span>
           </div>

          

            <div className="social-links">
               <a href="#" className="social-icon" aria-label="WhatsApp">
                <WhatsappIcon />
               </a>
               <a href="#" className="social-icon" aria-label="Instagram">
               <InstagramIcon />
               </a>
               <a href="#" className="social-icon" aria-label="Facebook">
               <FacebookIcon />
               </a>
               <a href="#" className="social-icon" aria-label="LinkedIn">
                <LinkedinIcon />
               </a>
             </div>

        </div>
      </footer>
    
    </>
  );
}
