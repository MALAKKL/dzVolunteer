import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../components/Organizations.module.css";
import NavbarVisitor from "./navBarVisitor";
import { organizationsAPI } from "../utils/api";
import { getImageUrl } from "../utils/imageUtils";

export default function OrganizationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("organizations");
  const [organizations, setOrganizations] = useState([]);
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

  // Fetch organizations on component mount
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        const response = await organizationsAPI.getAllOrganizations();
        const data = response.data || response; // Handle pagination response
        const transformedOrgs = data.map(org => ({
          id: org.id,
          name: org.name,
          subtitle: org.description || "Non-profit organization",
          image: getImageUrl(org.logo || org.logoUrl, "/organization-default.jpg"),
          description: org.mission || org.description || "Dedicated to making a positive impact in the community.",
        }));
        setOrganizations(transformedOrgs);
        setError(null);
      } catch (err) {
        console.error("Error fetching organizations:", err);
        setError("Failed to load organizations");
        // Fallback data
        setOrganizations([
          {
            id: 1,
            name: "Loading organizations...",
            subtitle: "Please wait",
            image: "/organization-default.jpg",
            description: "Organizations will appear here once loaded.",
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const filteredOrganizations = useMemo(() => {
    return organizations.filter(
      (org) =>
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, organizations]);

  return (
    <>
      {/* Pass required props to NavbarVisitor */}
      <NavbarVisitor
        sections={sections}
        activeSection={activeSection}
        handleNavClick={handleNavClick}
      />

      <div className={styles.organizationsPage}>
        <div className={styles.organizationsContainer}>
          {/* Header */}
          <div className={styles.orgHeader}>
            <div className={styles.orgLeafIcon}></div>
            <h1>search for an organization</h1>
          </div>

          {/* Search Input */}
          <div className={styles.orgSearchWrapper}>
            <input
              type="text"
              placeholder="search for an organization"
              className={styles.orgSearchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Organization Cards */}
          <div className={styles.orgCardsContainer}>
            {filteredOrganizations.length > 0 ? (
              filteredOrganizations.map((org) => (
                <div key={org.id} className={styles.orgCard}>
                  <div className={styles.orgCardImage}>
                    <img src={org.image || "/placeholder.svg"} alt={org.name} />
                  </div>
                  <div className={styles.orgCardContent}>
                    <h3>{org.name}</h3>
                    <p className={styles.orgSubtitle}>{org.subtitle}</p>
                    <p className={styles.orgLabel}>description</p>
                    <p className={styles.orgDescription}>{org.description}</p>

                    <a href={`/organizations/${org.id}`} className={styles.orgSeeMoreBtn}>
                      see more
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.orgNoResults}>
                <p>No organizations found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}