// src/components/Missions.jsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { WhatsappIcon, InstagramIcon, FacebookIcon, LinkedinIcon } from "./SocialIcons";
import { Link } from "react-router-dom";
import styles from "../components/Missions.module.css";
import NavbarVisitor from "./navBarVisitor";
import { missionsAPI } from "../utils/api";
import { getImageUrl } from "../utils/imageUtils";

export default function Missions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("missions");
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Define the sections for the navbar
  const sections = ["home", "about", "missions", "organizations", "contact"];

  // Handle navigation clicks - redirect to home page with hash
  const handleNavClick = (section) => {
    setActiveSection(section);
    navigate(`/#${section}`);
  };

  // Fetch missions on component mount
  useEffect(() => {
    const fetchMissions = async () => {
      try {
        setLoading(true);
        const data = await missionsAPI.getAllMissions();
        // Transform API data to match component expectations
        const transformedMissions = data.map(mission => ({
          id: mission.id,
          title: mission.title,
          organization: mission.organization?.name || "Unknown Organization",
          date: new Date(mission.startDate).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          description: mission.description,
          number: mission.volunteersNeeded.toString(),
          location: mission.location,
          image: getImageUrl(mission.image, "/mp2.png"),
          category: mission.sdg?.title || "General",
        }));
        setMissions(transformedMissions);
        setError(null);
      } catch (err) {
        console.error("Error fetching missions:", err);
        setError("Failed to load missions");
        // Fallback to some default data
        setMissions([
          {
            id: 1,
            title: "Loading missions...",
            organization: "Please wait",
            date: "",
            description: "",
            number: "0",
            location: "",
            image: "/mp2.png",
            category: "",
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  // Filter missions based on search query
  const filteredMissions = useMemo(() => {
    return missions.filter(
      (mission) =>
        mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mission.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mission.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mission.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mission.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, missions]);

  return (
    <>
      {/* Navbar with navigation logic */}
      <NavbarVisitor
        sections={sections}
        activeSection={activeSection}
        handleNavClick={handleNavClick}
      />

      <div className={styles.missionsPage}>
        <div className={styles.missionsContainer}>
          {/* Header */}
          <div className={styles.missionHeader}>
            <div className={styles.missionLeafIcon}></div>
            <h1>search for a mission</h1>
          </div>

          {/* Search Input */}
          <div className={styles.missionSearchWrapper}>
            <input
              type="text"
              placeholder="search for a mission"
              className={styles.missionSearchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Mission Cards */}
          <div className={styles.missionCardsContainer}>
            {filteredMissions.length > 0 ? (
              filteredMissions.map((mission) => (
                <div key={mission.id} className={styles.missionCard}>
                  <div className={styles.missionCardImage}>
                    <img src={mission.image || "/placeholder.svg"} alt={mission.title} />
                    <span className={styles.categoryBadge}>{mission.category}</span>
                  </div>
                  <div className={styles.missionCardContent}>
                    <h3>{mission.title}</h3>
                    <p className={styles.missionOrganization}>
                      <strong>Organization:</strong> {mission.organization}
                    </p>
                    <p className={styles.missionDate}>
                      <strong>Date:</strong> {mission.date}
                    </p>
                    <p className={styles.missionLocation}>
                      <strong>Location:</strong> {mission.location}
                    </p>
                    <p className={styles.missionLabel}>description</p>
                    <p className={styles.missionDescription}>{mission.description}</p>
                    <p className={styles.missionVolunteers}>
                      <strong>Volunteers needed:</strong> {mission.number}
                    </p>

                    <Link to={`/volunteer/mission/${mission.id}`} className={styles.missionSeeMoreBtn}>
                      see more
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.missionNoResults}>
                <p>No missions found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <button className={styles.contactBtn}>contact us</button>

          <div className={styles.footerInfo}>
            <span className={styles.phone}>+213 555 123 456</span>
            <span className={styles.email}>dz_voulnteers@gmail.com</span>
          </div>

          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialIcon} aria-label="WhatsApp">
              <WhatsappIcon />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
          </div>
        </div>
      </footer> */}
    </>
  );
}