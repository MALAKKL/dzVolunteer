"use client"

import { FiX, FiMapPin, FiUsers, FiCalendar } from "react-icons/fi"

export default function MissionDetailModal({ mission, onClose, isArchived = false }) {
  if (!mission) return null

  const volunteersJoined = mission.volunteersJoined || 0
  const volunteersNeeded = mission.volunteersNeeded || 1
  const progressPercent = Math.min((volunteersJoined / volunteersNeeded) * 100, 100)

  return (
    <div 
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "1rem"
      }}
    >
      <div style={{
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
        maxWidth: "42rem",
        width: "100%",
        maxHeight: "90vh",
        overflow: "auto"
      }}>
        {/* Image */}
        <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
          <img 
            src={mission.image || "/placeholder.svg"} 
            alt={mission.title} 
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              borderRadius: "50%",
              padding: "0.5rem",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#0F393B", marginBottom: "0.5rem" }}>
            {mission.title}
          </h2>

          {mission.description && (
            <p style={{ color: "#6b7280", fontSize: "1rem", marginBottom: "1.5rem" }}>
              {mission.description}
            </p>
          )}

          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            {mission.date && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#6b7280" }}>
                <FiCalendar size={16} />
                <span>{mission.date}</span>
              </div>
            )}
            {mission.location && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#6b7280" }}>
                <FiMapPin size={16} />
                <span>{mission.location}</span>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#6b7280" }}>
              <FiUsers size={16} />
              <span>{volunteersJoined}/{volunteersNeeded} volunteers</span>
            </div>
          </div>

          {!isArchived && (
            <div style={{ marginBottom: "2rem", padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
              <h3 style={{ fontWeight: 600, color: "#0F393B", marginBottom: "0.75rem" }}>Progress</h3>
              <div style={{ width: "100%", backgroundColor: "#e5e5e5", borderRadius: "9999px", height: "8px" }}>
                <div
                  style={{
                    backgroundColor: "#34B26A",
                    height: "100%",
                    borderRadius: "9999px",
                    width: `${progressPercent}%`,
                    transition: "width 0.3s"
                  }}
                />
              </div>
              <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.5rem" }}>
                {volunteersJoined} of {volunteersNeeded} volunteers confirmed
              </p>
            </div>
          )}

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
                fontWeight: 500,
                color: "#0F393B"
              }}
            >
              Close
            </button>
            {isArchived && (
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#ef8451",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                Review Details
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

