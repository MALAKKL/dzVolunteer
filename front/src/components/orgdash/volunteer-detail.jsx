"use client"

import { useState } from "react"
import { FiX, FiMail, FiFileText } from "react-icons/fi"

export function VolunteerDetailModal({ volunteer, onClose }) {
  const [status, setStatus] = useState(volunteer.status)

  const handleAccept = () => {
    setStatus("Accepted")
    setTimeout(onClose, 500)
  }

  const handleReject = () => {
    setStatus("Rejected")
    setTimeout(onClose, 500)
  }

  const handleRemove = () => {
    onClose()
  }

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
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.5rem",
          borderBottom: "1px solid #e5e5e5"
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0F393B" }}>Volunteer Details</h2>
          <button
            onClick={onClose}
            style={{
              color: "#6b7280",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer"
            }}
          >
            <FiX size={24} />
          </button>
        </div>

        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Profile Section */}
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <img
              src={volunteer.photo || volunteer.avatar || "/placeholder.svg"}
              alt={volunteer.name}
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #347362"
              }}
            />
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0F393B" }}>{volunteer.name}</h2>
              <a
                href={`mailto:${volunteer.email}`}
                style={{
                  color: "#34B26A",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "0.5rem"
                }}
              >
                <FiMail size={16} />
                {volunteer.email}
              </a>
              <div style={{ marginTop: "0.75rem" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    borderRadius: "9999px",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    ...(status === "Accepted" || status === "Approved"
                      ? { backgroundColor: "#f0fdf4", color: "#34B26A" }
                      : status === "Pending"
                        ? { backgroundColor: "#fff7ed", color: "#EF8451" }
                        : { backgroundColor: "#fef2f2", color: "#ef4444" })
                  }}
                >
                  {status}
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          {volunteer.bio && (
            <div>
              <h3 style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                color: "#0F393B",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem"
              }}>
                <FiFileText size={20} style={{ color: "#34B26A" }} />
                About
              </h3>
              <p style={{ color: "#6b7280", lineHeight: "1.6" }}>{volunteer.bio}</p>
            </div>
          )}

          {/* Competencies */}
          {volunteer.competencies && volunteer.competencies.length > 0 && (
            <div>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.75rem" }}>
                Competencies
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {volunteer.competencies.map((comp, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: "#F2EBE4",
                      color: "#0F393B",
                      padding: "0.5rem 1rem",
                      borderRadius: "9999px",
                      fontSize: "0.875rem",
                      fontWeight: 500
                    }}
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Mission Preview */}
          {volunteer.missionAppliedFor && (
            <div style={{
              backgroundColor: "#F5F3EE",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid rgba(52, 115, 98, 0.2)"
            }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.5rem" }}>
                Applied Mission
              </h3>
              <div style={{
                backgroundColor: "white",
                padding: "1rem",
                borderRadius: "6px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
              }}>
                <p style={{ fontWeight: 600, color: "#0F393B", fontSize: "1.125rem" }}>
                  {volunteer.missionAppliedFor}
                </p>
                {volunteer.missionId && (
                  <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.25rem" }}>
                    Mission ID: #{volunteer.missionId}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "0.75rem", paddingTop: "1rem", marginTop: "1rem", borderTop: "1px solid #e5e5e5" }}>
            <button
              onClick={handleAccept}
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
              Accept
            </button>
            <button
              onClick={handleReject}
              style={{
                flex: 1,
                padding: "0.75rem",
                border: "1px solid #EF8451",
                color: "#EF8451",
                backgroundColor: "transparent",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 500
              }}
            >
              Reject
            </button>
            <button
              onClick={handleRemove}
              style={{
                flex: 1,
                padding: "0.75rem",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
