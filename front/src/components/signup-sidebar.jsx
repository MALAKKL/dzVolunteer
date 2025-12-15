import { useNavigate } from "react-router-dom"
import "../App.css" // global styles (OK)
import styles from "../styles/signUp.module.css" // ✅ CSS Module

export default function SignupSidebar() {
  const navigate = useNavigate()

  return (
    <div className={styles.sidebar}>
      <div className={styles["logo-container"]}>
        <img
          src="/logo2.svg"
          alt="Logo"
          style={{ width: "auto", height: "100px" }}
        />
      </div>

      <div className={styles["sidebar-content"]}>
        <h1>Join DZ Volunteers Today</h1>

        <div className={styles["login-section"]}>
          <p className={styles["login-label"]}>
            I have already an account
          </p>

          <button
            className={styles["login-button"]}
            onClick={() => navigate("/login")}
          >
            Log in
            <svg
              className={styles["button-arrow"]}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
