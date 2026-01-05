import { useState } from "react"

import Sidebar from "../components/org/dash_sidebar.jsx"
import Profile from "../components/org/dash_profile.jsx"
import Missions from "../components/org/dash_missions.jsx"
import Volunteers from "../components/org/dash_volunteers.jsx"
import Notifications from "../components/org/dash_notifications.jsx"

import styles from "../styles/dashOrg.module.css" 

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
