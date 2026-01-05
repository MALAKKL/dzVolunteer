import { FaCheck } from "react-icons/fa"

export function OrganizationCard({ name, location, organizer, image }) {
  return (
    <div className="missions-org-card">
      <div className="missions-org-card-content">
        <div className="missions-org-card-header">
          <h3 className="missions-org-card-name">{name}</h3>
          <div className="missions-org-card-check">
            <FaCheck className="missions-org-card-check-icon" />
          </div>
        </div>
        <div className="missions-org-card-info">
          <p>{location}</p>
          <p>{organizer}</p>
        </div>
        <img src={image || "/placeholder.svg"} alt={name} className="missions-org-card-image" />
      </div>
    </div>
  )
}
