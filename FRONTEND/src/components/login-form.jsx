"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaEnvelope, FaLock } from "react-icons/fa"
import styles from "../styles/signUp.module.css"
import { authAPI } from "../utils/api"

export default function LoginForm({ accountType, setAccountType, userInfo, setUserInfo }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid"

    if (!password) newErrors.password = "Password is required"
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setErrors({})

    try {
      const role = accountType === "volunteer" ? "volunteer" : "organization"
      const response = await authAPI.login({ email, password, role })

      if (response.token) {
        localStorage.setItem("token", response.token)
        localStorage.setItem("user", JSON.stringify(response.user))
        // Get user profile
        const profileResponse = await authAPI.getProfile()
        setUserInfo({
          accountType,
          email,
          ...profileResponse,
        })
        alert(`Welcome back! You've been logged in.`)
        // Redirect to appropriate dashboard
        navigate(accountType === "volunteer" ? "/dashVolunteer" : "/dashOrgan")
      } else {
        setErrors({ form: response.message || "Login failed" })
      }
    } catch (error) {
      console.error("Login error:", error)
      setErrors({ form: "An error occurred during login" })
    } finally {
      setLoading(false)
    }
  }

  const getGreeting = () =>
    accountType === "volunteer"
      ? `Hello ${userInfo?.firstName || "Volunteer"}`
      : `Hello ${userInfo?.organizationName || "Organization"}`

  return (
    <div className={styles["form-section"]}>
      <div className={styles["form-container"]}>
        <div className={styles["form-header"]}>
          <h2>{getGreeting()}</h2>
          <p>welcome back please enter your details</p>
        </div>

        {/* Account Type Tabs */}
        <div className={styles["tabs-container"]}>
          <button
            className={`${styles["tab-button"]} ${
              accountType === "volunteer" ? styles.active : styles.inactive
            }`}
            onClick={() => {
              setAccountType("volunteer")
              setUserInfo(null)
              setErrors({})
            }}
          >
            Volunteer
          </button>
          <button
            className={`${styles["tab-button"]} ${
              accountType === "organization" ? styles.active : styles.inactive
            }`}
            onClick={() => {
              setAccountType("organization")
              setUserInfo(null)
              setErrors({})
            }}
          >
            Organization
          </button>
        </div>

        {errors.form && (
          <div className={styles["error-message"]}>
            {errors.form}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className={styles["form-group"]}>
            <div className={styles["input-wrapper"]}>
              <FaEnvelope className={styles["input-icon"]} />
              <input
                type="email"
                placeholder="Email"
                className={styles["form-input"]}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors({ ...errors, email: "" })
                }}
              />
            </div>
            {errors.email && <div className={styles["error-message"]}>{errors.email}</div>}
          </div>

          <div className={styles["form-group"]}>
            <div className={styles["input-wrapper"]}>
              <FaLock className={styles["input-icon"]} />
              <input
                type="password"
                placeholder="Password"
                className={styles["form-input"]}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password) setErrors({ ...errors, password: "" })
                }}
              />
            </div>
            {errors.password && <div className={styles["error-message"]}>{errors.password}</div>}
          </div>

          <div className={styles["password-requirements"]}>
            <span>password must be at least 8 characters long</span>
            <a
              href="#"
              className={styles["forgot-link"]}
              onClick={(e) => {
                e.preventDefault()
                alert("Password reset link would be sent to: " + email)
              }}
            >
              Forgot password?
            </a>
          </div>

          <button type="submit" className={styles["submit-button"]} disabled={loading}>
            <span>→</span>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  )
}
