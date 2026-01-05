"use client"

import { MissionCard } from "./missionscard"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const missions = [
  {
    title: "Planting 1 Million Trees",
    organizer: "khedra bidni allah",
    date: "1 april 2026",
    description: "Check the Schedule in our social media platforms",
    location: "Aldjoazer khedra",
    image: "/hands-planting-tree-seedling-in-soil.jpg",
  },
  {
    title: "Planting 1 Million Trees",
    organizer: "khedra bidni allah",
    date: "1 april 2026",
    description: "Check the Schedule in our social media platforms",
    location: "Aldjoazer khedra",
    image: "/hands-planting-tree-seedling-in-soil.jpg",
  },
  {
    title: "Planting 1 Million Trees",
    organizer: "khedra bidni allah",
    date: "1 april 2026",
    description: "Check the Schedule in our social media platforms",
    location: "Aldjoazer khedra",
    image: "/hands-planting-tree-seedling-in-soil.jpg",
  },
  {
    title: "Planting 1 Million Trees",
    organizer: "khedra bidni allah",
    date: "1 april 2026",
    description: "Check the Schedule in our social media platforms",
    location: "Aldjoazer khedra",
    image: "/hands-planting-tree-seedling-in-soil.jpg",
  },
  {
    title: "Planting 1 Million Trees",
    organizer: "khedra bidni allah",
    date: "1 april 2026",
    description: "Check the Schedule in our social media platforms",
    location: "Aldjoazer khedra",
    image: "/hands-planting-tree-seedling-in-soil.jpg",
  },
  {
    title: "Planting 1 Million Trees",
    organizer: "khedra bidni allah",
    date: "1 april 2026",
    description: "Check the Schedule in our social media platforms",
    location: "Aldjoazer khedra",
    image: "/hands-planting-tree-seedling-in-soil.jpg",
  },
]

export function MissionsList() {
  return (
    <section className="missions-list-section">
      <div className="missions-list-container">
        <div className="missions-list-grid">
          {missions.map((mission, index) => (
            <MissionCard key={index} {...mission} />
          ))}
        </div>

        {/* Pagination */}
        <div className="missions-pagination">
          <button className="missions-pagination-btn">
            <FaChevronLeft className="missions-pagination-icon" />
          </button>
          <button className="missions-pagination-btn">
            <FaChevronRight className="missions-pagination-icon" />
          </button>
        </div>
      </div>
    </section>
  )
}
