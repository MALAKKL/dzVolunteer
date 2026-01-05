import React from "react"
import "../../styles/orgpage.css"
const missions = [
  {
    id: 1,
    title: "social",
    category: "Artisan",
    subcategory: "organization",
    image: "/team-collaboration-volunteer-work.jpg",
  },
  {
    id: 2,
    title: "social",
    category: "Artisan",
    subcategory: "organization",
    image: "/team-collaboration-volunteer-work.jpg",
  },
  {
    id: 3,
    title: "social",
    category: "Artisan",
    subcategory: "organization",
    image: "/team-collaboration-volunteer-work.jpg",
  },
]

export function MissionsSection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Missions</h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto">
            Explore the top organizations turning passion into meaningful change
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {missions.map((mission) => (
            <div key={mission.id} className="overflow-hidden bg-card" style={{ borderRadius: "8px", overflow: "hidden", backgroundColor: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <div className="relative h-48 w-full">
                <img src={mission.image || "/placeholder.svg"} alt={mission.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-card-foreground" style={{ color: "#1a1a1a" }}>{mission.title}</h3>
                <p className="text-sm text-muted-foreground mb-1" style={{ color: "#6b7280" }}>{mission.category}</p>
                <p className="text-sm text-muted-foreground mb-4" style={{ color: "#6b7280" }}>{mission.subcategory}</p>
                <button style={{ padding: "0.5rem 1rem", borderRadius: "8px", border: "none", fontWeight: 600, cursor: "pointer", background: "#00796b", color: "#fff" }}>
                  see more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
