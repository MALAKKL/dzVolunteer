"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FiUsers, FiMail, FiAward, FiAlertCircle, FiCheckCircle, FiClock } from "react-icons/fi"
import VolunteerDetailModal from "../../../components/orgdash/modal/volunteers-detail-modal"

const mockVolunteers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    photo: "/volunteer-profile-female.jpg",
    bio: "Environmental enthusiast with 5 years of volunteering experience.",
    competencies: ["Environmental Awareness", "Physical Fitness", "Leadership"],
    missionAppliedFor: "Beach Cleanup Drive",
    missionId: 1,
    status: "Accepted",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    photo: "/volunteer-profile-male.jpg",
    bio: "Sports coach and youth mentor passionate about community development.",
    competencies: ["Coaching", "Leadership", "Sports"],
    missionAppliedFor: "Youth Sports Training",
    missionId: 3,
    status: "Pending",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    photo: "/volunteer-profile-female.jpg",
    bio: "Master gardener dedicated to sustainable agriculture.",
    competencies: ["Gardening", "Teamwork", "Organization"],
    missionAppliedFor: "Community Garden Development",
    missionId: 2,
    status: "Accepted",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@email.com",
    photo: "/volunteer-profile-male.jpg",
    bio: "Community organizer with experience in social outreach.",
    competencies: ["Organization", "Community Service"],
    missionAppliedFor: "Winter Food Drive 2024",
    missionId: 101,
    status: "Rejected",
  },
]

const getStatusIcon = (status) => {
  switch (status) {
    case "Accepted":
      return <FiCheckCircle style={{ width: "20px", height: "20px", color: "#34B26A" }} />
    case "Pending":
      return <FiClock style={{ width: "20px", height: "20px", color: "#EF8451" }} />
    case "Rejected":
      return <FiAlertCircle style={{ width: "20px", height: "20px", color: "#ef4444" }} />
    default:
      return null
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case "Accepted":
      return { backgroundColor: "#f0fdf4", color: "#34B26A" }
    case "Pending":
      return { backgroundColor: "#fff7ed", color: "#EF8451" }
    case "Rejected":
      return { backgroundColor: "#fef2f2", color: "#ef4444" }
    default:
      return { backgroundColor: "#f9fafb" }
  }
}

export default function VolunteersPage() {
  const [selectedVolunteer, setSelectedVolunteer] = useState(null)

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#F5F3EE" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#0F393B", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <FiUsers style={{ width: "32px", height: "32px", color: "#34B26A" }} />
            Volunteers
          </h1>
          <p style={{ color: "#6b7280", marginTop: "0.25rem" }}>Manage volunteers and review applications</p>
        </div>
        <Link to="/orgdash/volunteers/by-mission">
          <button style={{ 
            backgroundColor: "#347362", 
            color: "white", 
            padding: "0.5rem 1rem", 
            borderRadius: "8px", 
            border: "none", 
            cursor: "pointer",
            fontWeight: 500
          }}>
            Volunteers by Mission
          </button>
        </Link>
      </div>

      {/* Volunteers Table/Cards */}
      <div style={{ display: "grid", gap: "1rem" }}>
        {mockVolunteers.map((volunteer) => (
          <div
            key={volunteer.id}
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "1.5rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "box-shadow 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"}
            onClick={() => setSelectedVolunteer(volunteer)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              {/* Profile Photo */}
              <img
                src={volunteer.photo || "/placeholder.svg"}
                alt={volunteer.name}
                style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", border: "2px solid #347362" }}
              />

              {/* Volunteer Info */}
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                <div>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem" }}>Name</p>
                  <p style={{ fontWeight: 600, color: "#0F393B" }}>{volunteer.name}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <FiMail style={{ width: "16px", height: "16px" }} /> Email
                  </p>
                  <a href={`mailto:${volunteer.email}`} style={{ color: "#34B26A", textDecoration: "none", fontSize: "0.875rem" }}>
                    {volunteer.email}
                  </a>
                </div>
                <div>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <FiAward style={{ width: "16px", height: "16px" }} /> Mission
                  </p>
                  <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#0F393B" }}>{volunteer.missionAppliedFor}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem" }}>Status</p>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      ...getStatusColor(volunteer.status)
                    }}
                  >
                    {getStatusIcon(volunteer.status)}
                    {volunteer.status}
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <button
                style={{
                  color: "#34B26A",
                  border: "1px solid #34B26A",
                  backgroundColor: "transparent",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 500
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedVolunteer(volunteer)
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedVolunteer && (
        <VolunteerDetailModal volunteer={selectedVolunteer} onClose={() => setSelectedVolunteer(null)} />
      )}
    </div>
  )
}
