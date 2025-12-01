"use client"

import { useState } from "react"
import { FaEnvelope, FaLock } from "react-icons/fa";


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

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

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
        console.log("Login successful:", userData)
        alert(`Welcome back! You've been logged in.`)
      } else {
        setErrors({
          form: "Invalid email or password",
        })
      }
      setLoading(false)
    }, 1000)
  }

  const getGreeting = () => {
    if (accountType === "volunteer") {
      return `Hello ${userInfo?.firstName || "Volunteer"}`
    } else {
      return `Hello ${userInfo?.organizationName || "Organization"}`
    }
  }

  return (
    <div className="form-section">
      <div className="form-container">
        <div className="form-header">
          <h2>{getGreeting()}</h2>
          <p>welcome back please entre you details</p>
        </div>

        {/* Account Type Tabs */}
        <div className="tabs-container">
          <button
            className={`tab-button ${accountType === "volunteer" ? "active" : "inactive"}`}
            onClick={() => {
              setAccountType("volunteer")
              setUserInfo(null)
              setErrors({})
            }}
          >
            Volunteer
          </button>
          <button
            className={`tab-button ${accountType === "organization" ? "active" : "inactive"}`}
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
          <div className="error-message" style={{ marginBottom: "1rem", textAlign: "center" }}>
            {errors.form}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
         {/* Email Field */}
<div className="form-group">
  <div className="input-wrapper">
    <FaEnvelope className="input-icon" />
    <input
      type="email"
      placeholder=".    Email"
      className="form-input"
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        if (errors.email) setErrors({ ...errors, email: "" });
      }}
    />
  </div>
  {errors.email && <div className="error-message">{errors.email}</div>}
</div>

{/* Password Field */}
<div className="form-group">
  <div className="input-wrapper">
    <FaLock className="input-icon" />
    <input
      type="password"
      placeholder=".    Password"
      className="form-input"
      value={password}
      onChange={(e) => {
        setPassword(e.target.value);
        if (errors.password) setErrors({ ...errors, password: "" });
      }}
    />
  </div>
  {errors.password && <div className="error-message">{errors.password}</div>}
</div>


          {/* Password Requirements and Forgot Link */}
          <div className="password-requirements">
            <span>password must be at least 8 characters long</span>
            <a
              href="#"
              className="forgot-link"
              onClick={(e) => {
                e.preventDefault()
                alert("Password reset link would be sent to: " + email)
              }}
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button type="submit" className="submit-button" disabled={loading}>
            <span>→</span>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  )
}
