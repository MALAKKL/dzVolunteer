"use client";
import styles from "../styles/dashOrg.module.css";

import {
  FiUser,
  FiClipboard,
  FiUsers,
  FiBell,
  FiLogOut,
} from "react-icons/fi";

export default function Sidebar({ currentPage, onNavigate }) {
  const menuItems = [
    { id: "profile", label: "Profile", icon: FiUser },
    { id: "missions", label: "Missions", icon: FiClipboard },
    { id: "volunteers", label: "Volunteers", icon: FiUsers },
    { id: "notifications", label: "Notifications", icon: FiBell },
  ];

  return (
    <aside className={styles.sidebar}>
      {/* Header */}
      <div className={styles["sidebar-header"]}>
        <img
          src="/logo2.svg"
          alt="Logo"
          style={{ width: "auto", height: "100px" }}
        />
      </div>

      {/* Navigation */}
      <div className={styles["sidebar-scroll"]}>
        <nav className={styles["sidebar-nav"]}>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`${styles["nav-item"]} ${
                  currentPage === item.id ? styles.active : ""
                }`}
                onClick={() => onNavigate(item.id)}
              >
                <Icon className={styles["nav-icon"]} size={18} />
                <span className={styles["nav-label"]}>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <button className={styles["logout-btn"]}>
        <FiLogOut className={styles["logout-icon"]} size={18} />
        <span>Logout</span>
      </button>
    </aside>
  );
}
