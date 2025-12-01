"use client"
import { FaUser, FaBuilding, FaEnvelope, FaLock } from "react-icons/fa";

import { useState } from "react"
import "../App.css"

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
    <div className="form-section">
      <div className="form-container">
        {/* header */}
        <div className="form-header">
          <h2>Create Account</h2>
          <p>One Step Away from Something Great!</p>
        </div>

        {/* google signup button */}
     <button onClick={handleGoogleSignup} className="google-button">
  <img 
    src="/google.webp" 
    alt="Google" 
    className="google-icon"
  />
  Continue with Google
</button>

        {/* qccount type Tabs */}
        <div className="tabs-container">
          <button
            onClick={() => setAccountType("volunteer")}
            className={`tab-button ${accountType === "volunteer" ? "active" : "inactive"}`}
          >
            Volunteer
          </button>
          <button
            onClick={() => setAccountType("organization")}
            className={`tab-button ${accountType === "organization" ? "active" : "inactive"}`}
          >
            Organization
          </button>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit}>
         {/* volunteer fields */}
{accountType === "volunteer" && (
  <div className="form-row">
    <div className="form-group">
      <div className="input-wrapper">
        <FaUser className="input-icon" />
        <input
          type="text"
          name="firstName"
          placeholder=".    first name"
          value={formData.firstName}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      {errors.firstName && <p className="error-message">{errors.firstName}</p>}
    </div>

    <div className="form-group">
      <div className="input-wrapper">
        <FaUser className="input-icon" />
        <input
          type="text"
          name="familyName"
          placeholder=".      family name"
          value={formData.familyName}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      {errors.familyName && <p className="error-message">{errors.familyName}</p>}
    </div>
  </div>
)}

{/* organization field */}
{accountType === "organization" && (
  <div className="form-group">
    <div className="input-wrapper">
      <FaBuilding className="input-icon" />
      <input
        type="text"
        name="organizationName"
        placeholder=".     organization name"
        value={formData.organizationName}
        onChange={handleInputChange}
        className="form-input"
      />
    </div>
    {errors.organizationName && <p className="error-message">{errors.organizationName}</p>}
  </div>
)}

{/* email field */}
<div className="form-group">
  <div className="input-wrapper">
    <FaEnvelope className="input-icon" />
    <input
      type="email"
      name="email"
      placeholder=".    Email"
      value={formData.email}
      onChange={handleInputChange}
      className="form-input"
    />
  </div>
  {errors.email && <p className="error-message">{errors.email}</p>}
</div>

{/* password field */}
<div className="form-group">
  <div className="input-wrapper">
    <FaLock className="input-icon" />
    <input
      type="password"
      name="password"
      placeholder=".    password"
      value={formData.password}
      onChange={handleInputChange}
      className="form-input"
    />
  </div>
  {errors.password && <p className="error-message">{errors.password}</p>}
</div>


          {/* password requirements */}
          <div className="password-requirements">
            <span>password must be at least 8 characters long</span>
            <a href="#" className="forgot-link">
              Forgot password?
            </a>
          </div>

          {/* sign up yutton */}
          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? "Creating account..." : "Sign up"}
            <svg className="button-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}
