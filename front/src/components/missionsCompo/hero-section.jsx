import { FaWhatsapp, FaInstagram, FaTiktok, FaFacebook, FaLinkedin, FaSearch } from "react-icons/fa"

export function HeroSection() {
  return (
    <section className="missions-hero-section">
      {/* Decorative elements */}
      <div className="missions-hero-decorative missions-hero-decorative-1" />
      <div className="missions-hero-decorative missions-hero-decorative-2" />

      <div className="missions-hero-container">
        <div className="missions-hero-grid">
          {/* Left side - Image */}
          <div className="missions-hero-image-wrapper">
            <div className="missions-hero-image-decor" />
            <img
              src="/volunteer-wearing-blue-t-shirt-sitting-on-stool.jpg"
              alt="Volunteer"
              className="missions-hero-image"
            />
          </div>

          {/* Right side - Content */}
          <div className="missions-hero-content">
            <h1 className="missions-hero-title">
              Every Mission Starts With Purpose
            </h1>
            <p className="missions-hero-description">
              Step into the heart of our work and discover the impact we're creating together
            </p>

            {/* Social icons */}
            <div className="missions-hero-socials">
              <FaWhatsapp className="missions-hero-social-icon" />
              <FaInstagram className="missions-hero-social-icon" />
              <FaTiktok className="missions-hero-social-icon" />
              <FaFacebook className="missions-hero-social-icon" />
              <FaLinkedin className="missions-hero-social-icon" />
            </div>

            {/* Search bar */}
            <div className="missions-hero-search-wrapper">
              <FaSearch className="missions-hero-search-icon" />
              <input
                type="search"
                placeholder="search for a mission"
                className="missions-hero-search-input"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
