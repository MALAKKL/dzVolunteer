"use client"

import ProfilePage from "./prifile"
import MissionsPage from "./missionpage"
import NotificationsPage from "./notif"
import MainDashboard from "./maindash"

export default function DashboardContent({ page }) {
  switch (page) {
    case "dashboard":
      return <MainDashboard />
    case "profile":
      return <ProfilePage />
    case "missions":
      return <MissionsPage />
    case "notifications":
      return <NotificationsPage />
    default:
      return <MainDashboard />
  }
}
