"use client"

import React, { useState } from "react";
import { OrganizationCard } from "./organization-card"
import { OrganizationDetailModal } from "./organization-detail-modal"
import "../../styles/orgpage.css"

const organizations = [
  {
    id: 1,
    title: "The hope dose",
    subtitle: "islam belerbi",
    description:
      'ope Dose is a foundation that "plants hope" for cancer patients by raising awareness, knowledge, emotional and spiritual support using creative content and community-driven projects.',
    image: "/hands-holding-plant-seedling-nature.jpg",
    creationDate: "20/1/2024",
    location: "btana",
    competenceNeeded: "team working ....",
  },
  {
    id: 2,
    title: "The hope dose",
    subtitle: "islam belerbi",
    description:
      'ope Dose is a foundation that "plants hope" for cancer patients by raising awareness, knowledge, emotional and spiritual support using creative content and community-driven projects.',
    image: "/hands-holding-plant-seedling-nature.jpg",
    creationDate: "20/1/2024",
    location: "btana",
    competenceNeeded: "team working ....",
  },
  {
    id: 3,
    title: "The hope dose",
    subtitle: "islam belerbi",
    description:
      'ope Dose is a foundation that "plants hope" for cancer patients by raising awareness, knowledge, emotional and spiritual support using creative content and community-driven projects.',
    image: "/hands-holding-plant-seedling-nature.jpg",
    creationDate: "20/1/2024",
    location: "btana",
    competenceNeeded: "team working ....",
  },
  {
    id: 4,
    title: "The hope dose",
    subtitle: "islam belerbi",
    description:
      'ope Dose is a foundation that "plants hope" for cancer patients by raising awareness, knowledge, emotional and spiritual support using creative content and community-driven projects.',
    image: "/hands-holding-plant-seedling-nature.jpg",
    creationDate: "20/1/2024",
    location: "btana",
    competenceNeeded: "team working ....",
  },
  {
    id: 5,
    title: "The hope dose",
    subtitle: "islam belerbi",
    description:
      'ope Dose is a foundation that "plants hope" for cancer patients by raising awareness, knowledge, emotional and spiritual support using creative content and community-driven projects.',
    image: "/hands-holding-plant-seedling-nature.jpg",
    creationDate: "20/1/2024",
    location: "btana",
    competenceNeeded: "team working ....",
  },
  {
    id: 6,
    title: "The hope dose",
    subtitle: "islam belerbi",
    description:
      'ope Dose is a foundation that "plants hope" for cancer patients by raising awareness, knowledge, emotional and spiritual support using creative content and community-driven projects.',
    image: "/hands-holding-plant-seedling-nature.jpg",
    creationDate: "20/1/2024",
    location: "btana",
    competenceNeeded: "team working ....",
  },
  {
    id: 7,
    title: "The hope dose",
    subtitle: "islam belerbi",
    description:
      'ope Dose is a foundation that "plants hope" for cancer patients by raising awareness, knowledge, emotional and spiritual support using creative content and community-driven projects.',
    image: "/hands-holding-plant-seedling-nature.jpg",
    creationDate: "20/1/2024",
    location: "btana",
    competenceNeeded: "team working ....",
  },
]

export function OrganizationsList() {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedOrganization, setSelectedOrganization] = useState(null)
  const itemsPerPage = 3
  const totalPages = Math.ceil(organizations.length / itemsPerPage)

  const startIndex = currentPage * itemsPerPage
  const visibleOrganizations = organizations.slice(startIndex, startIndex + itemsPerPage)

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0))
  }

  const handleSeeMore = (org) => {
    setSelectedOrganization(org)
  }

  const handleCloseModal = () => {
    setSelectedOrganization(null)
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {visibleOrganizations.map((org) => (
            <OrganizationCard key={org.id} {...org} onSeeMore={() => handleSeeMore(org)} />
          ))}

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={handlePrevious}
              style={{ border: "1px solid #e5e7eb", borderRadius: "9999px", background: "#f5f5f5", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              &#8592;
            </button>
            <button
              onClick={handleNext}
              style={{ border: "1px solid #e5e7eb", borderRadius: "9999px", background: "#f5f5f5", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>

      {/* Organization Detail Modal */}
      {selectedOrganization && (
        <OrganizationDetailModal
          organization={selectedOrganization}
          onClose={handleCloseModal}
        />
      )}
    </section>
  )
}
