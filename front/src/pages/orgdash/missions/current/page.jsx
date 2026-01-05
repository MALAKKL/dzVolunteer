"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import MissionCard from "../../../../components/orgdash/mission-cards"
import MissionDetailModal from "../../../../components/orgdash/modal/mission-detail-modal"

export default function CurrentMissionsPage() {
  const [selectedMission, setSelectedMission] = useState(null)

  const missions = [
    {
      id: 1,
      title: "Beach Cleanup Drive",
      description: "Join us in cleaning up the local beach and protecting marine life.",
      location: "Sunset Beach Park",
      startDate: "2025-12-05",
      endDate: "2025-12-05",
      volunteersNeeded: 15,
      competencies: ["Physical Fitness", "Environmental Awareness"],
      status: "Active",
      image: "/beach-cleanup-volunteers.png",
    },
    {
      id: 2,
      title: "Community Garden Development",
      description: "Help us build and maintain a community garden to grow fresh vegetables for local families.",
      location: "Central Community Center",
      startDate: "2025-12-10",
      endDate: "2025-12-31",
      volunteersNeeded: 8,
      competencies: ["Gardening", "Teamwork"],
      status: "Active",
      image: "/community-garden.png",
    },
    {
      id: 3,
      title: "Youth Sports Training",
      description: "Mentor young athletes and help develop their sports skills through coaching.",
      location: "Central Sports Complex",
      startDate: "2025-12-15",
      endDate: "2026-01-15",
      volunteersNeeded: 12,
      competencies: ["Sports", "Coaching", "Leadership"],
      status: "Active",
      image: "/youth-sports-training.jpg",
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
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#0F393B", marginTop: "1rem", marginBottom: "0.5rem" }}>All Current Missions</h1>
          <p style={{ color: "#347362", marginTop: "0.5rem" }}>Browse all active volunteer opportunities</p>
        </div>

        {/* Missions Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {missions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} onClick={() => setSelectedMission(mission)} />
          ))}
        </div>
      </div>

      {/* Mission Detail Modal */}
      {selectedMission && <MissionDetailModal mission={selectedMission} onClose={() => setSelectedMission(null)} />}
    </div>
  )
}
