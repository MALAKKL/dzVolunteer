"use client"

export default function MissionCard({ mission, onClick, isArchived = false }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        cursor: "pointer",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        transition: "all 0.2s",
        overflow: "hidden"
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.15)"
        e.currentTarget.style.transform = "translateY(-4px)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"
        e.currentTarget.style.transform = "translateY(0)"
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", width: "100%", height: "192px", overflow: "hidden", background: "linear-gradient(to bottom right, #347362, #34B26A)" }}>
        <img 
          src={mission.image || "/placeholder.svg"} 
          alt={mission.title} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ padding: "1rem" }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.5rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {mission.title}
        </h3>

        <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "0.75rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {mission.description}
        </p>

        {/* Meta Info */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.75rem", color: "#666", marginBottom: "0.75rem" }}>
          <span>📍 {mission.location}</span>
          <span>📅 {mission.startDate}</span>
        </div>

        {/* Volunteers Badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ 
            display: "inline-block", 
            backgroundColor: "#34B26A", 
            color: "white", 
            padding: "0.25rem 0.75rem", 
            borderRadius: "9999px", 
            fontSize: "0.75rem", 
            fontWeight: 600 
          }}>
            {mission.volunteersNeeded} volunteers needed
          </span>
          {isArchived && <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#EF8451" }}>Completed</span>}
        </div>
      </div>
    </div>
  )
}
