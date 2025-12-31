// src/components/Missions.jsx
"use client";

import { useState } from "react";
import "./Missions.css";


const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    width="20" height="20" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    width="20" height="20" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    width="20" height="20" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6
      2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5
      c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8
      1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    width="20" height="20" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2
      C18.88 4 12 4 12 4s-6.88 0-8.6.46
      a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75
      a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19
      c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46
      a2.78 2.78 0 0 0 1.94-2
      a29 29 0 0 0 .46-5.25
      a29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);



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
            <div className="social-icons">
              <a href="#" className="social-icon"><InstagramIcon /></a>
              <a href="#" className="social-icon"><FacebookIcon /></a>
              <a href="#" className="social-icon"><TwitterIcon /></a>
              <a href="#" className="social-icon"><YoutubeIcon /></a>
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
                 <button className="see-more">see more</button>
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

          

            <div className="footer-icons">
              <a href="#" className="footer-icon"><InstagramIcon /></a>
              <a href="#" className="footer-icon"><FacebookIcon /></a>
              <a href="#" className="footer-icon"><TwitterIcon /></a>
              <a href="#" className="footer-icon"><YoutubeIcon /></a>
           </div>

        </div>
      </footer>
    
    </>
  );
}
