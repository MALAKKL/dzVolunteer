"use client"

import { FiX, FiMail, FiCheckCircle, FiClock } from "react-icons/fi"

export default function VolunteerDetailModal({ volunteer, onClose }) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50,
      padding: "1rem"
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
        maxWidth: "42rem",
        width: "100%",
        maxHeight: "90vh",
        overflow: "auto"
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.5rem",
          borderBottom: "1px solid #e5e5e5",
          position: "sticky",
          top: 0,
          backgroundColor: "white"
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0F393B" }}>Volunteer Details</h2>
          <button 
            onClick={onClose} 
            style={{ color: "#6b7280", backgroundColor: "transparent", border: "none", cursor: "pointer" }}
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "1.5rem" }}>
          {/* Profile */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ width: "96px", height: "96px", borderRadius: "50%", margin: "0 auto 1rem", overflow: "hidden", backgroundColor: "#f9fafb" }}>
              <img
                src={volunteer.photo || volunteer.avatar || "/placeholder.svg"}
                alt={volunteer.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0F393B", marginBottom: "0.5rem" }}>
              {volunteer.name}
            </h3>
            <p style={{ color: "#6b7280", marginBottom: "1rem" }}>{volunteer.email}</p>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              backgroundColor: volunteer.status === "Accepted" || volunteer.status === "Approved" ? "#f0fdf4" : "#fff7ed",
              color: volunteer.status === "Accepted" || volunteer.status === "Approved" ? "#34B26A" : "#EF8451"
            }}>
              {volunteer.status === "Accepted" || volunteer.status === "Approved" ? (
                <FiCheckCircle size={12} />
              ) : (
                <FiClock size={12} />
              )}
              {volunteer.status}
            </div>
          </div>

          {/* Bio */}
          {volunteer.bio && (
            <div style={{ marginBottom: "2rem", padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
              <p style={{ color: "#0F393B" }}>{volunteer.bio}</p>
            </div>
          )}

          {/* Information Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
            {volunteer.joinDate && (
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", marginBottom: "0.5rem" }}>JOINED DATE</p>
                <p style={{ color: "#0F393B", fontWeight: 600 }}>{volunteer.joinDate}</p>
              </div>
            )}
            <div>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", marginBottom: "0.5rem" }}>EMAIL</p>
              <p style={{ color: "#0F393B", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FiMail size={16} />
                {volunteer.email}
              </p>
            </div>
          </div>

          {/* Competencies */}
          {volunteer.competencies && volunteer.competencies.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", marginBottom: "0.75rem" }}>COMPETENCIES</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {volunteer.competencies.map((comp, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      border: "1px solid #e5e5e5",
                      fontSize: "0.875rem",
                      backgroundColor: "#f9fafb"
                    }}
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Applied Mission */}
          {volunteer.missionAppliedFor && (
            <div style={{ marginBottom: "2rem", padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", marginBottom: "0.5rem" }}>APPLIED FOR MISSION</p>
              <p style={{ color: "#0F393B", fontWeight: 600 }}>{volunteer.missionAppliedFor}</p>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #e5e5e5",
                backgroundColor: "transparent",
                cursor: "pointer",
                fontWeight: 500
              }}
            >
              Close
            </button>
            <button
              style={{
                flex: 1,
                padding: "0.75rem",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#34B26A",
                color: "white",
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              {volunteer.status === "Accepted" || volunteer.status === "Approved" ? "Remove Volunteer" : "Approve Application"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
