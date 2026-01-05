"use client"

import { useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { FiArrowRight, FiArchive, FiClock, FiCheckCircle, FiMapPin, FiBriefcase } from "react-icons/fi"
import MissionDetailModal from "./mission-detail-modal"

const currentMissions = [
  {
    id: 1,
    title: "Beach Cleanup Initiative",
    description: "Join us for a day of cleaning our local beaches",
    image: "/beach-cleanup-volunteers.png",
    date: "2024-01-20",
    location: "Santa Monica Beach",
    volunteersNeeded: 15,
    volunteersJoined: 8,
    status: "applied",
  },
  {
    id: 2,
    title: "Community Garden Project",
    description: "Help plant and maintain our community garden",
    image: "/community-garden.png",
    date: "2024-01-25",
    location: "Downtown Community Center",
    volunteersNeeded: 20,
    volunteersJoined: 12,
    status: "applied",
  },
]

const appliedMissions = [
  {
    id: 3,
    title: "Youth Sports Training",
    description: "Mentor underprivileged youth in sports",
    image: "/youth-sports-training.jpg",
    date: "2024-02-01",
    location: "Central Park",
    volunteersNeeded: 10,
    volunteersJoined: 6,
    status: "accepted",
  },
]

const archivedMissions = [
  {
    id: 4,
    title: "Food Drive 2023",
    description: "Collected food donations for local charities",
    image: "/food-drive.png",
    date: "2023-12-15",
    location: "Various Locations",
    volunteersNeeded: 25,
    volunteersJoined: 25,
    status: "archived",
  },
  {
    id: 5,
    title: "Tree Planting Day",
    description: "Planting trees in the city park",
    image: "/tree-planting.jpg",
    date: "2023-11-10",
    location: "Green Valley",
    volunteersNeeded: 50,
    volunteersJoined: 48,
    status: "archived",
  },
]

export default function MissionsPage() {
  const [selectedMission, setSelectedMission] = useState(null)
  const [isArchived, setIsArchived] = useState(false)

  const getDaysLeft = (dateStr) => {
    const targetDate = new Date(dateStr)
    const today = new Date("2024-01-04") // Mocking current date based on instructions
    const diffTime = targetDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? `${diffDays} days left` : "Starting today"
  }

  const handleSelectMission = (mission, archived) => {
    setSelectedMission(mission)
    setIsArchived(archived)
  }

  return (
    <div className="p-8 bg-gradient-to-br from-background to-muted/30 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Volunteer Missions</h1>
        <p className="text-muted-foreground">Discover new opportunities and track your participation</p>
      </div>

      {/* Applied Missions Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <FiClock className="w-6 h-6 text-primary" />
          Missions Accepted
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appliedMissions.map((mission) => (
            <Card
              key={mission.id}
              className="overflow-hidden hover:shadow-lg transition-all cursor-pointer border-primary/20 bg-primary/5"
              onClick={() => handleSelectMission(mission, false)}
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30 border-none">
                    Accepted
                  </Badge>
                  <span className="text-xs font-bold text-primary">{getDaysLeft(mission.date)}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{mission.title}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-4">
                  <FiMapPin className="w-3 h-3" /> {mission.location}
                </p>
                <div className="w-full bg-muted rounded-full h-1.5 mb-2">
                  <div
                    className="bg-primary h-1.5 rounded-full"
                    style={{ width: `${(mission.volunteersJoined / mission.volunteersNeeded) * 100}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-muted-foreground text-right uppercase tracking-wider">
                  Waiting for confirmation
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Current Missions Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FiBriefcase className="w-6 h-6 text-secondary" />
            Applied Missions
          </h2>
          <Button variant="ghost" className="text-secondary hover:bg-secondary/10">
            Browse More <FiArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentMissions.map((mission) => (
            <Card
              key={mission.id}
              className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => handleSelectMission(mission, false)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={mission.image || "/placeholder.svg"}
                  alt={mission.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-secondary text-secondary-foreground border-none shadow-sm">Applied</Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-foreground mb-1">{mission.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{mission.description}</p>
                <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                  <span className="flex items-center gap-1">📍 {mission.location}</span>
                  <span className="flex items-center gap-1">👥 {mission.volunteersJoined} joined</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Archived Missions Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FiCheckCircle className="w-6 h-6 text-accent" />
            All Archived Missions
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archivedMissions.map((mission) => (
            <Card
              key={mission.id}
              className="overflow-hidden hover:shadow-lg transition-all cursor-pointer opacity-80 hover:opacity-100"
              onClick={() => handleSelectMission(mission, true)}
            >
              <div className="aspect-video relative overflow-hidden grayscale-[50%] hover:grayscale-0 transition-all">
                <img
                  src={mission.image || "/placeholder.svg"}
                  alt={mission.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Badge className="bg-accent text-accent-foreground">
                    <FiArchive className="w-3 h-3 mr-1" />
                    Review Mission
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-foreground mb-1">{mission.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground italic">Completed on {mission.date}</span>
                  <Badge variant="outline" className="text-[10px] uppercase border-accent text-accent">
                    Completed
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedMission && (
        <MissionDetailModal
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
          isArchived={isArchived}
        />
      )}
    </div>
  )
}
