"use client"

import { useState } from "react"
import { FaUser, FaBuilding, FaEnvelope, FaLock } from "react-icons/fa"

import "../App.css" // global styles (OK)
import styles from "../styles/signUp.module.css" 

export default function SignupForm() {
  const [accountType, setAccountType] = useState("volunteer")
  const [formData, setFormData] = useState({
    firstName: "",
    familyName: "",
    organizationName: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (accountType === "volunteer") {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required"
      }

      if (!formData.familyName.trim()) {
        newErrors.familyName = "Family name is required"
      }
    } else if (accountType === "organization") {
      if (!formData.organizationName.trim()) {
        newErrors.organizationName = "Organization name is required"
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      console.log("[v0] Signing up with data:", { ...formData, accountType })
      // simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert(`Account created successfully as ${accountType}!`)
    } catch (error) {
      console.error("[v0] Signup error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = () => {
    console.log("[v0] Google signup clicked")
    alert("Google signup functionality would be integrated here")
  }

  return (
   <div className={styles["form-section"]}>
  <div className={styles["form-container"]}>
    {/* header */}
    <div className={styles["form-header"]}>
      <h2>Create Account</h2>
      <p>One Step Away from Something Great!</p>
    </div>

    {/* google signup button */}
    <button
      onClick={handleGoogleSignup}
      className={styles["google-button"]}
    >
      <img
        src="/google.webp"
        alt="Google"
        className={styles["google-icon"]}
      />
      Continue with Google
    </button>

    {/* account type Tabs */}
    <div className={styles["tabs-container"]}>
      <button
        onClick={() => setAccountType("volunteer")}
        className={`${styles["tab-button"]} ${
          accountType === "volunteer"
            ? styles.active
            : styles.inactive
        }`}
      >
        Volunteer
      </button>

      <button
        onClick={() => setAccountType("organization")}
        className={`${styles["tab-button"]} ${
          accountType === "organization"
            ? styles.active
            : styles.inactive
        }`}
      >
        Organization
      </button>
    </div>

    {/* form */}
    <form onSubmit={handleSubmit}>
      {accountType === "volunteer" && (
        <div className={styles["form-row"]}>
          <div className={styles["form-group"]}>
            <div className={styles["input-wrapper"]}>
              <FaUser className={styles["input-icon"]} />
              <input
                type="text"
                name="firstName"
                placeholder="first name"
                value={formData.firstName}
                onChange={handleInputChange}
                className={styles["form-input"]}
              />
            </div>
            {errors.firstName && (
              <p className={styles["error-message"]}>
                {errors.firstName}
              </p>
            )}
          </div>

          <div className={styles["form-group"]}>
            <div className={styles["input-wrapper"]}>
              <FaUser className={styles["input-icon"]} />
              <input
                type="text"
                name="familyName"
                placeholder="family name"
                value={formData.familyName}
                onChange={handleInputChange}
                className={styles["form-input"]}
              />
            </div>
            {errors.familyName && (
              <p className={styles["error-message"]}>
                {errors.familyName}
              </p>
            )}
          </div>
        </div>
      )}

      {accountType === "organization" && (
        <div className={styles["form-group"]}>
          <div className={styles["input-wrapper"]}>
            <FaBuilding className={styles["input-icon"]} />
            <input
              type="text"
              name="organizationName"
              placeholder="organization name"
              value={formData.organizationName}
              onChange={handleInputChange}
              className={styles["form-input"]}
            />
          </div>
          {errors.organizationName && (
            <p className={styles["error-message"]}>
              {errors.organizationName}
            </p>
          )}
        </div>
      )}

      <div className={styles["form-group"]}>
        <div className={styles["input-wrapper"]}>
          <FaEnvelope className={styles["input-icon"]} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles["form-input"]}
          />
        </div>
        {errors.email && (
          <p className={styles["error-message"]}>
            {errors.email}
          </p>
        )}
      </div>

      <div className={styles["form-group"]}>
        <div className={styles["input-wrapper"]}>
          <FaLock className={styles["input-icon"]} />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleInputChange}
            className={styles["form-input"]}
          />
        </div>
        {errors.password && (
          <p className={styles["error-message"]}>
            {errors.password}
          </p>
        )}
      </div>

      <div className={styles["password-requirements"]}>
        <span>password must be at least 8 characters long</span>
        <a href="#" className={styles["forgot-link"]}>
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={styles["submit-button"]}
      >
        {isLoading ? "Creating account..." : "Sign up"}
        <svg
          className={styles["button-arrow"]}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </form>
  </div>
</div>

  )
}
