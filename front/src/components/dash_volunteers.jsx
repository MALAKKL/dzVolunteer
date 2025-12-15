"use client"
import styles from "../styles/dashOrg.module.css"

export default function Volunteers() {
  return (
    <div className={styles["page-container"]}>
      <div className={styles["page-header"]}>
        <h1 className={styles["page-title"]}>Volunteers</h1>
        <p className={styles["page-subtitle"]}>
          Manage your volunteers
        </p>
      </div>

      <div className={styles["empty-state"]}>
        {/* empty for now */}
      </div>
    </div>
  )
}
