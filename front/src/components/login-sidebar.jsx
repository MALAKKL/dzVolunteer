"use client"

import { useNavigate } from "react-router-dom"
import styles from "../styles/signUp.module.css"

export default function LoginSidebar() {
  const navigate = useNavigate()

  return (
    <div className={styles.sidebar}>
      <div className={styles["sidebar-content"]}>
        <div className={styles["logo-container"]}>
          <img
            src="/logo2.svg"
            alt="Logo"
            style={{ width: "auto", height: "100px" }}
          />
        </div>

        <h1>Welcome back! We're glad to see you again</h1>

        <div className={styles["login-section"]}>
          <p className={styles["login-label"]}>I don't have an account</p>
          <button
            className={styles["login-button"]}
            onClick={() => navigate("/signUp")}
          >
            <span>→</span>
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}
