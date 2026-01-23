"use client"
import { useState } from 'react'
import styles from "../styles/dashOrg.module.css"

export default function Volunteers() {
  // Sample data - replace with your actual data
  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 234-567-8900",
      mission: "Beach Cleanup Drive",
      appliedDate: "2026-01-15",
      status: "pending",
      skills: "Environmental Science",
      availability: "Weekends"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+1 234-567-8901",
      mission: "Beach Cleanup Drive",
      appliedDate: "2026-01-18",
      status: "pending",
      skills: "Team Leadership",
      availability: "Flexible"
    },
    {
      id: 3,
      name: "Emma Martinez",
      email: "emma.m@email.com",
      phone: "+1 234-567-8902",
      mission: "Food Bank Distribution",
      appliedDate: "2026-01-10",
      status: "approved",
      skills: "Logistics",
      availability: "Weekdays"
    },
    {
      id: 4,
      name: "James Wilson",
      email: "j.wilson@email.com",
      phone: "+1 234-567-8903",
      mission: "Food Bank Distribution",
      appliedDate: "2026-01-20",
      status: "pending",
      skills: "Community Outreach",
      availability: "Mornings"
    },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
      phone: "+1 234-567-8904",
      mission: "Youth Mentorship Program",
      appliedDate: "2026-01-12",
      status: "rejected",
      skills: "Education",
      availability: "Afternoons"
    },
    {
      id: 6,
      name: "David Kim",
      email: "d.kim@email.com",
      phone: "+1 234-567-8905",
      mission: "Youth Mentorship Program",
      appliedDate: "2026-01-22",
      status: "pending",
      skills: "Mentoring, Sports",
      availability: "Evenings"
    }
  ])

  const [filter, setFilter] = useState("all")

  const handleApprove = (id) => {
    setVolunteers(volunteers.map(v => 
      v.id === id ? { ...v, status: "approved" } : v
    ))
  }

  const handleReject = (id) => {
    setVolunteers(volunteers.map(v => 
      v.id === id ? { ...v, status: "rejected" } : v
    ))
  }

  // Group volunteers by mission
  const volunteersByMission = volunteers.reduce((acc, volunteer) => {
    if (!acc[volunteer.mission]) {
      acc[volunteer.mission] = []
    }
    acc[volunteer.mission].push(volunteer)
    return acc
  }, {})

  // Filter volunteers
  const filteredVolunteers = filter === "all" 
    ? volunteers 
    : volunteers.filter(v => v.status === filter)

  const filteredByMission = filteredVolunteers.reduce((acc, volunteer) => {
    if (!acc[volunteer.mission]) {
      acc[volunteer.mission] = []
    }
    acc[volunteer.mission].push(volunteer)
    return acc
  }, {})

  const getStatusBadgeClass = (status) => {
    return `${styles['status-badge']} ${styles[`status-${status}`]}`
  }

  // const pendingCount = volunteers.filter(v => v.status === "pending").length

  return (
    <div className={styles["page-container"]}>
      <div className={styles["page-header"]}>
        <div>
          <h1 className={styles["page-title"]}>Volunteers</h1>
          <p className={styles["page-subtitle"]}>
            Manage your volunteers across all missions
          </p>
        </div>
        {/* {pendingCount > 0 && (
          <div className={styles["pending-badge"]}>
            {pendingCount} Pending
          </div>
        )} */}
      </div>

      <div className={styles["filter-bar"]}>
        <button 
          className={filter === "all" ? styles["filter-active"] : styles["filter-btn"]}
          onClick={() => setFilter("all")}
        >
          All ({volunteers.length})
        </button>
        <button 
          className={filter === "pending" ? styles["filter-active"] : styles["filter-btn"]}
          onClick={() => setFilter("pending")}
        >
          Pending ({volunteers.filter(v => v.status === "pending").length})
        </button>
        <button 
          className={filter === "approved" ? styles["filter-active"] : styles["filter-btn"]}
          onClick={() => setFilter("approved")}
        >
          Approved ({volunteers.filter(v => v.status === "approved").length})
        </button>
        <button 
          className={filter === "rejected" ? styles["filter-active"] : styles["filter-btn"]}
          onClick={() => setFilter("rejected")}
        >
          Rejected ({volunteers.filter(v => v.status === "rejected").length})
        </button>
      </div>

      <div className={styles["missions-container"]}>
        {Object.keys(filteredByMission).length === 0 ? (
          <div className={styles["empty-state"]}>
            <p>No volunteers found for the selected filter.</p>
          </div>
        ) : (
          Object.entries(filteredByMission).map(([mission, missionVolunteers]) => (
            <div key={mission} className={styles["mission-group"]}>
              <div className={styles["mission-header"]}>
                <h2 className={styles["mission-title"]}>{mission}</h2>
                <span className={styles["volunteer-count"]}>
                  {missionVolunteers.length} {missionVolunteers.length === 1 ? 'volunteer' : 'volunteers'}
                </span>
              </div>

              <div className={styles["volunteers-list"]}>
                {missionVolunteers.map(volunteer => (
                  <div key={volunteer.id} className={styles["volunteer-card"]}>
                    <div className={styles["volunteer-main"]}>
                      <div className={styles["volunteer-info"]}>
                        <div className={styles["volunteer-name-row"]}>
                          <h3 className={styles["volunteer-name"]}>{volunteer.name}</h3>
                          <span className={getStatusBadgeClass(volunteer.status)}>
                            {volunteer.status}
                          </span>
                        </div>
                        <div className={styles["volunteer-details"]}>
                          <div className={styles["detail-item"]}>
                            <svg className={styles["icon"]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>{volunteer.email}</span>
                          </div>
                          <div className={styles["detail-item"]}>
                            <svg className={styles["icon"]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>{volunteer.phone}</span>
                          </div>
                          <div className={styles["detail-item"]}>
                            <svg className={styles["icon"]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Applied {new Date(volunteer.appliedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className={styles["volunteer-meta"]}>
                          <div className={styles["meta-item"]}>
                            <strong>Skills:</strong> {volunteer.skills}
                          </div>
                          <div className={styles["meta-item"]}>
                            <strong>Availability:</strong> {volunteer.availability}
                          </div>
                        </div>
                      </div>

                      {volunteer.status === "pending" && (
                        <div className={styles["volunteer-actions"]}>
                          <button 
                            className={styles["btn-approve"]}
                            onClick={() => handleApprove(volunteer.id)}
                          >
                            <svg className={styles["btn-icon"]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Approve
                          </button>
                          <button 
                            className={styles["btn-reject"]}
                            onClick={() => handleReject(volunteer.id)}
                          >
                            <svg className={styles["btn-icon"]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}