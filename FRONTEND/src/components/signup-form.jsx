"use client"

import { useState } from "react"
import { FaUser, FaBuilding, FaEnvelope, FaLock } from "react-icons/fa"
import { GoogleLogin } from "@react-oauth/google"

import "../App.css"
import styles from "../styles/signUp.module.css"
import { authAPI } from "../utils/api"

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
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
      if (!formData.familyName.trim()) newErrors.familyName = "Last name is required"
    } else {
      if (!formData.organizationName.trim()) newErrors.organizationName = "Org name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be 8+ characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})
    try {
      let response
      if (accountType === "volunteer") {
        response = await authAPI.registerVolunteer({
          firstName: formData.firstName,
          lastName: formData.familyName,
          email: formData.email,
          password: formData.password,
        })
      } else {
        response = await authAPI.registerOrganization({
          name: formData.organizationName,
          email: formData.email,
          password: formData.password,
        })
      }

      if (response.token) {
        localStorage.setItem("token", response.token)
        localStorage.setItem("role", response.user?.role || (accountType === "volunteer" ? "VOLUNTEER" : "ORGANIZATION"))
        alert("Account created successfully!")
        setTimeout(() => {
          window.location.href = accountType === "volunteer" ? "/voldashboard" : "/orgdashboard"
        }, 100)
      } else {
        setErrors({ form: response.message || "Registration failed" })
      }
    } catch (error) {
      setErrors({ form: error.message || "An unexpected error occurred" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = async (credentialResponse) => {
    setIsLoading(true)
    setErrors({})
    try {
      const response = await authAPI.googleAuth({
        credential: credentialResponse.credential,
        role: accountType.toUpperCase(),
      })

      if (response.token) {
        localStorage.setItem("token", response.token)
        localStorage.setItem("role", response.user?.role || accountType.toUpperCase())
        alert("Google signup successful!")
        window.location.href = "/"
      } else {
        setErrors({ form: response.message || "Google signup failed" })
      }
    } catch (error) {
      setErrors({ form: error.message || "Google auth error" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles["form-section"]}>
      <div className={styles["form-container"]}>
        <div className={styles["form-header"]}>
          <h2>Join dzVolunteer</h2>
          <p>Create your profile to start making an impact</p>
        </div>

        <div className={styles["google-button-wrapper"]}>
          <GoogleLogin
            onSuccess={handleGoogleSignup}
            onError={() => alert("Google login failed")}
            useOneTap
          />
        </div>

        <div className={styles["tabs-container"]}>
          <button
            onClick={() => setAccountType("volunteer")}
            className={`${styles["tab-button"]} ${accountType === "volunteer" ? styles.active : styles.inactive}`}
          >
            Volunteer
          </button>
          <button
            onClick={() => setAccountType("organization")}
            className={`${styles["tab-button"]} ${accountType === "organization" ? styles.active : styles.inactive}`}
          >
            Organization
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {accountType === "volunteer" ? (
            <div className={styles["form-row"]}>
              <div className={styles["form-group"]}>
                <div className={styles["input-wrapper"]}>
                  <FaUser className={styles["input-icon"]} />
                  <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} className={styles["form-input"]} required />
                </div>
                {errors.firstName && <p className={styles["error-message"]}>{errors.firstName}</p>}
              </div>
              <div className={styles["form-group"]}>
                <div className={styles["input-wrapper"]}>
                  <FaUser className={styles["input-icon"]} />
                  <input type="text" name="familyName" placeholder="Last Name" value={formData.familyName} onChange={handleInputChange} className={styles["form-input"]} required />
                </div>
                {errors.familyName && <p className={styles["error-message"]}>{errors.familyName}</p>}
              </div>
            </div>
          ) : (
            <div className={styles["form-group"]}>
              <div className={styles["input-wrapper"]}>
                <FaBuilding className={styles["input-icon"]} />
                <input type="text" name="organizationName" placeholder="Organization Name" value={formData.organizationName} onChange={handleInputChange} className={styles["form-input"]} required />
              </div>
              {errors.organizationName && <p className={styles["error-message"]}>{errors.organizationName}</p>}
            </div>
          )}

          <div className={styles["form-group"]}>
            <div className={styles["input-wrapper"]}>
              <FaEnvelope className={styles["input-icon"]} />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} className={styles["form-input"]} required />
            </div>
            {errors.email && <p className={styles["error-message"]}>{errors.email}</p>}
          </div>

          <div className={styles["form-group"]}>
            <div className={styles["input-wrapper"]}>
              <FaLock className={styles["input-icon"]} />
              <input type="password" name="password" placeholder="Create Password" value={formData.password} onChange={handleInputChange} className={styles["form-input"]} required />
            </div>
            {errors.password && <p className={styles["error-message"]}>{errors.password}</p>}
          </div>

          {errors.form && <div className={styles["error-message"]} style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>{errors.form}</div>}

          <button type="submit" disabled={isLoading} className={styles["submit-button"]}>
            {isLoading ? "Please wait..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  )
}
