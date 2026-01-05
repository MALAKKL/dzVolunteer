import React from "react";
import "../../styles/orgpage.css"

export function SearchSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#009688" }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">search for an organization</h1>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="search for a organization"
              className="w-full px-6 py-3 rounded-full border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
