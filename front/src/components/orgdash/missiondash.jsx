"use client"

import { useState } from "react"
import { FiPlus, FiArrowRight, FiArchive, FiArrowLeft, FiEdit2, FiCheck, FiX } from "react-icons/fi"
import CreateMissionModal from "./modal/create-mission-modal"
import MissionDetailModal from "./modal/mission-detail-modal"

const currentMissions = [
  {
    id: 1,
    title: "Beach Cleanup Initiative",
    description: "Join us for a day of cleaning our local beaches",
    image: "/beach-cleanup-volunteers.png",
    date: "2024-01-20",
    location: "Santa Monica Beach",
    volunteersNeeded: 15,
    volunteersJoined: 8,
  },
  {
    id: 2,
    title: "Community Garden Project",
    description: "Help plant and maintain our community garden",
    image: "/community-garden.png",
    date: "2024-01-25",
    location: "Downtown Community Center",
    volunteersNeeded: 20,
    volunteersJoined: 12,
  },
  {
    id: 3,
    title: "Youth Sports Training",
    description: "Mentor underprivileged youth in sports",
    image: "/youth-sports-training.jpg",
    date: "2024-02-01",
    location: "Central Park",
    volunteersNeeded: 10,
    volunteersJoined: 6,
  },
]

const archivedMissions = [
  {
    id: 4,
    title: "Food Drive 2023",
    description: "Collected food donations for local charities",
    image: "/food-drive.png",
    date: "2023-12-15",
    location: "Various Locations",
    volunteersNeeded: 25,
    volunteersJoined: 25,
  },
]

const missionVolunteers = {
  1: [
    { id: 1, name: "John Smith", status: "approved", hours: 8, email: "john@example.com" },
    { id: 2, name: "Sarah Johnson", status: "approved", hours: 6, email: "sarah@example.com" },
    { id: 3, name: "Mike Davis", status: "pending", email: "mike@example.com" },
  ],
  2: [
    { id: 4, name: "Emma Wilson", status: "approved", hours: 10, email: "emma@example.com" },
    { id: 5, name: "David Brown", status: "approved", hours: 7, email: "david@example.com" },
  ],
  3: [{ id: 6, name: "Lisa Chen", status: "approved", hours: 5, email: "lisa@example.com" }],
  4: [
    { id: 7, name: "Tom Anderson", status: "approved", hours: 12, email: "tom@example.com" },
    { id: 8, name: "Jane Martinez", status: "approved", hours: 9, email: "jane@example.com" },
  ],
}

export default function MissionsPage({ onShowVolunteers, onNavigate }) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedMission, setSelectedMission] = useState(null)
  const [missionIsArchived, setMissionIsArchived] = useState(false)
  const [viewingMissionVolunteers, setViewingMissionVolunteers] = useState(null)
  const [editingVolunteerHours, setEditingVolunteerHours] = useState(null)
  const [hoursInput, setHoursInput] = useState("")
  const [volunteersList, setVolunteersList] = useState(missionVolunteers)

  const handleSelectMission = (mission, isArchived) => {
    setSelectedMission(mission)
    setMissionIsArchived(isArchived)
  }

  const handleShowVolunteers = (missionId) => {
    setViewingMissionVolunteers(missionId)
    setSelectedMission(null)
  }

  const handleSaveHours = (volunteerId) => {
    if (viewingMissionVolunteers && hoursInput) {
      const hours = parseFloat(hoursInput)
      setVolunteersList((prev) => ({
        ...prev,
        [viewingMissionVolunteers]: prev[viewingMissionVolunteers].map((v) =>
          v.id === volunteerId ? { ...v, hours } : v,
        ),
      }))
      setEditingVolunteerHours(null)
      setHoursInput("")
    }
  }

  const getCurrentMission = () => {
    return [...currentMissions, ...archivedMissions].find((m) => m.id === viewingMissionVolunteers)
  }

  const missionTitle = getCurrentMission()?.title || "Mission"
  const volunteers = volunteersList[viewingMissionVolunteers || 0] || []
  const approvedVolunteers = volunteers.filter((v) => v.status === "approved")
  const pendingVolunteers = volunteers.filter((v) => v.status === "pending")
  const totalHours = approvedVolunteers.reduce((sum, v) => sum + (v.hours || 0), 0)

  if (viewingMissionVolunteers) {
    return (
      <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#F5F3EE" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <button
            onClick={() => setViewingMissionVolunteers(null)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <FiArrowLeft size={16} />
            Back to Missions
          </button>
          <div>
            <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#0F393B" }}>
              Volunteers for {missionTitle}
            </h1>
            <p style={{ color: "#6b7280", marginTop: "0.25rem" }}>Manage volunteers and track hours worked</p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>Total Volunteers</div>
            <div style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#0F393B" }}>{volunteers.length}</div>
          </div>
          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>Approved</div>
            <div style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#34B26A" }}>{approvedVolunteers.length}</div>
          </div>
          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>Total Hours</div>
            <div style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#EF8451" }}>{totalHours}</div>
          </div>
        </div>

        {/* Approved Volunteers */}
        {approvedVolunteers.length > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0F393B", marginBottom: "1rem" }}>Approved Volunteers</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {approvedVolunteers.map((volunteer) => (
                <div
                  key={volunteer.id}
                  style={{
                    backgroundColor: "white",
                    padding: "1rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 600, color: "#0F393B" }}>{volunteer.name}</p>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>{volunteer.email}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    {editingVolunteerHours === volunteer.id ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <input
                          type="number"
                          value={hoursInput}
                          onChange={(e) => setHoursInput(e.target.value)}
                          placeholder="Hours"
                          style={{
                            width: "80px",
                            padding: "0.25rem 0.5rem",
                            border: "1px solid #e5e5e5",
                            borderRadius: "6px",
                            backgroundColor: "white"
                          }}
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveHours(volunteer.id)}
                          style={{
                            padding: "0.25rem",
                            backgroundColor: "#34B26A",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          <FiCheck size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setEditingVolunteerHours(null)
                            setHoursInput("")
                          }}
                          style={{
                            padding: "0.25rem",
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer"
                          }}
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontWeight: 600, color: "#0F393B" }}>{volunteer.hours || 0} hours</div>
                        </div>
                        <button
                          onClick={() => {
                            setEditingVolunteerHours(volunteer.id)
                            setHoursInput(String(volunteer.hours || 0))
                          }}
                          style={{
                            padding: "0.25rem",
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer"
                          }}
                        >
                          <FiEdit2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pending Volunteers */}
        {pendingVolunteers.length > 0 && (
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0F393B", marginBottom: "1rem" }}>Pending Volunteers</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {pendingVolunteers.map((volunteer) => (
                <div
                  key={volunteer.id}
                  style={{
                    backgroundColor: "white",
                    padding: "1rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    opacity: 0.75,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 600, color: "#0F393B" }}>{volunteer.name}</p>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>{volunteer.email}</p>
                  </div>
                  <span style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    backgroundColor: "#f9fafb",
                    fontSize: "0.875rem",
                    border: "1px solid #e5e5e5"
                  }}>
                    Pending
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#F5F3EE" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#0F393B", marginBottom: "0.5rem" }}>Missions</h1>
          <p style={{ color: "#6b7280" }}>Manage and oversee all volunteer missions</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#34B26A",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          <FiPlus size={16} />
          Create New Mission
        </button>
      </div>

      {/* Current Missions */}
      <div style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0F393B" }}>Current Missions</h2>
          <button 
            onClick={() => onNavigate && onNavigate("missions-current")}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#34B26A",
              cursor: "pointer",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "color 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#2ea85a"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#34B26A"
            }}
          >
            See All <FiArrowRight size={16} />
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {currentMissions.map((mission) => (
            <div
              key={mission.id}
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "box-shadow 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"}
              onClick={() => handleSelectMission(mission, false)}
            >
              <div style={{ aspectRatio: "16/9", backgroundColor: "#f9fafb", overflow: "hidden" }}>
                <img
                  src={mission.image || "/placeholder.svg"}
                  alt={mission.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "1rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.5rem" }}>
                  {mission.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.75rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {mission.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.75rem" }}>
                  <span>📍 {mission.location}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    border: "1px solid #e5e5e5",
                    fontSize: "0.875rem"
                  }}>
                    {mission.volunteersJoined}/{mission.volunteersNeeded}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>{mission.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Archived Missions */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0F393B" }}>Archived Missions</h2>
          <button 
            onClick={() => onNavigate && onNavigate("missions-archived")}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#EF8451",
              cursor: "pointer",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "color 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#c24918"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#EF8451"
            }}
          >
            See All <FiArrowRight size={16} />
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {archivedMissions.map((mission) => (
            <div
              key={mission.id}
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                cursor: "pointer",
                opacity: 0.75,
                transition: "box-shadow 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"}
              onClick={() => handleSelectMission(mission, true)}
            >
              <div style={{ aspectRatio: "16/9", backgroundColor: "#f9fafb", overflow: "hidden", position: "relative" }}>
                <img
                  src={mission.image || "/placeholder.svg"}
                  alt={mission.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <span style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    backgroundColor: "#347362",
                    color: "white",
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem"
                  }}>
                    <FiArchive size={12} />
                    Archived
                  </span>
                </div>
              </div>
              <div style={{ padding: "1rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.5rem" }}>
                  {mission.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.75rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {mission.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    border: "1px solid #e5e5e5",
                    fontSize: "0.875rem"
                  }}>
                    {mission.volunteersJoined} volunteers
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>{mission.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && <CreateMissionModal onClose={() => setShowCreateModal(false)} />}
      {selectedMission && (
        <MissionDetailModal
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
          onShowVolunteers={handleShowVolunteers}
          isArchived={missionIsArchived}
        />
      )}
    </div>
  )
}
