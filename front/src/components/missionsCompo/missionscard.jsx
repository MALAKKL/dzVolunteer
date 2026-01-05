import { FaMapMarkerAlt } from "react-icons/fa"

export function MissionCard({ title, organizer, date, description, location, image }) {
  return (
    <div className="missions-card">
      <div className="missions-card-content">
        {/* Image */}
        <div className="missions-card-image-wrapper">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="missions-card-image"
          />
        </div>

        {/* Content */}
        <div className="missions-card-text">
          <div>
            <h3 className="missions-card-title">{title}</h3>
            <p className="missions-card-organizer">{organizer}</p>
            <p className="missions-card-date">{date}</p>
            <p className="missions-card-description">{description}</p>
            <div className="missions-card-location">
              <FaMapMarkerAlt className="missions-card-location-icon" />
              <span>{location}</span>
            </div>
            <p style={{fontSize: "1.5rem", fontWeight: "bold", marginTop: "0.5rem"}}>22</p>
            <p className="missions-card-date">{organizer}</p>
          </div>

          <div>
            <button className="missions-card-btn">
              see more
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
