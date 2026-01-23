// src/components/MissionCard.jsx
import "./MissionCard.css";
import { WhatsappIcon, InstagramIcon, FacebookIcon, LinkedinIcon } from "./SocialIcons";

function MissionCard({ mission, showApplyButton = false, onApply = () => {} }) {
  if (!mission) return <p>Loading mission...</p>; // safety check

  return (
    <div className="project-card">
      <div className="card-image">
        <img
          src={mission.image} // dynamic image
          alt={mission.title}
          className="tree-image"
        />
      </div>

      <div className="card-content">
        <h1 className="project-title">{mission.title}</h1>
        <p className="project-subtitle">{mission.organization}</p>

        <div className="info-section">
          <label className="info-label">DESCRIPTION</label>
          <p className="info-text">{mission.description}</p>
        </div>

        <div className="info-section">
          <label className="info-label">LOCATION</label>
          <p className="info-text">{mission.location}</p>
        </div>

        <div className="info-section">
          <label className="info-label">DATE RANGE</label>
          <p className="info-text">{mission.date}</p>
        </div>

        <div className="info-section">
          <label className="info-label">VOLUNTEERS NEEDED</label>
          <p className="info-text">{mission.number} slots available</p>
        </div>

        <div className="info-section">
          <label className="info-label">COMPETENCIES REQUIRED</label>
          <div className="competencies">
            {mission.competencies?.map((c, i) => (
              <button key={i} className="competency-tag">{c}</button>
            ))}
          </div>
        </div>

        {/* 🔹 APPLY BUTTON */}
        {showApplyButton && (
          <button className="apply-button" onClick={onApply}>
            Apply Now
          </button>
        )}

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
