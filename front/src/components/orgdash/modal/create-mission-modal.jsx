"use client"

import { useState, useRef } from "react"
import { FiX, FiUpload } from "react-icons/fi"

export default function CreateMissionModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    volunteersNeeded: "",
    competencies: [],
  })

  const [imagePreview, setImagePreview] = useState(null)
  const [uploadError, setUploadError] = useState(null)
  const fileInputRef = useRef(null)
  const [addCompDropdown, setAddCompDropdown] = useState(false)
  const [newCompetencyInput, setNewCompetencyInput] = useState("")
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const ALL_COMPETENCIES = [
    "Leadership",
    "Communication",
    "Teamwork",
    "Problem Solving",
    "Project Management",
    "Critical Thinking",
    "Creativity",
    "Technical",
    "Empathy",
    "Languages"
  ]

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    setUploadError(null)
    
    if (!file) {
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size should be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
      setUploadError(null)
      setFormData({ ...formData, imageFile: file })
    }
    reader.onerror = () => {
      setUploadError('Error reading file. Please try again.')
    }
    reader.readAsDataURL(file)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    setUploadError(null)
    setFormData({ ...formData, imageFile: null })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.title.trim()) {
      errors.title = "Mission name is required"
    }
    
    if (!formData.description.trim()) {
      errors.description = "Description is required"
    }
    
    if (!formData.location.trim()) {
      errors.location = "Location is required"
    }
    
    if (!formData.startDate) {
      errors.startDate = "Start date is required"
    }
    
    if (!formData.endDate) {
      errors.endDate = "End date is required"
    } else if (formData.startDate && formData.endDate < formData.startDate) {
      errors.endDate = "End date must be after start date"
    }
    
    if (!formData.volunteersNeeded || parseInt(formData.volunteersNeeded) <= 0) {
      errors.volunteersNeeded = "Please enter a valid number of volunteers needed"
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    // Prepare mission data
    const missionData = {
      id: Date.now(), // Temporary ID, will be replaced by backend
      title: formData.title.trim(),
      description: formData.description.trim(),
      location: formData.location.trim(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      volunteersNeeded: parseInt(formData.volunteersNeeded) || 0,
      competencies: formData.competencies,
      status: "Active",
      image: imagePreview || "/placeholder.svg",
      imageFile: formData.imageFile,
      createdAt: new Date().toISOString()
    }

    try {
      // Call the onSave callback and wait for it to complete
      if (onSave) {
        await onSave(missionData)
      }

      // Only close and reset if API call succeeds
      setIsSubmitting(false)
      onClose()
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        location: "",
        startDate: "",
        endDate: "",
        volunteersNeeded: "",
        competencies: [],
      })
      setImagePreview(null)
      setUploadError(null)
      setValidationErrors({})
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      // Handle API errors
      console.error("Error creating mission:", error)
      setIsSubmitting(false)
      alert(`Failed to create mission: ${error.message || "Please try again"}`)
    }
  }

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50,
      padding: "1rem"
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
        maxWidth: "42rem",
        width: "100%",
        maxHeight: "90vh",
        overflow: "auto"
      }}>
        {/* Header */}
        <div style={{
          position: "sticky",
          top: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.5rem",
          borderBottom: "1px solid #e5e5e5",
          backgroundColor: "white"
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0F393B" }}>Create New Mission</h2>
          <button 
            onClick={onClose} 
            style={{ color: "#6b7280", backgroundColor: "transparent", border: "none", cursor: "pointer" }}
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.5rem", display: "block" }}>
              Mission Image
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            {imagePreview ? (
              <div style={{ position: "relative" }}>
                <img
                  src={imagePreview}
                  alt="Mission preview"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #e5e5e5"
                  }}
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <FiX size={18} />
                </button>
              </div>
            ) : (
              <div
                onClick={handleButtonClick}
                style={{
                  border: "2px dashed #e5e5e5",
                  borderRadius: "8px",
                  padding: "2rem",
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor: "#f9fafb",
                  transition: "all 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#34B26A"
                  e.currentTarget.style.backgroundColor = "#f0fdf4"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e5e5e5"
                  e.currentTarget.style.backgroundColor = "#f9fafb"
                }}
              >
                <FiUpload size={32} style={{ color: "#6b7280" }} />
                <p style={{ color: "#6b7280", margin: 0 }}>Click to upload mission image</p>
                <p style={{ color: "#9ca3af", fontSize: "0.75rem", margin: 0 }}>PNG, JPG up to 5MB</p>
              </div>
            )}
            {uploadError && (
              <p style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "0.5rem" }}>{uploadError}</p>
            )}
          </div>

          <div>
            <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.5rem", display: "block" }}>
              Mission Name
            </label>
            <input
              type="text"
              placeholder="e.g., Beach Cleanup Initiative"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "6px",
                border: validationErrors.title ? "1px solid #ef4444" : "1px solid #e5e5e5",
                backgroundColor: "#f9fafb"
              }}
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value })
                if (validationErrors.title) {
                  const { title, ...rest } = validationErrors
                  setValidationErrors(rest)
                }
              }}
            />
            {validationErrors.title && (
              <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }}>{validationErrors.title}</p>
            )}
          </div>

          <div>
            <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.5rem", display: "block" }}>
              Description
            </label>
            <textarea
              placeholder="Describe your mission..."
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "6px",
                border: validationErrors.description ? "1px solid #ef4444" : "1px solid #e5e5e5",
                backgroundColor: "#f9fafb",
                minHeight: "96px",
                resize: "none"
              }}
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value })
                if (validationErrors.description) {
                  const { description, ...rest } = validationErrors
                  setValidationErrors(rest)
                }
              }}
            />
            {validationErrors.description && (
              <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }}>{validationErrors.description}</p>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.5rem", display: "block" }}>
                Start Date
              </label>
              <input
                type="date"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: validationErrors.startDate ? "1px solid #ef4444" : "1px solid #e5e5e5",
                  backgroundColor: "#f9fafb"
                }}
                value={formData.startDate}
                onChange={(e) => {
                  setFormData({ ...formData, startDate: e.target.value })
                  if (validationErrors.startDate) {
                    const { startDate, ...rest } = validationErrors
                    setValidationErrors(rest)
                  }
                }}
              />
              {validationErrors.startDate && (
                <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }}>{validationErrors.startDate}</p>
              )}
            </div>
            <div>
              <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.5rem", display: "block" }}>
                End Date
              </label>
              <input
                type="date"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: validationErrors.endDate ? "1px solid #ef4444" : "1px solid #e5e5e5",
                  backgroundColor: "#f9fafb"
                }}
                value={formData.endDate}
                onChange={(e) => {
                  setFormData({ ...formData, endDate: e.target.value })
                  if (validationErrors.endDate) {
                    const { endDate, ...rest } = validationErrors
                    setValidationErrors(rest)
                  }
                }}
                min={formData.startDate || undefined}
              />
              {validationErrors.endDate && (
                <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }}>{validationErrors.endDate}</p>
              )}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.5rem", display: "block" }}>
                Volunteers Needed
              </label>
              <input
                type="number"
                placeholder="15"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: validationErrors.volunteersNeeded ? "1px solid #ef4444" : "1px solid #e5e5e5",
                  backgroundColor: "#f9fafb"
                }}
                value={formData.volunteersNeeded}
                onChange={(e) => {
                  setFormData({ ...formData, volunteersNeeded: e.target.value })
                  if (validationErrors.volunteersNeeded) {
                    const { volunteersNeeded, ...rest } = validationErrors
                    setValidationErrors(rest)
                  }
                }}
              />
              {validationErrors.volunteersNeeded && (
                <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }}>{validationErrors.volunteersNeeded}</p>
              )}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.5rem", display: "block" }}>
              Location
            </label>
            <input
              type="text"
              placeholder="e.g., Santa Monica Beach"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "6px",
                border: validationErrors.location ? "1px solid #ef4444" : "1px solid #e5e5e5",
                backgroundColor: "#f9fafb"
              }}
              value={formData.location}
              onChange={(e) => {
                setFormData({ ...formData, location: e.target.value })
                if (validationErrors.location) {
                  const { location, ...rest } = validationErrors
                  setValidationErrors(rest)
                }
              }}
            />
            {validationErrors.location && (
              <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }}>{validationErrors.location}</p>
            )}
          </div>

          {/* Competencies Required */}
          <div style={{ position: "relative" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.5rem", display: "block" }}>
              Required Competencies
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
              {formData.competencies.map((comp) => (
                <div
                  key={comp}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.375rem 0.75rem",
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #34B26A",
                    borderRadius: "20px",
                    fontSize: "0.875rem",
                    color: "#0F393B"
                  }}
                >
                  <span>{comp}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        competencies: formData.competencies.filter((c) => c !== comp)
                      })
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#34B26A",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      fontSize: "1rem",
                      fontWeight: "bold"
                    }}
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setAddCompDropdown(!addCompDropdown)}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#34B26A",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: 600
                }}
              >
                + Add Competency
              </button>
              {addCompDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    marginTop: "0.5rem",
                    backgroundColor: "white",
                    border: "1px solid #e5e5e5",
                    borderRadius: "8px",
                    padding: "0.5rem 0",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.13)",
                    maxWidth: "330px",
                    minWidth: "220px",
                    zIndex: 16
                  }}
                >
                  <div style={{ maxHeight: "210px", overflowY: "auto", padding: "0.4rem 0" }}>
                    {ALL_COMPETENCIES.filter((c) => !formData.competencies.includes(c)).length ? (
                      ALL_COMPETENCIES.filter((c) => !formData.competencies.includes(c)).map((comp) => (
                        <button
                          key={comp}
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              competencies: [...formData.competencies, comp]
                            })
                            setAddCompDropdown(false)
                          }}
                          style={{
                            width: "100%",
                            padding: "0.6rem 1rem",
                            textAlign: "left",
                            border: "none",
                            background: "none",
                            color: "#0F393B",
                            fontSize: "0.97em",
                            cursor: "pointer",
                            fontWeight: 500,
                            transition: "background 0.1s, color 0.1s"
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = "#f1fdfb"
                            e.currentTarget.style.color = "#347362"
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = "none"
                            e.currentTarget.style.color = "#0F393B"
                          }}
                        >
                          {comp}
                        </button>
                      ))
                    ) : (
                      <div style={{ padding: "1rem", color: "#b9bacb" }}>No more competencies to add</div>
                    )}
                  </div>
                  <form
                    style={{
                      borderTop: "1px solid #eee",
                      padding: "0.5rem 1rem 0.7rem 1rem",
                      margin: 0,
                      background: "#fff",
                      display: "flex",
                      flexDirection: "row",
                      gap: 8
                    }}
                    onSubmit={(e) => {
                      e.preventDefault()
                      let v = newCompetencyInput.trim()
                      if (v && !formData.competencies.includes(v)) {
                        setFormData({
                          ...formData,
                          competencies: [...formData.competencies, v]
                        })
                        setNewCompetencyInput("")
                        setAddCompDropdown(false)
                      }
                    }}
                  >
                    <input
                      type="text"
                      value={newCompetencyInput}
                      onChange={(e) => setNewCompetencyInput(e.target.value)}
                      placeholder="Add new competency…"
                      style={{
                        flex: 1,
                        padding: "0.4rem 0.6rem",
                        borderRadius: 6,
                        border: "1px solid #e5e5e5",
                        outline: "none",
                        fontSize: "0.97em"
                      }}
                      maxLength={36}
                    />
                    <button
                      type="submit"
                      style={{
                        background: "#34B26A",
                        color: "#fff",
                        padding: "0.4rem 1rem",
                        border: 0,
                        borderRadius: 6,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontSize: "0.97em"
                      }}
                    >
                      Add
                    </button>
                  </form>
                  <button
                    type="button"
                    onClick={() => setAddCompDropdown(false)}
                    style={{
                      width: "100%",
                      background: "none",
                      border: 0,
                      padding: "0.8rem 1rem",
                      color: "#ef4444",
                      fontWeight: 500,
                      borderTop: "1px solid #f3f4f6",
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          position: "sticky",
          bottom: 0,
          display: "flex",
          gap: "1rem",
          padding: "1.5rem",
          borderTop: "1px solid #e5e5e5",
          backgroundColor: "white"
        }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "6px",
              border: "1px solid #e5e5e5",
              backgroundColor: "transparent",
              cursor: "pointer",
              fontWeight: 500
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "6px",
              border: "none",
              backgroundColor: isSubmitting ? "#9ca3af" : "#34B26A",
              color: "white",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              fontWeight: 600,
              opacity: isSubmitting ? 0.7 : 1,
              transition: "all 0.2s"
            }}
          >
            {isSubmitting ? "Creating..." : "Create Mission"}
          </button>
        </div>
      </div>
    </div>
  )
}
