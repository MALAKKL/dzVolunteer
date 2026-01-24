"use client"
import { useState, useEffect } from 'react'
import styles from "../styles/dashOrg.module.css"
import { authAPI, organizationsAPI, missionsAPI } from "../utils/api"

export default function Volunteers() {
  const [volunteers, setVolunteers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetchVolunteers()
  }, [])

  const fetchVolunteers = async () => {
    try {
      setLoading(true)
      const profile = await authAPI.getProfile()
      if (profile.organization) {
        const orgDetails = await organizationsAPI.getOrganizationById(profile.organization.id)
        if (orgDetails.missions) {
          const allApplicants = [];

          // Fetch applicants for each mission
          await Promise.all(orgDetails.missions.map(async (mission) => {
            try {
              const applicants = await missionsAPI.getMissionApplicants(mission.id);
              // Transform and add mission title
              applicants.forEach(app => {
                allApplicants.push({
                  id: app.id, // Application ID
                  volunteerId: app.volunteerId,
                  missionId: mission.id,
                  name: `${app.volunteer.firstName} ${app.volunteer.lastName}`,
                  email: app.volunteer.email || "N/A",
                  phone: app.volunteer.phone || "N/A",
                  mission: mission.title,
                  appliedDate: app.appliedAt,
                  status: app.status.toLowerCase(),
                  skills: app.volunteer.skills ? app.volunteer.skills.map(s => s.name).join(", ") : "N/A",
                  availability: app.volunteer.availabilities || "N/A"
                });
              });
            } catch (err) {
              console.error(`Failed to fetch applicants for mission ${mission.id}`, err);
            }
          }));

          setVolunteers(allApplicants);
        }
      }
    } catch (error) {
      console.error("Error fetching volunteers", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (applicationId) => {
    try {
      await missionsAPI.updateApplicationStatus(applicationId, "APPROVED");
      // Update local state
      setVolunteers(prev => prev.map(v => v.id === applicationId ? { ...v, status: "approved" } : v));
    } catch (error) {
      console.error("Failed to approve", error);
      alert("Failed to approve volunteer");
    }
  }

  const handleReject = async (applicationId) => {
    try {
      await missionsAPI.updateApplicationStatus(applicationId, "REJECTED");
      setVolunteers(prev => prev.map(v => v.id === applicationId ? { ...v, status: "rejected" } : v));
    } catch (error) {
      console.error("Failed to reject", error);
      alert("Failed to reject volunteer");
    }
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

  if (loading) return <div>Loading volunteers...</div>

  return (
    <div className={styles["page-container"]}>
      <div className={styles["page-header"]}>
        <div>
          <h1 className={styles["page-title"]}>Volunteers</h1>
          <p className={styles["page-subtitle"]}>
            Manage your volunteers across all missions
          </p>
        </div>
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

                      {volunteer.status === "approved" && (
                        <div className={styles["volunteer-actions"]}>
                          <div style={{ display: "flex", gap: "5px" }}>
                            <input
                              type="number"
                              placeholder="Hrs"
                              style={{ width: "60px", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                              id={`hours-${volunteer.id}`}
                            />
                            <button
                              className={styles["btn-approve"]}
                              onClick={async () => {
                                const hrs = document.getElementById(`hours-${volunteer.id}`).value;
                                if (!hrs) return alert("Please enter hours");
                                try {
                                  // We need missionId here. 
                                  // Let's assume the volunteer object has missionId if we fetch it correctly
                                  // For now, let's just use a simplified prompt or lookup
                                  // I'll update the fetch logic to include missionId
                                  await organizationsAPI.validateParticipation({
                                    missionId: volunteer.missionId,
                                    volunteerId: volunteer.volunteerId,
                                    hoursCompleted: parseInt(hrs)
                                  });
                                  alert("Hours validated!");
                                } catch (err) {
                                  alert("Error validating hours");
                                }
                              }}
                            >
                              Validate
                            </button>
                          </div>
                        </div>
                      )}

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