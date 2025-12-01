"use client"

import { useState } from "react"

export default function MissionsSection() {
  const missions = [
    {
      id: 1,
      title: "Medical",
      organizationName: "Health Plus Organization",
      type: "The heart-dose",
      image: "/medical-volunteer-helping-patients.jpg",
      description: "Community Health",
    },
    {
      id: 2,
      title: "Nature",
      organizationName: "Green Earth Initiative",
      type: "Alqiyyat abhaam",
      image: "/volunteers-planting-trees-in-nature.jpg",
      description: "Environmental Action",
    },
    {
      id: 3,
      title: "Social",
      organizationName: "Hope Community",
      type: "Alfaw organization",
      image: "/volunteers-helping-people-in-community.jpg",
      description: "Social Outreach",
    },
  ]

  const [selectedMission, setSelectedMission] = useState(null)

  return (
    <section id="missions" className="missions-section">
      <h2>Current Missions</h2>
      <p className="missions-subtitle">Make a difference today, one step at a time</p>

      <div className="missions-grid">
        {missions.map((mission) => (
          <div key={mission.id} className="mission-card">
            <div className="mission-image">
              <img src={mission.image || "/placeholder.svg"} alt={mission.title} />
            </div>
            <div className="mission-content">
              <h3>{mission.title}</h3>
              <p className="mission-org">
                <strong>{mission.organizationName}</strong>
              </p>
              <p className="mission-type">{mission.type}</p>
              <p className="mission-desc">{mission.description}</p>
              <button
                className="see-more-btn"
                onClick={() => setSelectedMission(mission)}
              >
                See more
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="selected-mission">
        <h3>Selected Mission</h3>
        {selectedMission ? (
          <div>
            <h4>{selectedMission.title}</h4>
            <p><strong>{selectedMission.organizationName}</strong></p>
            <p>{selectedMission.type}</p>
            <p>{selectedMission.description}</p>
          </div>
        ) : (
          <p>No mission selected.</p>
        )}
      </div>
    </section>
  )
}
