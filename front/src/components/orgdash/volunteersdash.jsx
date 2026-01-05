"use client"

import { useState } from "react"
import { FiSearch, FiFilter, FiCheckCircle, FiClock, FiX } from "react-icons/fi"
import VolunteerDetailModal from "./modal/volunteers-detail-modal"

const approvedVolunteers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/professional-woman-diverse.png",
    competencies: ["Leadership", "Communication", "Teaching"],
    appliedMission: "Community Garden Project",
    status: "Approved",
    joinDate: "2024-01-10",
    bio: "Passionate about environmental conservation and community development.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    email: "emma@example.com",
    avatar: "/professional-woman-diverse.png",
    competencies: ["Communication", "Teamwork"],
    appliedMission: "Beach Cleanup Initiative",
    status: "Approved",
    joinDate: "2024-01-12",
    bio: "Environmental enthusiast dedicated to ocean conservation.",
  },
]

const waitingList = [
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@example.com",
    avatar: "/professional-man.jpg",
    competencies: ["Teamwork", "Problem Solving", "Sports"],
    appliedMission: "Youth Sports Training",
    status: "Pending",
    joinDate: "2024-01-15",
    bio: "Former athlete interested in mentoring youth.",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james@example.com",
    avatar: "/professional-man.jpg",
    competencies: ["Medical", "First Aid"],
    appliedMission: "Medical Support Initiative",
    status: "Pending",
    joinDate: "2024-01-18",
    bio: "Healthcare professional eager to contribute.",
  },
]

export default function VolunteersPage({ missionFilter, onClearMissionFilter }) {
  const [selectedVolunteer, setSelectedVolunteer] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showWaitingList, setShowWaitingList] = useState(false)

  const displayVolunteers = showWaitingList ? waitingList : approvedVolunteers
  const missionFilteredVolunteers = missionFilter
    ? displayVolunteers.filter((v) => v.appliedMission === missionFilter.title)
    : displayVolunteers

  const filteredVolunteers = missionFilteredVolunteers.filter(
    (v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#F5F3EE" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#0F393B", marginBottom: "0.5rem" }}>
            {missionFilter
              ? `Volunteers for: ${missionFilter.title}`
              : showWaitingList
                ? "Waiting List"
                : "Approved Volunteers"}
          </h1>
          <p style={{ color: "#6b7280" }}>
            {missionFilter
              ? `View all volunteers assigned to this mission`
              : showWaitingList
                ? "Review pending volunteer applications"
                : "Manage active volunteers in your organization"}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {missionFilter && (
            <button
              onClick={onClearMissionFilter}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#EF8451",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              <FiX size={16} />
              Clear Mission Filter
            </button>
          )}
          <button
            onClick={() => setShowWaitingList(!showWaitingList)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#347362",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 500
            }}
          >
            {showWaitingList ? "View Approved Volunteers" : "View Waiting List"}
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <FiSearch style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#6b7280" }} size={16} />
          <input
            type="text"
            placeholder="Search volunteers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              paddingLeft: "2.5rem",
              paddingRight: "1rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              borderRadius: "8px",
              backgroundColor: "white",
              border: "1px solid #e5e5e5",
              color: "#0F393B"
            }}
          />
        </div>
        <button style={{
          padding: "0.5rem 1rem",
          backgroundColor: "transparent",
          border: "1px solid #e5e5e5",
          borderRadius: "8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <FiFilter size={16} />
          Filter
        </button>
      </div>

      {/* Horizontal Volunteer Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2rem" }}>
        {filteredVolunteers.length > 0 ? (
          filteredVolunteers.map((volunteer) => (
            <div
              key={volunteer.id}
              style={{
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                padding: "1.5rem",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                cursor: "pointer",
                flexShrink: 0,
                width: "100%",
                minWidth: "300px",
                flex: "1 1 300px",
                transition: "box-shadow 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"}
              onClick={() => setSelectedVolunteer(volunteer)}
            >
              {/* Avatar */}
              <div style={{ width: "96px", height: "96px", borderRadius: "8px", flexShrink: 0, overflow: "hidden", backgroundColor: "#f9fafb" }}>
                <img
                  src={volunteer.avatar || "/placeholder.svg"}
                  alt={volunteer.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#0F393B" }}>{volunteer.name}</h3>
                  <span style={{
                    padding: "0.125rem 0.5rem",
                    borderRadius: "9999px",
                    fontSize: "0.75rem",
                    backgroundColor: volunteer.status === "Approved" ? "#f0fdf4" : "#fff7ed",
                    color: volunteer.status === "Approved" ? "#34B26A" : "#EF8451",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem"
                  }}>
                    {volunteer.status === "Approved" ? (
                      <FiCheckCircle size={12} />
                    ) : (
                      <FiClock size={12} />
                    )}
                    {volunteer.status}
                  </span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem" }}>{volunteer.email}</p>
                <p style={{ fontSize: "0.875rem", color: "#0F393B", marginBottom: "0.75rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {volunteer.appliedMission}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {volunteer.competencies.slice(0, 3).map((comp) => (
                    <span
                      key={comp}
                      style={{
                        fontSize: "0.75rem",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "9999px",
                        border: "1px solid #e5e5e5",
                        backgroundColor: "#f9fafb"
                      }}
                    >
                      {comp}
                    </span>
                  ))}
                  {volunteer.competencies.length > 3 && (
                    <span style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "9999px",
                      border: "1px solid #e5e5e5",
                      backgroundColor: "#f9fafb"
                    }}>
                      +{volunteer.competencies.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Arrow Indicator */}
              <div style={{ flexShrink: 0, color: "#347362" }}>
                <svg style={{ width: "24px", height: "24px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))
        ) : (
          <div style={{ width: "100%", textAlign: "center", padding: "3rem" }}>
            <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>No volunteers found for this mission.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedVolunteer && (
        <VolunteerDetailModal volunteer={selectedVolunteer} onClose={() => setSelectedVolunteer(null)} />
      )}
    </div>
  )
}
