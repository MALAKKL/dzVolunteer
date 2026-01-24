"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../components/MissionForm.module.css";
import { missionsAPI } from "../utils/api";

export default function MissionForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    missionName: "",
    description: "",
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default 1 week span
    location: "",
    volunteersNeeded: "",
    competencies: "",
    image: null,
  })



  const competencyOptions = [
    "Environmental Science", "Project Management", "Teaching", "Medical Skills",
    "Communication", "Marketing", "Fundraising", "Event Planning", "Leadership",
    "Technical Skills", "Social Work", "Research", "Design", "Photography",
  ]

  const [selectedCompetencies, setSelectedCompetencies] = useState(formData.competencies)
  const toggleCompetency = (c) => {
    setSelectedCompetencies(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    )
  }





  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true);

      // Use FormData for file upload
      const payload = new FormData();
      payload.append("title", formData.missionName);
      payload.append("description", formData.description);
      payload.append("location", formData.location);
      payload.append("startDate", new Date(formData.startDate).toISOString());
      payload.append("endDate", new Date(formData.endDate).toISOString());
      payload.append("volunteersNeeded", formData.volunteersNeeded || "0");

      // Competencies/Skills: For now, we skip or send empty array logic
      // If we need to send skills, we should check how backend parses it from FormData.
      // Current controller expects keys. We can ignore skills for now as per previous complexity decision.
      // payload.append("skills", "[]"); 

      if (formData.image) {
        payload.append("image", formData.image);
      }

      await missionsAPI.createMission(payload);
      alert("Mission created successfully!");
      navigate("/orgdashboard");
    } catch (error) {
      console.error("Creation failed", error);
      alert("Failed to create mission: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  }

  const handleCancel = () => {
    console.log("Form cancelled")
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2>Create New Mission</h2>
        <p className={styles.subtitle}>
          Fill in the details for your new volunteer mission
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Mission Image Upload */}
        <div className={styles.formGroup}>
          <label>Mission Image</label>
          <div className={styles.uploadArea}>
            <input
              type="file"
              id="image-upload"
              className={styles.fileInput}
              accept="image/*"
              onChange={handleImageUpload}
            />
            <label htmlFor="image-upload" className={styles.uploadLabel}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>Click to upload image</span>
            </label>
          </div>
        </div>

        {/* Mission Name */}
        <div className={styles.formGroup}>
          <label>Mission Name</label>
          <input
            type="text"
            name="missionName"
            className={styles.textInput}
            placeholder="Enter mission name"
            value={formData.missionName}
            onChange={handleInputChange}
          />
        </div>

        {/* Description */}
        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            name="description"
            className={styles.textareaInput}
            placeholder="Enter mission description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
          />
        </div>

        {/* Start Date & End Date */}
        <div className={styles.formRow}>
          <div className={`${styles.formGroup} ${styles.half}`}>
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              className={styles.dateInput}
              value={formData.startDate}
              onChange={handleInputChange}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.half}`}>
            <label>END Date</label>
            <input
              type="date"
              name="endDate"
              className={styles.dateInput}
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Location */}
        <div className={styles.formGroup}>
          <label>Location</label>
          <input
            type="text"
            name="location"
            className={styles.textInput}
            placeholder="Enter location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>

        {/* Volunteers Needed */}
        <div className={styles.formGroup}>
          <label>Volunteers Needed</label>
          <input
            type="text"
            name="volunteersNeeded"
            className={styles.textInput}
            placeholder="Enter the number of volunteers needed"
            value={formData.volunteersNeeded}
            onChange={handleInputChange}
          />
        </div>

        {/* Competencies Required */}
        <div className={styles.formGroup}>



          <label>Competencies Required</label>
          <div className={styles["competencies-grid"]}>
            {competencyOptions.map(c => (
              <label
                key={c}
                className={`${styles["competency-checkbox"]} ${selectedCompetencies.includes(c) ? styles.selected : ""
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
          {/* <label>Competencies Required</label>
          <textarea
            name="competencies"
            className={styles.textareaInput}
            placeholder="Enter required competencies"
            value={formData.competencies}
            onChange={handleInputChange}
            rows="3"
          /> */}
        </div>

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.btnCreate} disabled={loading}>
            {loading ? "Creating..." : "Create Mission"}
          </button>
          <button
            type="button"
            className={styles.btnCancel}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
