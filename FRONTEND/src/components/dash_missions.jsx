"use client"

import styles from "../styles/dashOrg.module.css"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { authAPI, organizationsAPI, API_BASE_URL } from "../utils/api";

export default function Missions() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [orgInfo, setOrgInfo] = useState({ name: "Organization", image: "/origo.png" });
  const [currentMissions, setCurrentMissions] = useState([]);
  const [archivedMissions, setArchivedMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const Navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const profile = await authAPI.getProfile();
      if (profile.organization) {
        setOrgInfo({
          name: profile.organization.name,
          image: profile.organization.logo ? `${API_BASE_URL}${profile.organization.logo}` : "/origo.png"
        });

        const orgDetails = await organizationsAPI.getOrganizationById(profile.organization.id);
        if (orgDetails.missions) {
          // Separate current and archived
          // Check if 'isArchived' or date logic applies
          const current = [];
          orgDetails.missions.forEach(mission => {
            const endDate = new Date(mission.endDate);
            const now = new Date();
            // A mission is archived if isArchived=true OR it has expired (endDate < now)
            const isExpired = endDate < now;

            if (mission.isArchived || isExpired) {
              archived.push(mission);
            } else {
              current.push(mission);
            }
          });
          setCurrentMissions(current);
          setArchivedMissions(archived);
        }
      }
    } catch (error) {
      console.error("Error fetching missions", error);
    } finally {
      setLoading(false);
    }
  };


  const handleCloseModal = () => {
    setShowCreateModal(false)
  }

  const handleMissionDetails = (missionId) => {
    Navigate(`/volunteer/mission/${missionId}`);
  }

  const handleEditMission = (missionId) => {
    // Navigate(`/edit_mission/${missionId}`); // Ideally passing ID
    // Since Route is /edit_mission without ID param in App.jsx
    // We pass ID via state or search param if the detail page supports it.
    // Assuming edit_mission page reads query param or we'll rely on global state?
    // Let's assume query params for now as it's standard.
    Navigate(`/edit_mission?id=${missionId}`);
  }

  if (loading) return <div>Loading missions...</div>;

  return (
    <div className={styles["missions-container"]}>
      {/* Header Section */}
      <div className={styles["missions-header"]}>
        <div className={styles["profile-section"]}>
          <div className={styles["profile-avatar"]}>
            <img src={orgInfo.image} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
          </div>
          <span className={styles["profile-name"]}>{orgInfo.name}</span>
        </div>
        <button className={styles["create-mission-btn"]} onClick={() => Navigate("/create_mission")}>
          <span className={styles["plus-icon"]}>+</span>
          Create New Mission
        </button>
      </div>

      {/* Current Missions Section */}
      <div className={styles["missions-section"]}>
        <div className={styles["section-header"]}>
          <h2 className={styles["section-title"]}>Current Missions</h2>
          {/* <a href="#" className={styles["see-more-link"]}>See More</a> */}
        </div>
        <div className={styles["missions-grid"]}>
          {currentMissions.length > 0 ? currentMissions.map((mission) => (
            <div key={mission.id} className={styles["mission-card"]}>
              <div className={styles["mission-image"]}>
                <img src={mission.image ? `${API_BASE_URL}${mission.image}` : "/estin.jpg"} alt={mission.title} onError={(e) => e.target.src = "/placeholder.svg"} />
              </div>
              <div className={styles["mission-content"]}>
                <h3 className={styles["mission-title"]}>{mission.title}</h3>
                <p className={styles["mission-description"]}>{mission.description}</p>
                <div className={styles["mission-info"]}>
                  <p className={styles["mission-date"]}>{new Date(mission.startDate).toLocaleDateString()}</p>
                  <p className={styles["mission-location"]}>{mission.location}</p>
                </div>
                <button
                  className={`${styles["mission-details-btn"]} ${styles.current}`}
                  onClick={() => handleEditMission(mission.id)}
                >
                  edit
                </button>
              </div>
            </div>
          )) : <p>No current missions.</p>}
        </div>
      </div>

      {/* Archived Missions Section */}
      <div className={styles["missions-section"]}>
        <div className={styles["section-header"]}>
          <h2 className={styles["section-title"]}>Archived Missions</h2>
          {/* <a href="#" className={styles["see-more-link"]}>See More</a> */}
        </div>
        <div className={styles["missions-grid"]}>
          {archivedMissions.length > 0 ? archivedMissions.map((mission) => (
            <div key={mission.id} className={`${styles["mission-card"]} ${styles.archived}`}>
              <div className={styles["mission-image"]}>
                <img src={mission.image ? `${API_BASE_URL}${mission.image}` : "/estin3.jpg"} alt={mission.title} onError={(e) => e.target.src = "/placeholder.svg"} />
              </div>
              <div className={styles["mission-content"]}>
                <h3 className={styles["mission-title"]}>{mission.title}</h3>
                <p className={styles["mission-description"]}>{mission.description}</p>
                <div className={styles["mission-info"]}>
                  <p className={styles["mission-completed"]}>Ended: {new Date(mission.endDate).toLocaleDateString()}</p>
                  <p className={styles["mission-location"]}>{mission.location}</p>
                </div>
                <button className={`${styles["mission-details-btn"]} ${styles.archived}`} onClick={() => handleMissionDetails(mission.id)}>
                  more details
                </button>
              </div>
            </div>
          )) : <p>No archived missions.</p>}
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
