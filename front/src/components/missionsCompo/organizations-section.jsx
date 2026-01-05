import { OrganizationCard } from "./organization-card"

const organizations = [
  {
    name: "Nature",
    location: "Aldjoazer khedra",
    organizer: "khedra bidni allah",
    image: "/volunteers-planting-trees-outdoors.jpg",
  },
  {
    name: "Nature",
    location: "Aldjoazer khedra",
    organizer: "khedra bidni allah",
    image: "/volunteers-planting-trees-outdoors.jpg",
  },
  {
    name: "Nature",
    location: "Aldjoazer khedra",
    organizer: "khedra bidni allah",
    image: "/volunteers-planting-trees-outdoors.jpg",
  },
  {
    name: "Nature",
    location: "Aldjoazer khedra",
    organizer: "khedra bidni allah",
    image: "/volunteers-planting-trees-outdoors.jpg",
  },
]

function OrganizationsSection() {
  return (
    <section className="missions-orgs-section">
      {/* Decorative elements */}
      <div className="missions-orgs-decorative">
        <svg style={{width: "96px", height: "128px", color: "rgba(255, 136, 38, 0.2)"}} viewBox="0 0 100 120" fill="currentColor">
          <path d="M10,10 Q30,30 10,50" stroke="currentColor" strokeWidth="3" fill="none" />
          <path d="M10,60 Q30,80 10,100" stroke="currentColor" strokeWidth="3" fill="none" />
        </svg>
      </div>

      <div className="missions-orgs-container">
        <div className="missions-orgs-header">
          <h2 className="missions-orgs-title">Best organizatinos</h2>
          <p className="missions-orgs-description">
            Explore the top organizations turning passion into meaningful change
          </p>
        </div>

        <div className="missions-orgs-grid">
          {organizations.map((org, index) => (
            <OrganizationCard key={index} {...org} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { OrganizationsSection }
export default OrganizationsSection
