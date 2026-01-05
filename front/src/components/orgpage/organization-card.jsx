import React from "react";
import "../../styles/orgpage.css"

export function OrganizationCard({ title, subtitle, description, image, onSeeMore }) {
  return (
    <div className="bg-accent rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <div className="flex flex-col md:flex-row gap-6 p-6">
        <div className="w-full md:w-48 h-48 flex-shrink-0">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <img src={image || "/placeholder.svg"} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between text-accent-foreground">
          <div>
            <h3 className="text-2xl font-bold mb-1">{title}</h3>
            <p className="text-sm font-semibold mb-2 opacity-90">{subtitle}</p>
            <p className="text-xs uppercase tracking-wider mb-3 opacity-80">description</p>
            <p className="text-sm leading-relaxed">{description}</p>
          </div>

          <div className="mt-4">
            <button
              onClick={onSeeMore}
              className="bg-white text-primary hover:bg-white/90"
              style={{ padding: "0.5rem 1rem", borderRadius: "8px", border: "none", fontWeight: 600, cursor: "pointer" }}
            >
              see more
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
