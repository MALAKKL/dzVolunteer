"use client"

import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { FiBriefcase, FiClock, FiCheckCircle, FiArrowRight } from "react-icons/fi"

export default function MainDashboard() {
  const userName = "John Doe"

  const lastCurrentMission = {
    title: "Beach Cleanup Initiative",
    status: "Applied",
    date: "2024-01-20",
    image: "/beach-cleanup-volunteers.png",
  }

  const lastArchivedMission = {
    title: "Community Food Drive",
    status: "Completed",
    date: "2023-12-15",
    image: "/food-drive.png",
  }

  return (
    <div className="p-8 bg-gradient-to-br from-background to-muted/30 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Hello, {userName}!</h1>
        <p className="text-muted-foreground">Welcome back to your volunteer portal. Ready to make an impact today?</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-primary/10 border-none shadow-none">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary rounded-xl text-primary-foreground">
              <FiClock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-primary font-medium text-sm">Contribution Hours</p>
              <h3 className="text-3xl font-bold text-foreground">142.5</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-secondary/10 border-none shadow-none">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-xl text-secondary-foreground">
              <FiBriefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-secondary font-medium text-sm">Active Missions</p>
              <h3 className="text-3xl font-bold text-foreground">3</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-accent/10 border-none shadow-none">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent rounded-xl text-accent-foreground">
              <FiCheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-accent font-medium text-sm">Completed</p>
              <h3 className="text-3xl font-bold text-foreground">24</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Last Current Mission */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Last Current Mission</h2>
            <Button variant="ghost" className="text-primary hover:bg-primary/10">
              View All <FiArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
            <div className="aspect-[21/9] overflow-hidden relative">
              <img
                src={lastCurrentMission.image || "/placeholder.svg"}
                alt={lastCurrentMission.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-primary-foreground border-none">Applied</Badge>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">{lastCurrentMission.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">Next session: {lastCurrentMission.date}</p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Go to Mission</Button>
            </div>
          </Card>
        </div>

        {/* Last Archived Mission */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Last Archived Mission</h2>
            <Button variant="ghost" className="text-accent hover:bg-accent/10">
              History <FiArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 opacity-90">
            <div className="aspect-[21/9] overflow-hidden relative grayscale-[30%]">
              <img
                src={lastArchivedMission.image || "/placeholder.svg"}
                alt={lastArchivedMission.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                  Completed
                </Badge>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">{lastArchivedMission.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">Completed on: {lastArchivedMission.date}</p>
              <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10 bg-transparent">
                Review Details
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
