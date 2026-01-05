"use client"

import { FiUsers, FiBriefcase, FiCheckCircle, FiAlertCircle } from "react-icons/fi"
import { useState } from "react"
import CreateMissionModal from "./modal/create-mission-modal"
import { notifications } from "./data/notifications"

export default function MainDashboard({ onNavigate }) {
  const [showMissionModal, setShowMissionModal] = useState(false);

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#F5F3EE" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#0F393B", marginBottom: "0.5rem" }}>
          Welcome Back, Admin!
        </h1>
        <p style={{ color: "#6b7280" }}>Here's an overview of your volunteering organization</p>
      </div>

      {/* Stats Grid */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
        gap: "1.5rem", 
        marginBottom: "2rem" 
      }}>
        <div style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          borderLeft: "4px solid #34B26A",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "0.25rem" }}>Total Volunteers</p>
              <h3 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#0F393B" }}>248</h3>
            </div>
            <FiUsers size={48} style={{ color: "#34B26A", opacity: 0.2 }} />
          </div>
        </div>

        <div style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          borderLeft: "4px solid #EF8451",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "0.25rem" }}>Active Missions</p>
              <h3 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#0F393B" }}>12</h3>
            </div>
            <FiBriefcase size={48} style={{ color: "#EF8451", opacity: 0.2 }} />
          </div>
        </div>

        <div style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          borderLeft: "4px solid #347362",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "0.25rem" }}>Completed</p>
              <h3 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#0F393B" }}>156</h3>
            </div>
            <FiCheckCircle size={48} style={{ color: "#347362", opacity: 0.2 }} />
          </div>
        </div>

        <div style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          borderLeft: "4px solid #ef4444",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "0.25rem" }}>Pending Approvals</p>
              <h3 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#0F393B" }}>8</h3>
            </div>
            <FiAlertCircle size={48} style={{ color: "#ef4444", opacity: 0.2 }} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "1.5rem" }}>
        <div style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0F393B", marginBottom: "1rem" }}>Quick Actions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <button
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "transparent",
                border: "1px solid #34B26A",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 500,
                textAlign: "left",
                color: '#34B26A',
                transition: "box-shadow 0.2s, transform 0.1s, border-color 0.2s, color 0.2s, background 0.2s",
                boxShadow: "0 1px 4px rgba(52,178,106,0.07)",
                outline: "none"
              }}
              onMouseOver={e => {
                e.currentTarget.style.boxShadow = "0 2px 8px 2px #34B26a22";
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.borderColor = "#34B26A";
                e.currentTarget.style.color = "#0F393B";
                e.currentTarget.style.background = "#eafaf3";
              }}
              onMouseOut={e => {
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(52,178,106,0.07)";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "#34B26A";
                e.currentTarget.style.color = "#34B26A";
                e.currentTarget.style.background = "transparent";
              }}
              onMouseDown={e => {
                e.currentTarget.style.transform = "scale(0.98)";
              }}
              onMouseUp={e => {
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onClick={() => setShowMissionModal(true)}
            >
              Create New Mission
            </button>
            <button
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "transparent",
                border: "1px solid #34B26A",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 500,
                textAlign: "left",
                color: '#34B26A',
                transition: "box-shadow 0.2s, transform 0.1s, border-color 0.2s, color 0.2s, background 0.2s",
                boxShadow: "0 1px 4px rgba(52,178,106,0.07)",
                outline: "none"
              }}
              onMouseOver={e => {
                e.currentTarget.style.boxShadow = "0 2px 8px 2px #34B26a22";
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.borderColor = "#34B26A";
                e.currentTarget.style.color = "#0F393B";
                e.currentTarget.style.background = "#eafaf3";
              }}
              onMouseOut={e => {
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(52,178,106,0.07)";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "#34B26A";
                e.currentTarget.style.color = "#34B26A";
                e.currentTarget.style.background = "transparent";
              }}
              onMouseDown={e => {
                e.currentTarget.style.transform = "scale(0.98)";
              }}
              onMouseUp={e => {
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onClick={() => onNavigate && onNavigate("volunteers")}
            >
              Review Volunteer Applications
            </button>
            <button
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "transparent",
                border: "1px solid #34B26A",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 500,
                textAlign: "left",
                color: '#34B26A',
                transition: "box-shadow 0.2s, transform 0.1s, border-color 0.2s, color 0.2s, background 0.2s",
                boxShadow: "0 1px 4px rgba(52,178,106,0.07)",
                outline: "none"
              }}
              onMouseOver={e => {
                e.currentTarget.style.boxShadow = "0 2px 8px 2px #34B26a22";
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.borderColor = "#34B26A";
                e.currentTarget.style.color = "#0F393B";
                e.currentTarget.style.background = "#eafaf3";
              }}
              onMouseOut={e => {
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(52,178,106,0.07)";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "#34B26A";
                e.currentTarget.style.color = "#34B26A";
                e.currentTarget.style.background = "transparent";
              }}
              onMouseDown={e => {
                e.currentTarget.style.transform = "scale(0.98)";
              }}
              onMouseUp={e => {
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onClick={() => onNavigate && onNavigate("profile")}
            >
              View Organization Profile
            </button>
          </div>
        </div>

        <div style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0F393B", marginBottom: "1rem" }}>Recent Activity</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {notifications.slice(0, 3).map((notification, index) => {
              const colorMap = {
                success: "#34B26A",
                alert: "#347362",
                info: "#EF8451"
              }
              const color = colorMap[notification.type] || "#6b7280"
              const isLast = index === Math.min(notifications.length - 1, 2)
              
              return (
                <div 
                  key={notification.id}
                  style={{ 
                    display: "flex", 
                    gap: "1rem", 
                    paddingBottom: isLast ? "0" : "1rem", 
                    borderBottom: isLast ? "none" : "1px solid #e5e5e5" 
                  }}
                >
                  <div style={{ 
                    width: "8px", 
                    height: "8px", 
                    borderRadius: "50%", 
                    backgroundColor: color, 
                    marginTop: "8px", 
                    flexShrink: 0 
                  }}></div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#0F393B" }}>{notification.title}</p>
                    <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>{notification.message}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* Modal for Creating Mission */}
      {showMissionModal && (
        <CreateMissionModal
          onClose={() => setShowMissionModal(false)}
          onSave={(missionData) => {
            // Handle mission creation here
            console.log("New mission created:", missionData)
            // You can add API call here later
            setShowMissionModal(false)
          }}
        />
      )}
    </div>
  )
}

