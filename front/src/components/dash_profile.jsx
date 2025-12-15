"use client"
import { useState, useRef } from "react"
import { 
  FiUpload, FiUser, FiMapPin, FiBriefcase, FiCalendar, FiFileText, FiCheckSquare, FiSave 
} from "react-icons/fi"
import styles from "../styles/dashOrg.module.css"

export default function Profile() {
  const [formData, setFormData] = useState({
    organizationName: "",
    location: "",
    fieldOfActivity: "Nature",
    dateOfCreation: "2020-01-10",
    competencies: ["Environmental Science", "Project Management"],
    description: "",
    image: null,
  })

  const [selectedCompetencies, setSelectedCompetencies] = useState(formData.competencies)
  const fileInputRef = useRef(null)

  const fieldOptions = [
    "Nature","Education","Healthcare","Community Development","Arts & Culture",
    "Sports & Recreation","Animal Welfare","Human Rights","Technology","Other",
  ]

  const competencyOptions = [
    "Environmental Science","Project Management","Teaching","Medical Skills",
    "Communication","Marketing","Fundraising","Event Planning","Leadership",
    "Technical Skills","Social Work","Research","Design","Photography",
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageClick = () => fileInputRef.current.click()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) setFormData(prev => ({ ...prev, image: URL.createObjectURL(file) }))
  }

  const toggleCompetency = (c) => {
    setSelectedCompetencies(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    )
  }

  const handleSave = () => {
    const dataToSave = { ...formData, competencies: selectedCompetencies }
    console.log("[v1] Saving data:", dataToSave)
    alert("Profile saved successfully!")
  }

  return (
    <div className={styles["profile-page"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <h1 className={styles["page-title"]}>Organization Profile</h1>
        <p className={styles["page-subtitle"]}>
          Manage your organization's information and settings
        </p>
      </div>

      <div className={styles["profile-content"]}>
{/* Organization Image */}
<section className={styles["profile-card"]}>
  <h2 className={styles["section-title"]}>Organization Image</h2>
  <p className={styles["section-subtitle"]}>
    Upload a profile image for your organization
  </p>
  <div className={styles["image-upload-section"]} style={{ flexDirection: "column", alignItems: "center" }}>
    <div
      className={styles["image-placeholder-creative"]}
      onClick={handleImageClick}
      style={{ cursor: "pointer" }}
    >
      <div className={styles["image-inner-circle"]}>
        {formData.image ? (
          <img
            src={formData.image}
            alt="Organization"
            className={styles["profile-img"]}
            style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <FiUpload size={20} />
        )}
      </div>
      {!formData.image && (
        <span
          className={styles["no-image-text"]}
          style={{ top: "20px", position: "relative", color: "#347362" }}
        >
          No image
        </span>
      )}
    </div>

    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      style={{ display: "none" }}
      onChange={handleImageChange}
    />

    <button className={styles["upload-btn"]} onClick={handleImageClick}>
      <FiUpload size={20} /> Upload Image
    </button>
  </div>
</section>


        {/* Details Grid */}
        <div className={styles["details-grid"]}>
          {/* Organization Name */}
          <section className={styles["profile-card"]}>
            <label className={styles["field-label"]}>
              <FiUser className={styles["label-icon"]} /> Organization Name
            </label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleInputChange}
              className={styles["form-input"]}
            />
          </section>

          {/* Location */}
          <section className={styles["profile-card"]}>
            <label className={styles["field-label"]}>
              <FiMapPin className={styles["label-icon"]} /> Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={styles["form-input"]}
            />
          </section>

          {/* Field of Activity */}
          <section className={styles["profile-card"]}>
            <label className={styles["field-label"]}>
              <FiBriefcase className={styles["label-icon"]} /> Field of Activity
            </label>
            <select
              name="fieldOfActivity"
              value={formData.fieldOfActivity}
              onChange={handleInputChange}
              className={styles["form-input"]}
            >
              {fieldOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </section>

          {/* Date of Creation */}
          <section className={styles["profile-card"]}>
            <label className={styles["field-label"]}>
              <FiCalendar className={styles["label-icon"]} /> Date of Creation
            </label>
            <input
              type="date"
              name="dateOfCreation"
              value={formData.dateOfCreation}
              onChange={handleInputChange}
              className={styles["form-input"]}
            />
          </section>
        </div>

        {/* Description */}
        <section className={styles["profile-card"]}>
          <h2 className={styles["section-title"]}>
            <FiFileText style={{ marginRight: 8 }} /> Description
          </h2>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={styles["form-textarea"]}
            rows={4}
          />
        </section>

        {/* Competencies */}
        <section className={styles["profile-card"]}>
          <h2 className={styles["section-title"]}>
            <FiCheckSquare style={{ marginRight: 8 }} /> Competencies Required
          </h2>

          <div className={styles["competencies-grid"]}>
            {competencyOptions.map(c => (
              <label
                key={c}
                className={`${styles["competency-checkbox"]} ${
                  selectedCompetencies.includes(c) ? styles.selected : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedCompetencies.includes(c)}
                  onChange={() => toggleCompetency(c)}
                />
                <span className={styles["checkbox-label"]}>{c}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Save Button */}
        <div className={styles["save-button-container"]}>
          <button className={styles["save-btn"]} onClick={handleSave}>
            <FiSave size={18} /> Save Profile
          </button>
        </div>
      </div>
    </div>
  )
}
