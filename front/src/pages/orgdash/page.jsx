"use client"

import { useState } from "react"
import Sidebar from "../../components/orgdash/sidebar"
import DashboardContent from "../../components/orgdash/dashboard-content"

export default function OrgDashPage() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#F5F3EE" }}>
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main style={{ flex: 1, overflow: "auto" }}>
        <DashboardContent page={currentPage} />
      </main>
    </div>
  )
}
