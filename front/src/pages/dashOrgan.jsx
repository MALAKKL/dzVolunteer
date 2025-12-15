import { useState } from "react"

import Sidebar from "../components/dash_sidebar"
import Profile from "../components/dash_profile"
import Missions from "../components/dash_missions"
import Volunteers from "../components/dash_volunteers"
import Notifications from "../components/dash_notifications"

import styles from "../styles/dashOrg.module.css" // ✅ CSS Module

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState("profile")

  const renderPage = () => {
    switch (currentPage) {
      case "profile":
        return <Profile />
      case "missions":
        return <Missions />
      case "volunteers":
        return <Volunteers />
      case "notifications":
        return <Notifications />
      default:
        return <Profile />
    }
  }

  return (
    <div className={styles["dashboard-container"]}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      <main className={styles["main-content"]}>
        {renderPage()}
      </main>
    </div>
  )
}
