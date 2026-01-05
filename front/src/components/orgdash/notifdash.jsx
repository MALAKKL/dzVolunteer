"use client"

import { FiTrash2, FiCheckCircle, FiAlertCircle, FiInfo, FiClock } from "react-icons/fi"

const notifications = [
  {
    id: 1,
    type: "success",
    title: "New Volunteer Registered",
    message: "Sarah Johnson has successfully registered and is ready to volunteer",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    type: "alert",
    title: "Mission Deadline Approaching",
    message: "The Beach Cleanup Initiative mission starts in 3 days",
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    type: "info",
    title: "Application Received",
    message: "Michael Chen has applied for the Youth Sports Training mission",
    timestamp: "1 day ago",
  },
  {
    id: 4,
    type: "info",
    title: "Mission Completed",
    message: "The Community Garden Project has been successfully completed",
    timestamp: "2 days ago",
  },
]

export default function NotificationsPage() {
  const iconMap = {
    success: <FiCheckCircle size={20} style={{ color: "#34B26A" }} />,
    alert: <FiAlertCircle size={20} style={{ color: "#347362" }} />,
    info: <FiInfo size={20} style={{ color: "#EF8451" }} />,
  }

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#F5F3EE" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#0F393B", marginBottom: "0.5rem" }}>Notifications</h1>
        <p style={{ color: "#6b7280" }}>Stay updated with all important events</p>
      </div>

      {/* Notifications List */}
      <div style={{ maxWidth: "768px", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {notifications.map((notification) => {
          return (
            <div
              key={notification.id}
              style={{
                backgroundColor: "white",
                padding: "1rem",
                borderRadius: "8px",
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                transition: "box-shadow 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"}
            >
              <div style={{ marginTop: "4px", flexShrink: 0 }}>
                {iconMap[notification.type]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontWeight: 600, color: "#0F393B", marginBottom: "0.25rem" }}>{notification.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>{notification.message}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <FiClock size={12} style={{ color: "#6b7280" }} />
                  <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>{notification.timestamp}</span>
                </div>
              </div>
              <button
                style={{
                  flexShrink: 0,
                  padding: "0.25rem",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#ef4444"
                }}
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
