"use client"

import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { FiTrash2, FiCheckCircle, FiAlertCircle, FiInfo, FiClock } from "react-icons/fi"

const notifications = [
  {
    id: 1,
    type: "success",
    title: "Application Approved!",
    message: "Your application for 'Beach Cleanup Initiative' has been approved. See you there!",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    type: "alert",
    title: "Upcoming Session",
    message: "Reminder: The Community Garden Project starts in 24 hours.",
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    type: "info",
    title: "Hours Verified",
    message: "Your 5 contribution hours for 'Youth Sports' have been verified by the admin.",
    timestamp: "1 day ago",
  },
  {
    id: 4,
    type: "info",
    title: "Mission Completed",
    message: "The Community Garden Project has been successfully completed",
    timestamp: "2 days ago",
  },
]

export default function NotificationsPage() {
  return (
    <div className="p-8 bg-gradient-to-br from-background to-muted/30 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Notifications</h1>
        <p className="text-muted-foreground">Stay updated with all important events</p>
      </div>

      {/* Notifications List */}
      <div className="max-w-3xl space-y-4">
        {notifications.map((notification) => {
          const iconMap = {
            success: <FiCheckCircle className="w-5 h-5 text-primary" />,
            alert: <FiAlertCircle className="w-5 h-5 text-accent" />,
            info: <FiInfo className="w-5 h-5 text-secondary" />,
          }

          return (
            <Card key={notification.id} className="p-4 flex items-start gap-4 hover:shadow-md transition-all">
              <div className="mt-1 flex-shrink-0">{iconMap[notification.type]}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-1">{notification.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                <div className="flex items-center gap-2">
                  <FiClock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="flex-shrink-0 text-destructive hover:bg-destructive/10">
                <FiTrash2 className="w-4 h-4" />
              </Button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
