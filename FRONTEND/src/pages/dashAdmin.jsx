import React, { useState, useEffect, useMemo } from "react";
import styles from '../components/dashAdmin.module.css';
import { adminAPI } from "../utils/api";
import { getImageUrl } from "../utils/imageUtils";

const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-US') : "N/A";

function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader} style={{ cursor: "pointer" }} onClick={() => window.location.href = "/"}>
        <div className={styles.sidebarLogo}>🛡️ DZ Admin</div>
      </div>
      <ul className={styles.sidebarMenu}>
        <li>
          <button onClick={() => setActiveTab('dashboard')} className={`${styles.sidebarMenuButton} ${activeTab === 'dashboard' ? styles.active : ''}`}>
            <span>📊</span> Global Console
          </button>
        </li>
        <li>
          <button onClick={() => setActiveTab('skill-validation')} className={`${styles.sidebarMenuButton} ${activeTab === 'skill-validation' ? styles.active : ''}`}>
            <span>✅</span> Skill Verification
          </button>
        </li>
        <li style={{ marginTop: "auto", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button onClick={() => window.location.href = "/"} className={styles.sidebarMenuButton} style={{ opacity: 0.6 }}>
            <span>🏠</span> Back to Site
          </button>
        </li>
      </ul>
    </div>
  );
}

function Header({ title }) {
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.headerTitle}>{title}</h1>
        <p style={{ fontSize: "0.85rem", opacity: 0.6 }}>Manage platform users and certifications</p>
      </div>
      <div className={styles.headerUser}>
        <div className={styles.userAvatar}>AD</div>
        <div className={styles.userInfo}>
          <span style={{ fontWeight: "bold", display: "block" }}>Platform Admin</span>
          <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>Root Access</span>
        </div>
        <button
          onClick={() => { localStorage.clear(); window.location.href = "/login"; }}
          className={styles.btnLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function DashboardView({ stats, volunteers, organizations, onDelete }) {
  const [filter, setFilter] = useState('VOLUNTEER');

  // Ensure the list updates when props change
  const displayList = filter === 'VOLUNTEER' ? (volunteers || []) : (organizations || []);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.statsPanel}>
        <div
          className={`${styles.statCard} ${filter === 'VOLUNTEER' ? styles.statActive : ''}`}
          onClick={() => setFilter('VOLUNTEER')}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.statLabel}>Active Volunteers</div>
          <div className={styles.statValue}>{volunteers.length}</div>
          <p style={{ fontSize: "0.75rem", marginTop: "10px", opacity: 0.7, color: filter === 'VOLUNTEER' ? '#347362' : 'inherit' }}>
            {filter === 'VOLUNTEER' ? '📂 Currently viewing' : '👉 Click to view'}
          </p>
        </div>
        <div
          className={`${styles.statCard} ${filter === 'ORGANIZATION' ? styles.statActive : ''}`}
          onClick={() => setFilter('ORGANIZATION')}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.statLabel}>Partner Organizations</div>
          <div className={styles.statValue}>{organizations.length}</div>
          <p style={{ fontSize: "0.75rem", marginTop: "10px", opacity: 0.7, color: filter === 'ORGANIZATION' ? '#347362' : 'inherit' }}>
            {filter === 'ORGANIZATION' ? '📂 Currently viewing' : '👉 Click to view'}
          </p>
        </div>
        <div className={`${styles.statCard} ${styles.warning}`}>
          <div className={styles.statLabel}>New Requests</div>
          <div className={styles.statValue}>{stats.pendingSkills}</div>
          <p style={{ fontSize: "0.75rem", marginTop: "10px", opacity: 0.7 }}>Certification queue</p>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h2 className={styles.sectionTitle} style={{ marginBottom: "5px" }}>{filter === 'VOLUNTEER' ? 'Volunteer Directory' : 'Organization Directory'}</h2>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>Total Registered {filter === 'VOLUNTEER' ? 'Volunteers' : 'Organizations'}: {displayList.length}</p>
          </div>
          <div className={styles.tabGroup}>
            <button
              className={filter === 'VOLUNTEER' ? styles.tabActive : styles.tabInactive}
              onClick={() => setFilter('VOLUNTEER')}
            >Volunteers</button>
            <button
              className={filter === 'ORGANIZATION' ? styles.tabActive : styles.tabInactive}
              onClick={() => setFilter('ORGANIZATION')}
            >Organizations</button>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: "15%" }}>Joined</th>
                <th style={{ width: "35%" }}>{filter === 'VOLUNTEER' ? 'Volunteer Name' : 'Organization Name'}</th>
                <th style={{ width: "30%" }}>Email</th>
                <th style={{ width: "20%", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayList.map((user, idx) => (
                <tr key={user.userId || idx}>
                  <td style={{ fontSize: "0.85rem", opacity: 0.7 }}>{formatDate(user.joinedAt)}</td>
                  <td>
                    <div style={{ fontWeight: "700", color: "#1a202c" }}>{user.displayName}</div>
                    {user.isPartial && <span style={{ fontSize: "10px", background: "#fef3c7", color: "#92400e", padding: "2px 6px", borderRadius: "4px", marginLeft: "10px" }}>Incomplete</span>}
                  </td>
                  <td style={{ color: "#4a5568", fontSize: "0.9rem" }}>{user.email}</td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      className={`${styles.btn} ${styles.btnDanger} ${styles.btnSm}`}
                      onClick={() => onDelete(user.userId, user.displayName)}
                      disabled={!user.userId}
                    >
                      🗑️ Delete Account
                    </button>
                  </td>
                </tr>
              ))}
              {displayList.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "60px", color: "#a0aec0", fontStyle: "italic" }}>
                    No {filter.toLowerCase()}s found in the database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SkillValidationView() {
  const [validations, setValidations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getPendingSkills();
      setValidations(Array.isArray(data) ? data : []);
    } catch (e) { console.error("Admin: Failed to fetch skill queue", e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPending(); }, []);

  const handleAction = async (id, status) => {
    try {
      await adminAPI.verifySkill(id, status);
      alert(`Skill status updated: ${status}`);
      fetchPending();
    } catch (e) { alert("Action error: " + e.message); }
  };

  if (loading) return <div style={{ padding: "60px", textAlign: "center", opacity: 0.6 }}>Analyzing the queue...</div>;

  return (
    <div>
      <h2 className={styles.sectionTitle}>Skill Certification Queue</h2>
      {validations.length === 0 ? (
        <div style={{ background: "#f8fafc", padding: "80px", borderRadius: "12px", textAlign: "center", border: "1px dashed #cbd5e0" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>🌈</div>
          <p style={{ fontWeight: "bold", color: "#347362", fontSize: "1.2rem" }}>Everything is in order!</p>
          <p style={{ opacity: 0.6 }}>No new certification requests to process at this time.</p>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Volunteer</th>
                <th>Skill</th>
                <th>Proof</th>
                <th>Decision</th>
              </tr>
            </thead>
            <tbody>
              {validations.map((v) => (
                <tr key={v.id}>
                  <td style={{ fontWeight: "bold" }}>{v.volunteer?.firstName} {v.volunteer?.lastName}</td>
                  <td><span style={{ background: "#edf2f7", padding: "4px 10px", borderRadius: "6px", fontSize: "0.9rem" }}>{v.skill?.name}</span></td>
                  <td>
                    {v.certificate ? (
                      <a href={getImageUrl(v.certificate)} target="_blank" rel="noreferrer" style={{ color: "#3182ce", textDecoration: "underline", fontWeight: "bold" }}>
                        Open document
                      </a>
                    ) : (
                      <span style={{ opacity: 0.4 }}>No file</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button className={`${styles.btn} ${styles.btnSuccess} ${styles.btnSm}`} onClick={() => handleAction(v.id, "VERIFIED")}>Approve</button>
                      <button className={`${styles.btn} ${styles.btnDanger} ${styles.btnSm}`} onClick={() => handleAction(v.id, "REJECTED")}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [volunteers, setVolunteers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [allPlatformUsers, setAllPlatformUsers] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setFetchError(null);
      const [v, o, p, u, catalogResponse] = await Promise.all([
        adminAPI.getVolunteers().catch(e => { console.error("Admin: Volunteer list fetch failed", e); return []; }),
        adminAPI.getOrganizations().catch(e => { console.error("Admin: Organization list fetch failed", e); return []; }),
        adminAPI.getPendingSkills().catch(e => { console.error("Admin: Pending count fetch failed", e); return []; }),
        adminAPI.getPlatformUsers().catch(e => { console.error("Admin: Platform users fetch failed", e); return []; }),
        adminAPI.getSkillsCatalog().catch(e => { console.error("Admin: Skill catalog fetch failed", e); return []; })
      ]);

      const finalCatalog = (catalogResponse && catalogResponse.length > 0)
        ? catalogResponse
        : [
          { id: 'cmksch2s00000u7dgetowjdlf', name: 'First Aid & Emergency Response' },
          { id: 'cmksch2s00001u7dgpwmrh573', name: 'Event Coordination' },
          { id: 'cmksch2s00003u7dgjuovir48', name: 'Web Development (React/Fullstack)' },
          { id: 'cmksch2s00004u7dghu5ea425', name: 'Language Translation' },
          { id: 'cmksch2s0000cu7dgziww06ac', name: 'SDG 3: Good Health' },
          { id: 'cmksch2s0000gu7dgrrgfgk7x', name: 'SDG 13: Climate Action' }
        ];

      if (finalCatalog.length === 0) {
        console.warn("DASHBOARD: Skill catalog empty.");
      }

      if (u.length === 0 && v.length === 0 && o.length === 0) {
        console.warn("ADMIN: All platform data sources returned empty.");
      }

      setVolunteers(Array.isArray(v) ? v : []);
      setOrganizations(Array.isArray(o) ? o : []);
      setPendingCount(Array.isArray(p) ? p.length : 0);
      setAllPlatformUsers(Array.isArray(u) ? u : []);

      console.log(`ADMIN: Synced ${u.length} users, ${v.length} volunteers, ${o.length} orgs.`);
    } catch (e) {
      console.error("ADMIN: Critical sync error", e);
      setFetchError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (userId, name) => {
    if (!window.confirm(`WARNING: Are you sure you want to permanently delete the account of "${name}"?`)) return;
    try {
      await adminAPI.deleteUser(userId);
      alert("Account deleted successfully.");
      fetchData();
    } catch (e) { alert("Deletion failed: " + e.message); }
  };

  const renderContent = () => {
    if (loading) return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <div style={{ fontSize: "1.2rem", color: "#347362", fontWeight: "bold" }}>Syncing admin console...</div>
        <p style={{ opacity: 0.5, marginTop: "10px" }}>Fetching real-time data from server.</p>
      </div>
    );

    if (fetchError) return (
      <div style={{ padding: "60px", textAlign: "center", color: "#e53e3e" }}>
        <h3>🚨 Sync Error</h3>
        <p>{fetchError}</p>
        <button onClick={fetchData} className={styles.btn} style={{ marginTop: "20px", background: "#fbd38d", color: "#744210" }}>Try Reconnecting</button>
      </div>
    );

    switch (activeTab) {
      case 'dashboard':
        // RELIABLE MERGE: Ensure every user in allPlatformUsers is shown
        // Combine with specific profile data if available
        const vMap = new Map(volunteers.map(v => [v.userId || v.id, v]));
        const oMap = new Map(organizations.map(o => [o.userId || o.id, o]));

        const combinedList = allPlatformUsers.map(u => {
          const vData = vMap.get(u.id);
          const oData = oMap.get(u.id);

          return {
            userId: u.id,
            email: u.email,
            role: u.role,
            displayName: vData ? `${vData.firstName} ${vData.lastName}`.trim() : (oData ? oData.name : (u.firstName ? `${u.firstName} ${u.lastName || ''}`.trim() : u.email)),
            joinedAt: u.createdAt,
            isPartial: !vData && !oData && u.role !== 'ADMIN'
          };
        });

        const filteredVolunteers = combinedList.filter(u => u.role === 'VOLUNTEER');
        const filteredOrgs = combinedList.filter(u => u.role === 'ORGANIZATION');

        return (
          <DashboardView
            stats={{ volunteers: filteredVolunteers.length, organizations: filteredOrgs.length, pendingSkills: pendingCount }}
            volunteers={filteredVolunteers}
            organizations={filteredOrgs}
            onDelete={handleDelete}
          />
        );
      case 'skill-validation': return <SkillValidationView />;
      default: return null;
    }
  };

  return (
    <div className={styles.adminDashboard}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.mainContent}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 30px", borderBottom: "1px solid #edf2f7", background: "white" }}>
          <Header title={activeTab === 'dashboard' ? "Global Network Control" : "Skill Management"} />
          <button onClick={fetchData} className={styles.btn} style={{ background: "#edf2f7", color: "#2d3748", border: "1px solid #e2e8f0", padding: "8px 16px", borderRadius: "8px", fontWeight: "bold" }}>🔄 Refresh</button>
        </div>
        <div className={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
}