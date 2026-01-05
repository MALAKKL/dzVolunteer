"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import MissionCard from "../../../components/orgdash/mission-cards"
import CreateMissionModal from "../../../components/orgdash/modal/create-mission-modal"
import MissionDetailModal from "../../../components/orgdash/modal/mission-detail-modal"

export default function MissionsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedMission, setSelectedMission] = useState(null)
  const [missions, setMissions] = useState([
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
  ])

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

  const handleAddMission = (newMission) => {
    setMissions([...missions, { ...newMission, id: missions.length + 1 }])
    setShowCreateModal(false)
  }

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#F5F3EE" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#0F393B", marginBottom: "0.5rem" }}>Missions</h1>
        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>Manage volunteer opportunities and track mission progress</p>
      </div>

      {/* Create Mission Button */}
      <button
        onClick={() => setShowCreateModal(true)}
        style={{
          backgroundColor: "#34B26A",
          color: "white",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          marginBottom: "2rem"
        }}
      >
        ➕ Create New Mission
      </button>

      {/* Current Missions Section */}
      <div style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#0F393B" }}>Current Missions</h2>
          <Link to="/orgdash/missions/current" style={{ color: "#34B26A", textDecoration: "none", fontWeight: 600 }}>
            See All →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {missions.slice(0, 3).map((mission) => (
            <MissionCard key={mission.id} mission={mission} onClick={() => setSelectedMission(mission)} />
          ))}
        </div>
        {missions.length === 0 && (
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "3rem",
            textAlign: "center",
            border: "2px dashed #e5e5e5"
          }}>
            <p style={{ color: "#6b7280", marginBottom: "1rem" }}>No current missions yet.</p>
            <button
              onClick={() => setShowCreateModal(true)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#34B26A",
                cursor: "pointer",
                textDecoration: "underline"
              }}
            >
              Create your first mission
            </button>
          </div>
        )}
      </div>

      {/* Archived Missions Section */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#0F393B" }}>Archived Missions</h2>
          <Link to="/orgdash/missions/archived" style={{ color: "#34B26A", textDecoration: "none", fontWeight: 600 }}>
            See All →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {archivedMissions.slice(0, 3).map((mission) => (
            <MissionCard key={mission.id} mission={mission} onClick={() => setSelectedMission(mission)} isArchived />
          ))}
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && <CreateMissionModal onClose={() => setShowCreateModal(false)} onSave={handleAddMission} />}
      {selectedMission && <MissionDetailModal mission={selectedMission} onClose={() => setSelectedMission(null)} />}
    </div>
  )
}
