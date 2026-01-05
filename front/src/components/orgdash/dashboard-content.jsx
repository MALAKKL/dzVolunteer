"use client"

import { useState } from "react"
import MainDashboard from "./maindash"
import ProfilePage from "./profiledash"
import MissionsPage from "./missiondash"
import VolunteersPage from "./volunteersdash"
import NotificationsPage from "./notifdash"
import MissionVolunteersPage from "./misshion-volunteers-dash"

export default function DashboardContent({ page }) {
  const [selectedMissionFilter, setSelectedMissionFilter] = useState(null)

  const handleShowVolunteersByMission = (missionId, missionTitle, isArchived) => {
    setSelectedMissionFilter({ id: missionId, title: missionTitle, isArchived })
  }

  switch (page) {
    case "dashboard":
      return <MainDashboard />
    case "profile":
      return <ProfilePage />
    case "missions":
      return <MissionsPage onShowVolunteers={handleShowVolunteersByMission} />
    case "volunteers":
      if (selectedMissionFilter) {
        return (
          <MissionVolunteersPage
            missionId={selectedMissionFilter.id}
            missionTitle={selectedMissionFilter.title}
            isArchived={selectedMissionFilter.isArchived}
            onBack={() => setSelectedMissionFilter(null)}
          />
        )
      }
      return (
        <VolunteersPage
          missionFilter={selectedMissionFilter}
          onClearMissionFilter={() => setSelectedMissionFilter(null)}
        />
      )
    case "notifications":
      return <NotificationsPage />
    default:
      return <MainDashboard />
  }
}
