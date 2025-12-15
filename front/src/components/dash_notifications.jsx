"use client"
import styles from "../styles/dashOrg.module.css"

export default function Notifications() {
  return (
    <div className={styles["page-container"]}>
      <div className={styles["page-header"]}>
        <h1 className={styles["page-title"]}>Notifications</h1>
        <p className={styles["page-subtitle"]}>View your notifications</p>
      </div>
      <div className={styles["empty-state"]}>
        {/* You can show a message or icon here for empty notifications */}
      </div>
    </div>
  )
}
