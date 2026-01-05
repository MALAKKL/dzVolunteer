"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import MissionCard from "../../../../components/orgdash/mission-cards"
import MissionDetailModal from "../../../../components/orgdash/modal/mission-detail-modal"

export default function ArchivedMissionsPage() {
  const [selectedMission, setSelectedMission] = useState(null)

  const archivedMissions = [
    {
      id: 101,
      title: "Winter Food Drive 2024",
      description: "Collected food donations for families in need during the holiday season.",
      location: "Downtown Distribution Center",
      startDate: "2024-11-15",
      endDate: "2024-12-20",
      volunteersNeeded: 20,
      competencies: ["Organization", "Community Service"],
      status: "Completed",
      image: "/food-drive.png",
    },
    {
      id: 102,
      title: "Tree Planting Initiative",
      description: "Planted over 500 trees to improve local air quality and green spaces.",
      location: "City Forest Reserve",
      startDate: "2024-10-01",
      endDate: "2024-10-31",
      volunteersNeeded: 25,
      competencies: ["Environmental Care", "Outdoor Work"],
      status: "Completed",
      image: "/community-tree-planting.png",
    },
  ]

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F5F3EE", padding: "2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header with Back Button */}
        <div style={{ marginBottom: "2rem" }}>
          <Link
            to="/orgdash/missions"
            style={{ color: "#34B26A", textDecoration: "none", fontWeight: 600, marginBottom: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            ← Back to Dashboard
          </Link>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#0F393B", marginTop: "1rem", marginBottom: "0.5rem" }}>All Archived Missions</h1>
          <p style={{ color: "#347362", marginTop: "0.5rem" }}>View completed volunteer missions</p>
        </div>

        {/* Missions Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {archivedMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} onClick={() => setSelectedMission(mission)} isArchived />
          ))}
        </div>
      </div>

      {/* Mission Detail Modal */}
      {selectedMission && <MissionDetailModal mission={selectedMission} onClose={() => setSelectedMission(null)} />}
    </div>
  )
}
