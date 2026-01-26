'use client'

import React, { useState, useEffect } from "react"
import styles from '../components/volDashboard.module.css'
import { volunteersAPI, authAPI, skillsAPI } from '../utils/api'
import { getImageUrl } from '../utils/imageUtils'

// Utility Functions
function calculateTotalHours(participations) {
  return (participations || []).reduce((sum, p) => sum + (p.hoursCompleted || 0), 0)
}

function formatDate(dateString) {
  if (!dateString) return "N/A"
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

function DashboardHeader({ volunteer }) {
  return (
    <div className={styles.dashboardHeader}>
      <div className={styles.headerContent}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img
            src="/logo1.svg"
            alt="Logo"
            style={{ height: "50px", cursor: "pointer" }}
            onClick={() => window.location.href = "/"}
          />
          <div className={styles.headerTitle}>
            <h1>Welcome, {volunteer.firstName}! 👋</h1>
            <p>Your volunteer dashboard</p>
          </div>
        </div>
        <button className={styles.logoutBtn} onClick={() => { localStorage.clear(); window.location.href = "/"; }}>Logout</button>
      </div>
    </div>
  )
}

function HoursBadge({ totalHours }) {
  return (
    <div className={styles.hoursBadge}>
      <div className={styles.hoursBadgeContent}>
        <div className={styles.hoursBadgeText}>
          <div className={styles.hoursBadgeLabel}>Total Volunteering Hours</div>
          <div className={styles.hoursBadgeValue}>{totalHours} hrs</div>
          <div style={{ fontSize: '0.75rem', color: '#718096', marginTop: '0.5rem' }}>
            Your public impact
          </div>
        </div>
        <div className={styles.hoursBadgeIcon}>⏱️</div>
      </div>
    </div>
  )
}

function ProfileCard({
  volunteer,
  skillCatalog,
  showSkillModal,
  setShowSkillModal,
  selectedSkillId,
  setSelectedSkillId,
  setCertificateFile,
  handleAddSkill,
  isLoadingSkill
}) {
  // Split catalog into skills and SDGs based on name prefix
  const skillsOnly = (skillCatalog || []).filter(s => s.name && !s.name.startsWith('SDG'))
  const sdgsOnly = (skillCatalog || []).filter(s => s.name && s.name.startsWith('SDG'))

  return (
    <div className={`${styles.dashboardCard} ${styles.profileCard}`}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>My Profile</h2>
      </div>

      <div className={styles.profilePhoto} onClick={() => document.getElementById('volunteer-photo-input').click()} style={{ cursor: "pointer", overflow: "hidden", position: "relative" }}>
        {volunteer.photo === '👤' ? '👤' : (
          <img src={getImageUrl(volunteer.photo)} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        )}
        <div style={{ position: "absolute", bottom: 0, right: 0, background: "#347362", color: "white", padding: "4px", borderRadius: "50%", fontSize: "12px" }}>📸</div>
      </div>
      <input
        type="file"
        id="volunteer-photo-input"
        style={{ display: "none" }}
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files[0]
          if (file) {
            const formData = new FormData()
            formData.append('photo', file)
            try {
              const res = await volunteersAPI.uploadVolunteerProfilePhoto(formData)
              if (res.photo) {
                alert("Photo updated!")
                window.location.reload()
              }
            } catch (err) {
              alert("Upload failed: " + err.message)
            }
          }
        }}
      />

      <div className={styles.profileInfo}>
        <h2>{volunteer.firstName} {volunteer.lastName}</h2>
        <p className={styles.profileDescription}>{volunteer.description}</p>
      </div>

      <div className={styles.profileMeta}>
        <div className={styles.profileMetaItem}>
          <span className={styles.metaIcon}>📍</span>
          <span>{volunteer.location}</span>
        </div>
        <div className={styles.profileMetaItem}>
          <span className={styles.metaIcon}>⏰</span>
          <span>{volunteer.availability}</span>
        </div>
        <div className={styles.profileMetaItem}>
          <span className={styles.metaIcon}>🎯</span>
          <span>{volunteer.interests && volunteer.interests.length > 0 ? volunteer.interests.join(', ') : 'Add your interests'}</span>
        </div>
      </div>

      <div className={styles.skillsSection}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3>Skills & SDGs</h3>
          <button
            onClick={() => setShowSkillModal(true)}
            style={{ padding: "6px 12px", fontSize: "0.8rem", background: "#347362", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            + Add
          </button>
        </div>
        <div className={styles.skillsList}>
          {(volunteer.skills || []).length > 0 ? (volunteer.skills || []).map(skill => (
            <div key={skill.id} className={styles.skillItem}>
              <span className={styles.skillName}>{skill.name}</span>
              <span className={`${styles.skillBadge} ${skill.status === 'verified' ? styles.skillVerified : styles.skillPending}`}>
                <span className={styles.skillIcon}>{skill.status === 'verified' ? '✓' : '⏳'}</span>
                {skill.status === 'verified' ? 'Verified' : 'Pending'}
              </span>
            </div>
          )) : <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>No skills added yet.</p>}
        </div>
      </div>

      {showSkillModal && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}
          onClick={(e) => e.target === e.currentTarget && setShowSkillModal(false)}
        >
          <div style={{ background: "white", padding: "2rem", borderRadius: "10px", width: "100%", maxWidth: "450px", color: "black", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: "1.5rem" }}>Add from Catalog</h3>

            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "bold" }}>Select Item</label>
            <select
              style={{ width: "100%", padding: "12px", marginBottom: "1.5rem", borderRadius: "6px", border: "1px solid #ccc", background: "#fff", color: "#000", fontSize: "1rem", cursor: "pointer" }}
              onChange={(e) => {
                const val = e.target.value;
                console.log("CATALOG: Selected skill ID ->", val);
                setSelectedSkillId(val);
              }}
              value={selectedSkillId}
            >
              <option value="">{skillCatalog.length === 0 ? "Loading catalog..." : "-- Choose from Catalog --"}</option>
              {skillsOnly.length > 0 && (
                <optgroup label="Professional Skills">
                  {skillsOnly.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </optgroup>
              )}
              {sdgsOnly.length > 0 && (
                <optgroup label="Volunteering Areas (SDGs)">
                  {sdgsOnly.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </optgroup>
              )}
              {skillCatalog.length === 0 && <option disabled>No items found in catalog</option>}
            </select>

            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "bold" }}>Proof / Certificate (Optional)</label>
            <input
              type="file"
              style={{ marginBottom: "1.5rem", width: "100%", padding: "8px", border: "1px dashed #ccc", borderRadius: "4px" }}
              onChange={(e) => setCertificateFile(e.target.files[0])}
            />

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowSkillModal(false)}
                style={{ padding: "10px 20px", borderRadius: "6px", border: "1px solid #ccc", background: "#f8f9fa", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddSkill}
                disabled={isLoadingSkill || !selectedSkillId}
                style={{ padding: "10px 20px", borderRadius: "6px", background: "#347362", color: "white", border: "none", cursor: "pointer", fontWeight: "bold", opacity: (isLoadingSkill || !selectedSkillId) ? 0.6 : 1 }}
              >
                {isLoadingSkill ? "Processing..." : "Add to Profile"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ApplicationsCard({ applications }) {
  const [filter, setFilter] = useState('all')

  const filteredApplications = filter === 'all'
    ? (applications || [])
    : (applications || []).filter(app => app.status === filter)

  return (
    <div className={`${styles.dashboardCard} ${styles.applicationsCard}`}>
      <div className={styles.cardHeader}>
        <div>
          <h2 className={styles.cardTitle}>My Applications</h2>
          <p className={styles.cardSubtitle}>Tracking your impact</p>
        </div>
      </div>

      <div className={styles.tabNavigation}>
        <button className={`${styles.tabBtn} ${filter === 'all' ? styles.activeTab : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`${styles.tabBtn} ${filter === 'PENDING' ? styles.activeTab : ''}`} onClick={() => setFilter('PENDING')}>Pending</button>
        <button className={`${styles.tabBtn} ${filter === 'APPROVED' ? styles.activeTab : ''}`} onClick={() => setFilter('APPROVED')}>Approved</button>
        <button className={`${styles.tabBtn} ${filter === 'REJECTED' ? styles.activeTab : ''}`} onClick={() => setFilter('REJECTED')}>Rejected</button>
      </div>

      <div className={styles.applicationsList}>
        {filteredApplications.length > 0 ? filteredApplications.map(app => (
          <div key={app.id} className={styles.appItem}>
            <div className={styles.appInfo}>
              <h4 className={styles.appMission}>{app.mission.title}</h4>
              <p className={styles.appOrg}>{app.mission.organization.name}</p>
            </div>
            <span className={`${styles.statusBadge} ${styles[app.status.toLowerCase()]}`}>
              {app.status === 'PENDING' ? '⌛ Pending' : app.status === 'APPROVED' ? '✅ Accepted' : app.status === 'REJECTED' ? '❌ Rejected' : app.status}
            </span>
          </div>
        )) : <p style={{ textAlign: "center", padding: "20px", opacity: 0.6 }}>No applications found.</p>}
      </div>
    </div>
  )
}

function HistoryCard({ participations }) {
  return (
    <div className={`${styles.dashboardCard} ${styles.historyCard}`}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Mission History</h2>
      </div>

      <div className={styles.historyList}>
        {(participations || []).length > 0 ? participations.map(p => (
          <div key={p.id} className={styles.historyItem}>
            <div className={styles.historyMain}>
              <div className={styles.historyDate}>{formatDate(p.validatedAt)}</div>
              <h4 className={styles.historyTitle}>{p.mission.title}</h4>
              <p className={styles.historyOrg}>{p.mission.organization.name}</p>
            </div>
            <div className={styles.historyHours}>+{p.hoursCompleted} hrs</div>
          </div>
        )) : <p style={{ textAlign: "center", padding: "20px", opacity: 0.6 }}>No mission badges yet.</p>}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [volunteer, setVolunteer] = useState(null)
  const [applications, setApplications] = useState([])
  const [participations, setParticipations] = useState([])
  const [totalHours, setTotalHours] = useState(0)
  const [loading, setLoading] = useState(true)

  const [skillCatalog, setSkillCatalog] = useState([])
  const [showSkillModal, setShowSkillModal] = useState(false)
  const [selectedSkillId, setSelectedSkillId] = useState("")
  const [certificateFile, setCertificateFile] = useState(null)
  const [isLoadingSkill, setIsLoadingSkill] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("DASHBOARD: Starting data fetch...")
        const profileData = await authAPI.getProfile().catch(e => {
          console.error("DASHBOARD: Profile API error", e)
          return null
        })

        if (!profileData) {
          console.warn("DASHBOARD: No profile returned")
          throw new Error("Unable to sync profile")
        }

        if (profileData.role !== "VOLUNTEER") {
          window.location.href = profileData.role === "ORGANIZATION" ? "/orgdashboard" : "/"
          return
        }

        console.log("DASHBOARD: Loading secondary resources...")
        const [apps, parts, catalogResponse] = await Promise.all([
          volunteersAPI.getMyApplications().catch(e => { console.error("DASHBOARD: Apps failed", e); return [] }),
          volunteersAPI.getMyParticipations().catch(e => { console.error("DASHBOARD: Parts failed", e); return [] }),
          skillsAPI.getAllSkills().catch(e => { console.error("DASHBOARD: Catalog failed", e); return [] })
        ])

        const finalCatalog = (catalogResponse && catalogResponse.length > 0)
          ? catalogResponse
          : [];

        if (finalCatalog.length === 0) {
          console.warn("DASHBOARD: Skill catalog is empty. Skill addition might fail.");
        }

        setVolunteer(transformProfile(profileData))
        setApplications(apps)
        setParticipations(parts)
        setTotalHours(calculateTotalHours(parts))
        setSkillCatalog(finalCatalog)
      } catch (error) {
        console.error("DASHBOARD: Critical failure", error)
        setVolunteer(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const transformProfile = (data) => {
    if (!data) return null
    const photoUrl = data.volunteer?.photo ? getImageUrl(data.volunteer.photo) : '👤';

    return {
      id: data.volunteer?.id || 'new-user',
      firstName: data.firstName || 'Volunteer',
      lastName: data.lastName || '',
      description: data.volunteer?.bio || 'Your story starts here! Introduce yourself...',
      interests: data.volunteer?.interests || [],
      location: 'Algiers, Algeria',
      availability: data.volunteer?.availabilities || 'Not specified',
      photo: photoUrl,
      skills: (data.volunteer?.skills || []).map(s => ({
        id: s.id,
        name: s.skill?.name || "Skill",
        status: s.status === 'VERIFIED' ? 'verified' : 'pending'
      }))
    }
  }

  const handleAddSkill = async () => {
    if (!selectedSkillId) return alert("Please select an item.")
    setIsLoadingSkill(true)

    const formData = new FormData()
    formData.append("skillId", selectedSkillId)
    if (certificateFile) formData.append("certificate", certificateFile)

    try {
      if (!selectedSkillId) throw new Error("No skill selected from catalog.");

      console.log(`DASHBOARD: Sending verification request for Item ID: ${selectedSkillId}`);
      await volunteersAPI.addSkillWithCertificate(formData)

      alert("Verification request submitted! Admin will review your document.")
      setShowSkillModal(false)
      // Soft refresh
      const profileData = await volunteersAPI.getMyProfile()
      setVolunteer(transformProfile(profileData))
    } catch (e) {
      console.error("DASHBOARD: Skill addition crashed!", e);
      alert(`Submission Error: ${e.message}. Tip: Check if this skill is already on your list.`)
    } finally {
      setIsLoadingSkill(false)
    }
  }

  if (loading) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className={styles.loading}>Syncing your universe...</div>
    </div>
  )

  if (!volunteer) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "20px" }}>
      <div>
        <h2 style={{ color: "#c53030" }}>Restricted Access</h2>
        <p style={{ margin: "1rem 0", opacity: 0.8 }}>We couldn't load your volunteer data.</p>
        <button onClick={() => window.location.href = "/login"} style={{ padding: "12px 24px", background: "#347362", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>Retry Login</button>
      </div>
    </div>
  )

  return (
    <div className={styles.dashboardContainer}>
      <DashboardHeader volunteer={volunteer} />
      <main className={styles.dashboardContent}>
        <div className={styles.topStatsRow}>
          <div style={{ flex: "1" }}><HoursBadge totalHours={totalHours} /></div>
          <div style={{ flex: "1" }}>
            <div className={styles.hoursBadge} style={{ background: "linear-gradient(135deg, #1A365D 0%, #2A4365 100%)" }}>
              <div className={styles.hoursBadgeContent}>
                <div className={styles.hoursBadgeText}>
                  <div className={styles.hoursBadgeLabel} style={{ color: "rgba(255,255,255,0.8)" }}>Missions Accomplished</div>
                  <div className={styles.hoursBadgeValue} style={{ color: "white" }}>{participations.length}</div>
                </div>
                <div className={styles.hoursBadgeIcon}>🌟</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.dashboardGrid}>
          <div className={styles.gridLeftCol}>
            <ProfileCard
              volunteer={volunteer} skillCatalog={skillCatalog}
              showSkillModal={showSkillModal} setShowSkillModal={setShowSkillModal}
              selectedSkillId={selectedSkillId} setSelectedSkillId={setSelectedSkillId}
              setCertificateFile={setCertificateFile} handleAddSkill={handleAddSkill}
              isLoadingSkill={isLoadingSkill}
            />
          </div>
          <div className={styles.gridRightCol}>
            <ApplicationsCard applications={applications} />
            <HistoryCard participations={participations} />
          </div>
        </div>
      </main>
    </div>
  )
}