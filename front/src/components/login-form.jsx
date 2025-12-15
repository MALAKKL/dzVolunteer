"use client"

import { useState } from "react"
import { FaEnvelope, FaLock } from "react-icons/fa"
import styles from "../styles/signUp.module.css"

export default function LoginForm({ accountType, setAccountType, userInfo, setUserInfo }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const mockUsers = {
    volunteer: {
      email: "john@example.com",
      password: "password123",
      firstName: "John",
      familyName: "Doe",
    },
    organization: {
      email: "org@example.com",
      password: "password123",
      organizationName: "Tech Volunteers",
    },
  }

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

    setTimeout(() => {
      const mockUser = mockUsers[accountType]
      if (email === mockUser.email && password === mockUser.password) {
        const userData = {
          accountType,
          email,
          ...(accountType === "volunteer"
            ? { firstName: mockUser.firstName, familyName: mockUser.familyName }
            : { organizationName: mockUser.organizationName }),
        }

        setUserInfo(userData)
        setErrors({})
        alert(`Welcome back! You've been logged in.`)
      } else {
        setErrors({ form: "Invalid email or password" })
      }
      setLoading(false)
    }, 1000)
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
