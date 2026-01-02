// src/components/MissionCard.jsx
import "./MissionCard.css";
import { WhatsappIcon, InstagramIcon, FacebookIcon, LinkedinIcon } from "./SocialIcons";

function MissionCard() {
  return (
    <div className="project-card">
      <div className="card-image">
        <img
          src="/mp2.png" // replace with your /mp2.png later
          alt="Planting 1 Million Trees"
          className="tree-image"
        />
      </div>

      <div className="card-content">
        <h1 className="project-title">Planting 1 Million Trees</h1>
        <p className="project-subtitle">khedra bidni allah</p>

        <div className="info-section">
          <label className="info-label">DESCRIPTION</label>
          <p className="info-text">csd,vkwwnxwwwnv,vxwxwxwxwxwxwxwxwxwxwvcvw</p>
        </div>

        <div className="info-section">
          <label className="info-label">LOCATION</label>
          <p className="info-text">csd,vkwwnxwwwnv,vxwxwxwxwxwxwxwxwxwxwvcvw</p>
        </div>

        <div className="info-section">
          <label className="info-label">DATE RANGE</label>
          <p className="info-text">05/12/2025 - 15/12/2025</p>
        </div>

        <div className="info-section">
          <label className="info-label">VOLUNTEERS NEEDED</label>
          <p className="info-text">15 slots available</p>
        </div>

        <div className="info-section">
          <label className="info-label">COMPETENCIES REQUIRED</label>
          <div className="competencies">
            <span className="competency-tag">Physical Fitness</span>
            <span className="competency-tag">Environmental Awareness</span>
          </div>
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
    </div>
  );
}

export default MissionCard;
