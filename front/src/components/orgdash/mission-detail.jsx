"use client"

import { useState } from "react"
import { FiX } from "react-icons/fi"

export function MissionDetailModal({ mission, onClose }) {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  if (!isOpen) return null

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
        maxWidth: "42rem",
        width: "100%",
        maxHeight: "90vh",
        overflow: "auto",
        border: "1px solid #E0D5C7"
      }}>
        {/* Header with Image */}
        <div
          style={{
            height: "192px",
            width: "100%",
            marginTop: "-1.5rem",
            marginLeft: "-1.5rem",
            marginRight: "-1.5rem",
            marginBottom: "1rem",
            borderRadius: "12px 12px 0 0",
            backgroundImage: `url(${mission.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            background: mission.image ? `url(${mission.image})` : "linear-gradient(to bottom right, #347362, #34B26A)",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />

        <div style={{ padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0F393B", marginBottom: "0.5rem" }}>
            {mission.title}
          </h2>
          <p style={{ color: "#666", marginBottom: "1.5rem" }}>{mission.status}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Description */}
            <div>
              <label style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "#347362", display: "block", marginBottom: "0.5rem" }}>
                Description
              </label>
              <p style={{ color: "#0F393B", marginTop: "0.5rem", lineHeight: "1.6" }}>{mission.description}</p>
            </div>

            {/* Location */}
            <div>
              <label style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "#347362", display: "block", marginBottom: "0.5rem" }}>
                Location
              </label>
              <p style={{ color: "#0F393B", marginTop: "0.5rem" }}>📍 {mission.location}</p>
            </div>

            {/* Date Range */}
            <div>
              <label style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "#347362", display: "block", marginBottom: "0.5rem" }}>
                Date Range
              </label>
              <p style={{ color: "#0F393B", marginTop: "0.5rem" }}>
                📅 {mission.startDate ? new Date(mission.startDate).toLocaleDateString() : mission.date} - {mission.endDate ? new Date(mission.endDate).toLocaleDateString() : mission.date}
              </p>
            </div>

            {/* Volunteers */}
            <div>
              <label style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "#347362", display: "block", marginBottom: "0.5rem" }}>
                Volunteers Needed
              </label>
              <p style={{ color: "#0F393B", marginTop: "0.5rem", fontWeight: 600, fontSize: "1.125rem" }}>
                {mission.volunteersNeeded} slots available
              </p>
            </div>

            {/* Competencies */}
            {mission.competencies && mission.competencies.length > 0 && (
              <div>
                <label style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "#347362", display: "block", marginBottom: "0.5rem" }}>
                  Competencies Required
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                  {mission.competencies.map((comp, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: "#F2EBE4",
                        color: "#347362",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px",
                        fontSize: "0.875rem"
                      }}
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Status */}
            <div>
              <label style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, color: "#347362", display: "block", marginBottom: "0.5rem" }}>
                Status
              </label>
              <p style={{ color: "#0F393B", marginTop: "0.5rem" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "6px",
                    fontWeight: 600,
                    color: "white",
                    backgroundColor: mission.status === "Active" ? "#34B26A" : "#EF8451"
                  }}
                >
                  {mission.status}
                </span>
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{ display: "flex", gap: "0.75rem", paddingTop: "1.5rem", marginTop: "1.5rem", borderTop: "1px solid #E0D5C7" }}>
            <button
              onClick={handleClose}
              style={{
                flex: 1,
                padding: "0.75rem",
                border: "1px solid #E0D5C7",
                color: "#0F393B",
                backgroundColor: "transparent",
                borderRadius: "6px",
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
                backgroundColor: "#34B26A",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              Edit Mission
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
