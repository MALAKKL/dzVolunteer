"use client"

import { useState } from "react"
import { FiArrowLeft, FiClock, FiEdit2, FiCheck, FiX, FiUsers } from "react-icons/fi"

const missionVolunteersList = {
  1: [
    {
      id: 101,
      name: "Sarah Johnson",
      avatar: "/volunteer-profile-female.jpg",
      email: "sarah@example.com",
      competencies: ["Leadership", "Beach Cleanup"],
      status: "approved",
      hoursWorked: 8,
    },
    {
      id: 102,
      name: "Mike Chen",
      avatar: "/volunteer-profile-male.jpg",
      email: "mike@example.com",
      competencies: ["Physical Work", "Environmental"],
      status: "approved",
      hoursWorked: 6,
    },
    {
      id: 103,
      name: "Emma Davis",
      avatar: "/volunteer-profile-female.jpg",
      email: "emma@example.com",
      competencies: ["Coordination", "Beach Cleanup"],
      status: "pending",
      hoursWorked: 0,
    },
  ],
  2: [
    {
      id: 201,
      name: "Alex Rodriguez",
      avatar: "/volunteer-profile-male.jpg",
      email: "alex@example.com",
      competencies: ["Gardening", "Teaching"],
      status: "approved",
      hoursWorked: 10,
    },
    {
      id: 202,
      name: "Lisa Wang",
      avatar: "/volunteer-profile-female.jpg",
      email: "lisa@example.com",
      competencies: ["Gardening", "Planning"],
      status: "approved",
      hoursWorked: 12,
    },
  ],
  3: [
    {
      id: 301,
      name: "David Brown",
      avatar: "/volunteer-profile-male.jpg",
      email: "david@example.com",
      competencies: ["Sports Coaching", "Youth Work"],
      status: "approved",
      hoursWorked: 5,
    },
  ],
  4: [
    {
      id: 401,
      name: "Jennifer Martinez",
      avatar: "/volunteer-profile-female.jpg",
      email: "jen@example.com",
      competencies: ["Logistics", "Community Work"],
      status: "approved",
      hoursWorked: 8,
    },
    {
      id: 402,
      name: "Robert Lee",
      avatar: "/volunteer-profile-male.jpg",
      email: "robert@example.com",
      competencies: ["Food Distribution"],
      status: "approved",
      hoursWorked: 9,
    },
  ],
}

export default function MissionVolunteersPage({
  missionId,
  missionTitle,
  isArchived = false,
  onBack,
}) {
  const volunteers = missionVolunteersList[missionId] || []
  const [selectedVolunteer, setSelectedVolunteer] = useState(null)
  const [editingHours, setEditingHours] = useState(null)
  const [updatedVolunteers, setUpdatedVolunteers] = useState({})

  const handleEditHours = (volunteer) => {
    setEditingHours({ id: volunteer.id, hours: updatedVolunteers[volunteer.id] ?? volunteer.hoursWorked })
  }

  const handleSaveHours = (volunteerId) => {
    if (editingHours && editingHours.id === volunteerId) {
      setUpdatedVolunteers((prev) => ({
        ...prev,
        [volunteerId]: editingHours.hours,
      }))
      setEditingHours(null)
    }
  }

  const getHours = (volunteer) => {
    return updatedVolunteers[volunteer.id] ?? volunteer.hoursWorked
  }

  const approvedVolunteers = volunteers.filter((v) => v.status === "approved")
  const pendingVolunteers = volunteers.filter((v) => v.status === "pending")
  const totalHours = approvedVolunteers.reduce((sum, v) => sum + getHours(v), 0)

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#F5F3EE" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <button
          onClick={onBack}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#6b7280",
            cursor: "pointer",
            display: "flex",
            alignItems: "center"
          }}
        >
          <FiArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#0F393B", marginBottom: "0.5rem" }}>
            Mission Volunteers
          </h1>
          <p style={{ color: "#6b7280" }}>
            {missionTitle} {isArchived && "(Archived)"}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem" }}>Total Volunteers</p>
              <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#0F393B" }}>{approvedVolunteers.length}</p>
            </div>
            <FiUsers size={32} style={{ color: "#34B26A", opacity: 0.2 }} />
          </div>
        </div>
        <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem" }}>Total Hours Worked</p>
              <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#0F393B" }}>{totalHours}</p>
            </div>
            <FiClock size={32} style={{ color: "#34B26A", opacity: 0.2 }} />
          </div>
        </div>
        <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem" }}>Average Hours/Volunteer</p>
              <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#0F393B" }}>
                {approvedVolunteers.length > 0 ? (totalHours / approvedVolunteers.length).toFixed(1) : 0}
              </p>
            </div>
            <FiClock size={32} style={{ color: "#EF8451", opacity: 0.2 }} />
          </div>
        </div>
      </div>

      {/* Approved Volunteers */}
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0F393B", marginBottom: "1.5rem" }}>
          Approved Volunteers ({approvedVolunteers.length})
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {approvedVolunteers.map((volunteer) => (
            <div
              key={volunteer.id}
              style={{
                backgroundColor: "white",
                padding: "1rem",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "box-shadow 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"}
              onClick={() => setSelectedVolunteer(volunteer)}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1 }}>
                  <img
                    src={volunteer.avatar || "/placeholder.svg"}
                    alt={volunteer.name}
                    style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#0F393B" }}>{volunteer.name}</h3>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>{volunteer.email}</p>
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                      {volunteer.competencies.map((comp) => (
                        <span
                          key={comp}
                          style={{
                            fontSize: "0.75rem",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "9999px",
                            backgroundColor: "#F2EBE4",
                            color: "#0F393B"
                          }}
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  {editingHours?.id === volunteer.id ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <input
                        type="number"
                        min="0"
                        value={editingHours.hours}
                        onChange={(e) =>
                          setEditingHours({ ...editingHours, hours: parseFloat(e.target.value) || 0 })
                        }
                        style={{
                          width: "80px",
                          padding: "0.5rem 0.75rem",
                          backgroundColor: "#f9fafb",
                          border: "1px solid #e5e5e5",
                          borderRadius: "8px",
                          color: "#0F393B",
                          fontSize: "0.875rem"
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSaveHours(volunteer.id)
                        }}
                        style={{
                          padding: "0.5rem",
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
                        onClick={(e) => {
                          e.stopPropagation()
                          setEditingHours(null)
                        }}
                        style={{
                          padding: "0.5rem",
                          backgroundColor: "transparent",
                          border: "1px solid #e5e5e5",
                          borderRadius: "4px",
                          cursor: "pointer"
                        }}
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditHours(volunteer)
                      }}
                    >
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0F393B" }}>{getHours(volunteer)}</p>
                        <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>hours</p>
                      </div>
                      <button
                        style={{
                          padding: "0.5rem",
                          backgroundColor: "transparent",
                          border: "none",
                          color: "#6b7280",
                          cursor: "pointer"
                        }}
                      >
                        <FiEdit2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Volunteers */}
      {pendingVolunteers.length > 0 && (
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0F393B", marginBottom: "1.5rem" }}>
            Pending Volunteers ({pendingVolunteers.length})
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {pendingVolunteers.map((volunteer) => (
              <div
                key={volunteer.id}
                style={{
                  backgroundColor: "white",
                  padding: "1rem",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  opacity: 0.75,
                  transition: "box-shadow 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"}
                onClick={() => setSelectedVolunteer(volunteer)}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1 }}>
                    <img
                      src={volunteer.avatar || "/placeholder.svg"}
                      alt={volunteer.name}
                      style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#0F393B" }}>{volunteer.name}</h3>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>{volunteer.email}</p>
                      <span style={{
                        marginTop: "0.5rem",
                        display: "inline-block",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px",
                        border: "1px solid #e5e5e5",
                        fontSize: "0.875rem"
                      }}>
                        Pending Approval
                      </span>
                    </div>
                  </div>
                  <span style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    border: "1px solid #fbbf24",
                    color: "#d97706",
                    fontSize: "0.875rem",
                    backgroundColor: "#fef3c7"
                  }}>
                    Awaiting Approval
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
