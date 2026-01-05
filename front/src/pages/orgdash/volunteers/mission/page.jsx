"use client"

import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FiArrowLeft, FiMail, FiTrash2 } from "react-icons/fi"

const mockVolunteersForMission = {
  1: [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      photo: "/volunteer-profile-female.jpg",
      competencies: ["Environmental Awareness", "Physical Fitness"],
      status: "Accepted",
    },
    {
      id: 2,
      name: "James Wilson",
      email: "james.wilson@email.com",
      photo: "/volunteer-profile-male.jpg",
      competencies: ["Organization", "Community Service"],
      status: "Pending",
    },
  ],
  2: [
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      photo: "/volunteer-profile-female.jpg",
      competencies: ["Gardening", "Teamwork"],
      status: "Accepted",
    },
  ],
  3: [
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      photo: "/volunteer-profile-male.jpg",
      competencies: ["Coaching", "Leadership"],
      status: "Pending",
    },
  ],
}

const missionTitles = {
  1: "Beach Cleanup Drive",
  2: "Community Garden Development",
  3: "Youth Sports Training",
}

export default function MissionVolunteersPage() {
  const { missionId } = useParams()
  const missionIdNum = parseInt(missionId)
  const volunteers = mockVolunteersForMission[missionIdNum] || []
  const missionTitle = missionTitles[missionIdNum] || "Mission"
  const [volunteersList, setVolunteersList] = useState(volunteers)

  const handleDeleteVolunteer = (volunteerId) => {
    setVolunteersList(volunteersList.filter((v) => v.id !== volunteerId))
  }

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#F5F3EE" }}>
      {/* Back Button */}
      <Link to="/orgdash/volunteers/by-mission" style={{ textDecoration: "none" }}>
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
          Back to Missions
        </button>
      </Link>

      {/* Header */}
      <div>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#0F393B", marginBottom: "0.5rem" }}>
          Volunteers for {missionTitle}
        </h1>
        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>Total volunteers: {volunteersList.length}</p>
      </div>

      {/* Volunteers List */}
      <div style={{ display: "grid", gap: "1rem" }}>
        {volunteersList.length === 0 ? (
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "3rem",
            textAlign: "center",
            border: "2px dashed #e5e5e5"
          }}>
            <p style={{ color: "#6b7280" }}>No volunteers for this mission yet.</p>
          </div>
        ) : (
          volunteersList.map((volunteer) => (
            <div
              key={volunteer.id}
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                transition: "box-shadow 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"}
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
                      <FiMail style={{ width: "16px", height: "16px" }} /> Contact
                    </p>
                    <a href={`mailto:${volunteer.email}`} style={{ color: "#34B26A", textDecoration: "none", fontSize: "0.875rem" }}>
                      {volunteer.email}
                    </a>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem" }}>Competencies</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.25rem" }}>
                      {volunteer.competencies.map((comp, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: "0.75rem",
                            backgroundColor: "#F2EBE4",
                            color: "#0F393B",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "9999px",
                            fontWeight: 500
                          }}
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status & Delete */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      textAlign: "center",
                      ...(volunteer.status === "Accepted" 
                        ? { backgroundColor: "#f0fdf4", color: "#34B26A" }
                        : { backgroundColor: "#fff7ed", color: "#EF8451" })
                    }}
                  >
                    {volunteer.status}
                  </span>
                  <button
                    style={{
                      backgroundColor: "#ef4444",
                      color: "white",
                      padding: "0.5rem",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      justifyContent: "center"
                    }}
                    onClick={() => handleDeleteVolunteer(volunteer.id)}
                  >
                    <FiTrash2 style={{ width: "16px", height: "16px" }} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
