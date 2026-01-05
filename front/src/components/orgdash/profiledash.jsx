"use client"

import { useState, useRef, useEffect } from "react"
import { FiUpload, FiMapPin, FiActivity, FiUsers, FiCalendar, FiFileText, FiX } from "react-icons/fi"

export default function ProfilePage() {
  // Stats counters - will be linked to API/data later
  const [stats, setStats] = useState({
    activeMissions: 12,
    totalVolunteers: 248,
    hoursVolunteered: 1240
  })

  const [selectedCompetencies, setSelectedCompetencies] = useState([
    "Leadership",
    "Communication"
  ])
  const [addCompDropdown, setAddCompDropdown] = useState(false)
  const [newCompetencyInput, setNewCompetencyInput] = useState("")
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

  const [imagePreview, setImagePreview] = useState(null)
  const [uploadError, setUploadError] = useState(null)
  const fileInputRef = useRef(null)
  const [selectedFields, setSelectedFields] = useState(["Nature Conservation"])
  const [addFieldDropdown, setAddFieldDropdown] = useState(false)

  const ALL_FIELDS = [
    "Nature Conservation",
    "Medical Support",
    "Sports Education",
    "Disaster Response",
    "Education Outreach",
    "Community Development",
    "Elderly Care",
    "Animal Welfare",
    "Arts & Culture"
  ];

  // Format number with commas
  const formatNumber = (num) => {
    return num.toLocaleString('en-US')
  }

  // TODO: Link to API/data source
  // useEffect(() => {
  //   // Example: Fetch stats from API
  //   // fetch('/api/organization/stats')
  //   //   .then(res => res.json())
  //   //   .then(data => setStats({
  //   //     activeMissions: data.activeMissions,
  //   //     totalVolunteers: data.totalVolunteers,
  //   //     hoursVolunteered: data.hoursVolunteered
  //   //   }))
  // }, [])

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
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const toggleField = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field]
    )
  }

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#F5F3EE" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#0F393B", marginBottom: "0.5rem" }}>
          Organization Profile
        </h1>
        <p style={{ color: "#6b7280" }}>Manage your organization's information</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {/* Image Upload */}
        <div style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{
            width: "100%",
            aspectRatio: "1",
            borderRadius: "12px",
            backgroundColor: "#f9fafb",
            marginBottom: "1.5rem",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}>
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Organization" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button
                  onClick={handleRemoveImage}
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                    backgroundColor: "rgba(239, 68, 68, 0.9)",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "background-color 0.2s, transform 0.1s",
                    outline: "none"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 1)"
                    e.currentTarget.style.transform = "scale(1.1)"
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.9)"
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                  title="Remove image"
                >
                  <FiX size={16} />
                </button>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <FiUsers size={64} style={{ color: "#6b7280", opacity: 0.5, marginBottom: "0.5rem", margin: "0 auto" }} />
                <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>No image uploaded</p>
              </div>
            )}
          </div>
          <div style={{ width: "100%" }}>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              style={{ display: "none" }} 
            />
            <button 
              onClick={handleButtonClick}
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "#34B26A",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                transition: "background-color 0.2s, transform 0.1s",
                outline: "none"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#2ea85a"
                e.currentTarget.style.transform = "scale(1.02)"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#34B26A"
                e.currentTarget.style.transform = "scale(1)"
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "scale(0.98)"
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "scale(1.02)"
              }}
            >
              <FiUpload size={16} />
              {imagePreview ? "Change Image" : "Upload Image"}
            </button>
            {uploadError && (
              <p style={{ 
                color: "#ef4444", 
                fontSize: "0.875rem", 
                marginTop: "0.5rem", 
                textAlign: "center" 
              }}>
                {uploadError}
              </p>
            )}
          </div>
        </div>

        {/* Organization Details */}
        <div style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          gridColumn: "span 2"
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0F393B", marginBottom: "1.5rem" }}>Organization Details</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Organization Name */}
            <div>
              <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.5rem", display: "block" }}>
                Organization Name
              </label>
              <input
                type="text"
                placeholder="e.g., Global Volunteers United"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid #e5e5e5",
                  backgroundColor: "#f9fafb"
                }}
                defaultValue="Global Volunteers United"
              />
            </div>

            {/* Location */}
            <div>
              <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FiMapPin size={16} style={{ color: "#34B26A" }} />
                Location
              </label>
              <input
                type="text"
                placeholder="e.g., San Francisco, CA"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid #e5e5e5",
                  backgroundColor: "#f9fafb"
                }}
                defaultValue="San Francisco, CA"
              />
            </div>

            {/* Field of Activity */}
            <div style={{position: 'relative'}}>
              <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FiActivity size={16} style={{ color: "#EF8451" }} />
                Field of Activity
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                {selectedFields.map((field) => (
                  <span
                    key={field}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0.375rem 0.75rem 0.375rem 0.75rem",
                      borderRadius: "6px",
                      border: "1px solid #34B26A",
                      backgroundColor: "#E6F7EF",
                      color: "#0F393B",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      boxShadow: "0 1px 4px rgba(52,178,106,0.18)",
                      marginRight: "0.3rem"
                    }}
                  >
                    {field}
                    <button
                      type="button"
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                        marginLeft: 6,
                        fontSize: "1em",
                        display: "flex",
                        alignItems: "center",
                        padding: 0
                      }}
                      title={`Remove ${field}`}
                      onClick={() => setSelectedFields((prev) => prev.filter((f) => f !== field))}
                    >
                      <FiX size={16} />
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  style={{
                    padding: "0.34rem 1rem",
                    borderRadius: "6px",
                    border: "1px dashed #EF8451",
                    background: "#FAF3EC",
                    color: "#EF8451",
                    fontSize: "0.89rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 600
                  }}
                  onClick={() => setAddFieldDropdown((v) => !v)}
                >
                  + Add Field of Activity
                </button>
              </div>
              {addFieldDropdown && (
                <div style={{
                  background: "white",
                  border: "1px solid #e5e5e5",
                  borderRadius: 8,
                  marginTop: 2,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.13)",
                  maxWidth: 330,
                  minWidth: 220,
                  zIndex: 15,
                  position: 'absolute'
                }}>
                  <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                    {ALL_FIELDS.filter(f => !selectedFields.includes(f)).length ? (
                      ALL_FIELDS.filter(f => !selectedFields.includes(f)).map((field) => (
                        <button key={field}
                          type="button"
                          onClick={() => {
                            setSelectedFields(prev => [...prev, field]);
                            setAddFieldDropdown(false);
                          }}
                          style={{
                            width: '100%',
                            padding: '0.6rem 1rem',
                            textAlign: 'left',
                            border: 'none',
                            background: 'none',
                            color: '#0F393B',
                            fontSize: '0.97em',
                            cursor: 'pointer',
                            fontWeight: 500,
                            transition: 'background 0.1s, color 0.1s',
                          }}
                          onMouseOver={e => {
                            e.currentTarget.style.background = '#ecfdf5';
                            e.currentTarget.style.color = '#34B26A';
                          }}
                          onMouseOut={e => {
                            e.currentTarget.style.background = 'none';
                            e.currentTarget.style.color = '#0F393B';
                          }}
                        >
                          {field}
                        </button>
                      ))
                    ) : (
                      <div style={{padding: '1rem', color: '#b9bacb'}}>No more fields to add</div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setAddFieldDropdown(false)}
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

            {/* Description */}
            <div>
              <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FiFileText size={16} style={{ color: "#347362" }} />
                Description
              </label>
              <textarea
                placeholder="Tell us about your organization..."
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid #e5e5e5",
                  backgroundColor: "#f9fafb",
                  minHeight: "96px",
                  resize: "none"
                }}
                defaultValue="We are a dedicated organization focused on environmental conservation and community development."
              />
            </div>

            {/* Required Competencies */}
            <div style={{position: 'relative'}}>
              <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "0F393B", marginBottom: "0.5rem", display: "block" }}>
                Required Competencies
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                {selectedCompetencies.map((comp) => (
                  <span
                    key={comp}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0.375rem 0.75rem",
                      borderRadius: "6px",
                      border: "1px solid #347362",
                      backgroundColor: "#e6f7f1",
                      color: "#0F393B",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      boxShadow: "0 1px 4px rgba(52,115,98,0.12)",
                      marginRight: "0.3rem"
                    }}
                  >
                    {comp}
                    <button
                      type="button"
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                        marginLeft: 6,
                        fontSize: "1em",
                        display: "flex",
                        alignItems: "center",
                        padding: 0
                      }}
                      title={`Remove ${comp}`}
                      onClick={() => setSelectedCompetencies((prev) => prev.filter((c) => c !== comp))}
                    >
                      <FiX size={16} />
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  style={{
                    padding: "0.34rem 1rem",
                    borderRadius: "6px",
                    border: "1px dashed #EF8451",
                    background: "#FAF3EC",
                    color: "#EF8451",
                    fontSize: "0.87rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 600
                  }}
                  onClick={() => setAddCompDropdown(v => !v)}
                >
                  + Add Competency
                </button>
              </div>
              {addCompDropdown && (
                <div style={{
                  background: "white",
                  border: "1px solid #e5e5e5",
                  borderRadius: 8,
                  marginTop: 2,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.13)",
                  maxWidth: 330,
                  minWidth: 220,
                  zIndex: 16,
                  position: 'absolute',
                }}>
                  <div style={{ maxHeight: 210, overflowY: 'auto', padding: '0.4rem 0' }}>
                    {ALL_COMPETENCIES.filter(c => !selectedCompetencies.includes(c)).length ? (
                      ALL_COMPETENCIES.filter(c => !selectedCompetencies.includes(c)).map((comp) => (
                        <button key={comp}
                          type="button"
                          onClick={() => {
                            setSelectedCompetencies(prev => [...prev, comp]);
                            setAddCompDropdown(false);
                          }}
                          style={{
                            width: '100%',
                            padding: '0.6rem 1rem',
                            textAlign: 'left',
                            border: 'none',
                            background: 'none',
                            color: '#0F393B',
                            fontSize: '0.97em',
                            cursor: 'pointer',
                            fontWeight: 500,
                            transition: 'background 0.1s, color 0.1s',
                          }}
                          onMouseOver={e => {
                            e.currentTarget.style.background = '#f1fdfb';
                            e.currentTarget.style.color = '#347362';
                          }}
                          onMouseOut={e => {
                            e.currentTarget.style.background = 'none';
                            e.currentTarget.style.color = '#0F393B';
                          }}
                        >
                          {comp}
                        </button>
                      ))
                    ) : (
                      <div style={{padding: '1rem', color: '#b9bacb'}}>No more competencies to add</div>
                    )}
                  </div>
                  <form style={{ borderTop: '1px solid #eee', padding: '0.5rem 1rem 0.7rem 1rem', margin: 0, background: '#fff', display: 'flex', flexDirection: 'row', gap: 8 }} onSubmit={e => {
                    e.preventDefault();
                    let v = newCompetencyInput.trim();
                    if (v && !selectedCompetencies.includes(v)) {
                      setSelectedCompetencies(prev => [...prev, v]); setNewCompetencyInput(''); setAddCompDropdown(false);
                    }
                  }}>
                    <input
                      type="text"
                      value={newCompetencyInput}
                      onChange={e => setNewCompetencyInput(e.target.value)}
                      placeholder="Add new competency…"
                      style={{ flex: 1, padding: '0.4rem 0.6rem', borderRadius: 6, border: '1px solid #e5e5e5', outline: 'none', fontSize: '0.97em' }}
                      maxLength={36}
                    />
                    <button type="submit" style={{ background: '#34B26A', color: '#fff', padding: '0.4rem 1rem', border: 0, borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontSize: '0.97em' }}>
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

            {/* Date of Creation */}
            <div>
              <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0F393B", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FiCalendar size={16} style={{ color: "#347362" }} />
                Date of Creation
              </label>
              <input
                type="date"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid #e5e5e5",
                  backgroundColor: "#f9fafb"
                }}
                defaultValue="2020-01-15"
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "1rem", paddingTop: "1rem" }}>
              <button
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  backgroundColor: "#34B26A",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 600
                }}
                onClick={() => {
                  alert('Changes saved! (Place API call or logic here)')
                }}
              >
                Save Changes
              </button>
              <button
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  backgroundColor: "transparent",
                  border: "1px solid #e5e5e5",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 500
                }}
                onClick={() => {
                  window.location.reload()
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginTop: "2rem" }}>
        <div style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          textAlign: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          transition: "transform 0.2s, box-shadow 0.2s"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)"
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"
        }}
        >
          <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Active Missions</p>
          <h3 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#34B26A" }}>{formatNumber(stats.activeMissions)}</h3>
        </div>
        <div style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          textAlign: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          transition: "transform 0.2s, box-shadow 0.2s"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)"
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"
        }}
        >
          <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Total Volunteers</p>
          <h3 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#EF8451" }}>{formatNumber(stats.totalVolunteers)}</h3>
        </div>
        <div style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          textAlign: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          transition: "transform 0.2s, box-shadow 0.2s"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)"
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"
        }}
        >
          <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Hours Volunteered</p>
          <h3 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#347362" }}>{formatNumber(stats.hoursVolunteered)}</h3>
        </div>
      </div>
    </div>
  )
}
