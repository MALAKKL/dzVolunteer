"use client"

import { Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"

const missions = [
  {
    id: 1,
    title: "Beach Cleanup Drive",
    location: "Sunset Beach Park",
    date: "2025-12-05",
    volunteersCount: 12,
    image: "/beach-cleanup-volunteers.png",
  },
  {
    id: 2,
    title: "Community Garden Development",
    location: "Central Community Center",
    date: "2025-12-10",
    volunteersCount: 6,
    image: "/community-garden.png",
  },
  {
    id: 3,
    title: "Youth Sports Training",
    location: "Central Sports Complex",
    date: "2025-12-15",
    volunteersCount: 8,
    image: "/youth-sports-training.jpg",
  },
]

export default function VolunteersByMissionPage() {
  return (
    <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#F5F3EE" }}>
      {/* Header */}
      <Link to="/orgdash/volunteers" style={{ textDecoration: "none" }}>
        <button style={{
          backgroundColor: "transparent",
          border: "none",
          color: "#34B26A",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          marginBottom: "1rem",
          fontWeight: 500
        }}>
          <FiArrowLeft style={{ width: "16px", height: "16px" }} />
          Back to Volunteers
        </button>
      </Link>

      <div>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#0F393B", marginBottom: "0.5rem" }}>Volunteers by Mission</h1>
        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>Select a mission to view all volunteers</p>
      </div>

      {/* Mission Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {missions.map((mission) => (
          <Link key={mission.id} to={`/orgdash/volunteers/mission/${mission.id}`} style={{ textDecoration: "none" }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "box-shadow 0.2s",
              height: "100%",
              display: "flex",
              flexDirection: "column"
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"}
            >
              <img
                src={mission.image || "/placeholder.svg"}
                alt={mission.title}
                style={{ width: "100%", height: "192px", objectFit: "cover" }}
              />
              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.5rem" }}>{mission.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem" }}>{mission.location}</p>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>{mission.date}</p>
                </div>
                <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#34B26A" }}>{mission.volunteersCount} Volunteers</span>
                  <button
                    style={{
                      backgroundColor: "#34B26A",
                      color: "white",
                      padding: "0.5rem 1rem",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.875rem"
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                  >
                    View All
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
