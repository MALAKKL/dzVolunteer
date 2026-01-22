"use client"

import styles from "../styles/dashOrg.module.css"

import { useState } from "react"

export default function Missions() {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const currentMissions = [
    {
      id: 1,
      title: "Community Garden Restoration",
      description: "Help restore and beautify our local community garden for everyone to enjoy.",
      date: "Oct 26, 2024",
      location: "ESTIN",
      image: "/estin.jpg",
      status: "current",
    },
  //  {
  //     id: 2,
  //     title: "Local Food Bank Drive Support",
  //     description: "Assist in collecting, sorting, and distributing food donations to support families in need.                             ",
  //     date: "Nov 5, 2024 ",
  //     location: "Downtown Center",
  //     image: "/food-donation-boxes-and-cans.jpg",
  //     status: "current",
  //   },
    {
      id: 3,
      title: "Coastal Cleanup Initiative",
      description: "Join us in cleaning up our beautiful beaches to protect marine life and the environment.",
      date: "Nov 12, 2024",
      location: "Beach",
      image: "/estin2.jpg",
      status: "current",
    },
  ]

  const archivedMissions = [
    // {
    //   id: 4,
    //   title: "Habitat Build Project",
    //   description: "Contributed to building safe and affordable housing for a local family.",
    //   completedDate: "Completed: Sep 15, 2024",
    //   location: "West Suburbs",
    //   image: "/house-construction-building-project.jpg",
    //   status: "archived",
    // },
    {
      id: 5,
      title: "Community Center Mural",
      description: "Created a vibrant mural to inspire and bring together the local community.",
      completedDate: "Completed: Aug 20, 2024",
      location: "Arts District",
      image: "/estin3.jpg",
      status: "archived",
    },
    {
      id: 6,
      title: "Animal Shelter Day",
      description: "Provided care and support for animals awaiting their forever homes.",
      completedDate: "Completed: Jul 05, 2024",
      location: "County Shelter",
      image: "/estin4.jpg",
      status: "archived",
    },
  ]

  const handleCreateMission = () => {
    setShowCreateModal(true)
  }

  const handleCloseModal = () => {
    setShowCreateModal(false)
  }

  const handleMissionDetails = (missionId) => {
    console.log("[v0] View mission details:", missionId)
    // TODO: Navigate to mission details page
  }

  return (
  <div className={styles["missions-container"]}>
  {/* Header Section */}
  <div className={styles["missions-header"]}>
    <div className={styles["profile-section"]}>
      <div className={styles["profile-avatar"]}>
        <img src="/origo.png" alt="Profile" />
      </div>
      <span className={styles["profile-name"]}>ORIGO</span>
    </div>
    <button className={styles["create-mission-btn"]} onClick={handleCreateMission}>
      <span className={styles["plus-icon"]}>+</span>
      Create New Mission
    </button>
  </div>

  {/* Current Missions Section */}
  <div className={styles["missions-section"]}>
    <div className={styles["section-header"]}>
      <h2 className={styles["section-title"]}>Current Missions</h2>
      <a href="#" className={styles["see-more-link"]}>See More</a>
    </div>
    <div className={styles["missions-grid"]}>
      {currentMissions.map((mission) => (
        <div key={mission.id} className={styles["mission-card"]}>
          <div className={styles["mission-image"]}>
            <img src={mission.image || "/placeholder.svg"} alt={mission.title} />
          </div>
          <div className={styles["mission-content"]}>
            <h3 className={styles["mission-title"]}>{mission.title}</h3>
            <p className={styles["mission-description"]}>{mission.description}</p>
            <div className={styles["mission-info"]}>
              <p className={styles["mission-date"]}>{mission.date}</p>
              <p className={styles["mission-location"]}>{mission.location}</p>
            </div>
            <button className={`${styles["mission-details-btn"]} ${styles.current}`} onClick={() => handleMissionDetails(mission.id)}>
              more details
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Archived Missions Section */}
  <div className={styles["missions-section"]}>
    <div className={styles["section-header"]}>
      <h2 className={styles["section-title"]}>Archived Missions</h2>
      <a href="#" className={styles["see-more-link"]}>See More</a>
    </div>
    <div className={styles["missions-grid"]}>
      {archivedMissions.map((mission) => (
        <div key={mission.id} className={`${styles["mission-card"]} ${styles.archived}`}>
          <div className={styles["mission-image"]}>
            <img src={mission.image || "/placeholder.svg"} alt={mission.title} />
          </div>
          <div className={styles["mission-content"]}>
            <h3 className={styles["mission-title"]}>{mission.title}</h3>
            <p className={styles["mission-description"]}>{mission.description}</p>
            <div className={styles["mission-info"]}>
              <p className={styles["mission-completed"]}>{mission.completedDate}</p>
              <p className={styles["mission-location"]}>{mission.location}</p>
            </div>
            <button className={`${styles["mission-details-btn"]} ${styles.archived}`} onClick={() => handleMissionDetails(mission.id)}>
              more details
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Create Mission Modal */}
  {showCreateModal && (
    <div className={styles["modal-overlay"]} onClick={handleCloseModal}>
      <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
        <div className={styles["modal-header"]}>
          <h2>Create New Mission</h2>
          <button className={styles["modal-close"]} onClick={handleCloseModal}>&times;</button>
        </div>
        <div className={styles["modal-body"]}>
          <p>Mission creation form will be implemented here.</p>
        </div>
      </div>
    </div>
  )}
</div>

  )
}
