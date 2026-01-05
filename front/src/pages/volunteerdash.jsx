"use client"

import { useState } from "react"
import Sidebar from "../components/volunteerdash/sidebar"
import DashboardContent from "../components/volunteerdash/dashcontent"
import "../styles/volunteerdash.css"

export default function VolunteerDash() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-auto">
        <DashboardContent page={currentPage} />
      </main>
    </div>
  )
}
