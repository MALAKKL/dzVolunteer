'use client';

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import styles from '../components/volDashboard.module.css'; // Import CSS Module
import { volunteersAPI, authAPI, API_BASE_URL } from '../utils/api';

const { useState: useStateAlias } = React;

// Utility Functions
function calculateTotalHours(participations) {
  return participations.reduce((sum, p) => sum + p.hoursValidated, 0);
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Header Component
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
            <h1>Welcome back, {volunteer.firstName}! 👋</h1>
            <p>Your volunteering control panel</p>
          </div>
        </div>
        <button className={styles.logoutBtn} onClick={() => { localStorage.clear(); window.location.href = "/"; }}>Logout</button>
      </div>
    </div>
  );
}

// Hours Badge Component
function HoursBadge({ totalHours }) {
  return (
    <div className={styles.hoursBadge}>
      <div className={styles.hoursBadgeContent}>
        <div className={styles.hoursBadgeText}>
          <div className={styles.hoursBadgeLabel}>Total Volunteering Hours</div>
          <div className={styles.hoursBadgeValue}>{totalHours} hrs</div>
          <div style={{ fontSize: '0.75rem', color: '#718096', marginTop: '0.5rem' }}>
            Your public engagement badge
          </div>
        </div>
        <div className={styles.hoursBadgeIcon}>⏱️</div>
      </div>
    </div>
  );
}

// Profile Card Component
function ProfileCard({ volunteer }) {
  return (
    <div className={`${styles.dashboardCard} ${styles.profileCard}`}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>My Profile</h2>
      </div>

      <div className={styles.profilePhoto} onClick={() => document.getElementById('volunteer-photo-input').click()} style={{ cursor: "pointer", overflow: "hidden" }}>
        {volunteer.photo === '👤' ? '👤' : (
          <img src={volunteer.photo} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        )}
      </div>
      <input
        type="file"
        id="volunteer-photo-input"
        style={{ display: "none" }}
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files[0];
          if (file) {
            const formData = new FormData();
            formData.append('photo', file);
            try {
              const res = await volunteersAPI.uploadVolunteerProfilePhoto(formData);
              if (res.photo) {
                alert("Photo uploaded!");
                // Trigger navbar refresh
                window.dispatchEvent(new Event("profileUpdate"));
                // Small delay before reload to ensure backend sync
                setTimeout(() => window.location.reload(), 500);
              }
            } catch (err) {
              alert("Upload failed");
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
          <span>{volunteer.interests.join(', ')}</span>
        </div>
      </div>

      <div className={styles.skillsSection}>
        <h3>Skills & Certifications</h3>
        <div className={styles.skillsList}>
          {volunteer.skills.map(skill => (
            <div key={skill.id} className={styles.skillItem}>
              <span className={styles.skillName}>{skill.name}</span>
              <span className={`${styles.skillBadge} ${skill.status === 'verified' ? styles.skillVerified : styles.skillPending}`}>
                <span className={styles.skillIcon}>{skill.status === 'verified' ? '✓' : '⏳'}</span>
                {skill.status === 'verified' ? 'Vérifiée' : 'Validation Requise'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '6px', fontSize: '0.875rem', color: '#92400e' }}>
        <strong>⚠️ Attention:</strong> 1 skill requires verification to apply for certain missions.
      </div>
    </div>
  );
}

// Applications Component
function ApplicationsCard({ applications }) {
  const [filter, setFilter] = useState('all');

  const filteredApplications = filter === 'all'
    ? applications
    : applications.filter(app => app.status === filter);

  return (
    <div className={`${styles.dashboardCard} ${styles.applicationsCard}`}>
      <div className={styles.cardHeader}>
        <div>
          <h2 className={styles.cardTitle}>My Applications</h2>
          <p className={styles.cardSubtitle}>Suivi de vos candidatures</p>
        </div>
      </div>

      <div className={styles.tabNavigation}>
        <button
          className={`${styles.tabBtn} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({applications.length})
        </button>
        <button
          className={`${styles.tabBtn} ${filter === 'pending' ? styles.active : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending ({applications.filter(a => a.status === 'pending').length})
        </button>
        <button
          className={`${styles.tabBtn} ${filter === 'accepted' ? styles.active : ''}`}
          onClick={() => setFilter('accepted')}
        >
          Accepted ({applications.filter(a => a.status === 'accepted').length})
        </button>
      </div>

      {filteredApplications.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>📋</div>
          <div className={styles.emptyStateText}>No applications in this category</div>
        </div>
      ) : (
        <div className={styles.applicationsList}>
          {filteredApplications.map(app => (
            <div key={app.id} className={styles.applicationItem}>
              <div className={styles.appHeader}>
                <span className={styles.appMissionTitle}>{app.missionTitle}</span>
                <span className={`${styles.statusBadge} ${styles[`status${app.status.charAt(0).toUpperCase() + app.status.slice(1)}`]}`}>
                  {app.status === 'pending' && '⏳ En attente'}
                  {app.status === 'accepted' && '✓ Acceptée'}
                  {app.status === 'rejected' && '✗ Refusée'}
                </span>
              </div>

              <div className={styles.appDetails}>
                <div className={styles.appDetailItem}>
                  <span className={styles.detailLabel}>📌 Organization</span>
                  <span className={styles.detailValue}>{app.organizationName}</span>
                </div>
                <div className={styles.appDetailItem}>
                  <span className={styles.detailLabel}>📅 Date</span>
                  <span className={styles.detailValue}>{formatDate(app.date)}</span>
                </div>
              </div>

              <div className={styles.remainingSpots}>
                📍 Location: {app.location} | 👥 Remaining spots: {app.remainingSpots}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Participations Component
function ParticipationsCard({ participations }) {
  const totalHours = calculateTotalHours(participations);

  return (
    <div className={`${styles.dashboardCard} ${styles.participationsCard}`}>
      <div className={styles.cardHeader}>
        <div>
          <h2 className={styles.cardTitle}>Participation History</h2>
          <p className={styles.cardSubtitle}>Vos missions complétées</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className={styles.hoursLabel}>Total Hours This Section</div>
          <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#ff9a56' }}>
            {totalHours} hrs
          </div>
        </div>
      </div>

      {participations.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>🎯</div>
          <div className={styles.emptyStateText}>No participations yet. Apply for missions to get started!</div>
        </div>
      ) : (
        <div className={styles.participationsList}>
          {participations.map(p => (
            <div key={p.id} className={styles.participationItem}>
              <div className={styles.participationInfo}>
                <div className={styles.participationTitle}>{p.missionTitle}</div>
                <div className={styles.participationDetails}>
                  <div className={styles.participationDetail}>
                    <strong>🏢</strong> {p.organizationName}
                  </div>
                  <div className={styles.participationDetail}>
                    <strong>📅</strong> {formatDate(p.date)}
                  </div>
                  <div className={styles.participationDetail}>
                    <strong>📊</strong> {p.status === 'completed' ? '✓ Completed' : '⏳ Waiting Validation'}
                  </div>
                </div>
              </div>

              <div className={styles.participationStatus}>
                <div style={{ textAlign: 'center' }}>
                  <div className={styles.hoursDisplay}>{p.hoursValidated}</div>
                  <div className={styles.hoursLabel}>hours</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const [volunteer, setVolunteer] = useState(null);
  const [applications, setApplications] = useState([]);
  const [participations, setParticipations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileResult, appsResult, partsResult] = await Promise.allSettled([
          authAPI.getProfile(),
          volunteersAPI.getMyApplications(),
          volunteersAPI.getMyParticipations()
        ]);

        const profileRes = profileResult.status === 'fulfilled' ? profileResult.value : { error: "Failed to load profile" };
        const appsRes = appsResult.status === 'fulfilled' ? appsResult.value : [];
        const partsRes = partsResult.status === 'fulfilled' ? partsResult.value : [];

        if (profileRes.error) console.warn("Profile error:", profileRes.error);

        // Fallbacks if data is missing or errored
        const safeProfile = profileRes.error ? {
          id: 0, firstName: "Volunteer", lastName: "", bio: "", interests: [], availabilities: "", skills: []
        } : profileRes;

        const safeApps = Array.isArray(appsRes) ? appsRes : [];
        const safeParts = Array.isArray(partsRes) ? partsRes : [];

        setVolunteer(transformProfile(safeProfile));
        setApplications(transformApplications(safeApps));
        setParticipations(transformParticipations(safeParts));
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard data. Please try logging in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const transformProfile = (data) => {
    let photoUrl = '👤';
    const rawPhoto = data.volunteer?.photo;

    if (rawPhoto) {
      photoUrl = rawPhoto.startsWith('http') ? rawPhoto : `${API_BASE_URL}${rawPhoto}`;
    }

    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      description: data.bio || 'No description provided.',
      interests: data.interests || [],
      location: 'Alger, Algérie', // Assuming default, or get from user
      availability: data.availabilities || 'Not specified',
      photo: photoUrl,
      skills: (data.volunteer?.skills || []).map(s => ({
        id: s.id,
        name: s.skill?.name || "Skill",
        status: s.status === 'VERIFIED' ? 'verified' : 'pending'
      }))
    };
  };

  const transformApplications = (data) => {
    return data.map(app => ({
      id: app.id,
      missionTitle: app.mission.title,
      organizationName: app.mission.organization.name,
      date: app.appliedAt.split('T')[0], // Format date
      location: app.mission.location,
      status: app.status === "APPROVED" ? "accepted" : app.status.toLowerCase(),
      requiredSkills: [], // Could fetch mission skills if needed
      remainingSpots: app.mission.volunteersNeeded - app.mission.volunteersAccepted
    }));
  };

  const transformParticipations = (data) => {
    return data.map(part => ({
      id: part.id,
      missionTitle: part.mission.title,
      organizationName: part.mission.organization.name,
      date: part.validatedAt.split('T')[0],
      hoursValidated: part.hoursCompleted,
      status: 'completed' // Assuming all participations are completed
    }));
  };

  if (error) return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Access Error</h2>
      <p>{error}</p>
      <button
        onClick={() => { localStorage.clear(); window.location.href = "/login"; }}
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer", background: "#347362", color: "white", border: "none" }}
      >
        Go to Login
      </button>
    </div>
  );
  if (!volunteer || volunteer.id === 0) return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Loading Profile...</h2>
      <p>If this takes too long, please try re-logging in.</p>
    </div>
  );

  const totalHours = calculateTotalHours(participations);

  return (
    <div>
      <DashboardHeader volunteer={volunteer} />

      <div className={styles.dashboardContainer}>
        <HoursBadge totalHours={totalHours} />

        <div className={styles.dashboardGrid}>
          <ProfileCard volunteer={volunteer} />
          <ApplicationsCard applications={applications} />
        </div>

        <ParticipationsCard participations={participations} />
      </div>
    </div>
  );
}