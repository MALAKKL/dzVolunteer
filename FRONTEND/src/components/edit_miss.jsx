"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import styles from "../components/MissionForm.module.css";
import { missionsAPI } from "../utils/api";

export default function EditMissionForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const missionId = searchParams.get('id');

  const [formData, setFormData] = useState({
    missionName: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    volunteersNeeded: "",
    competencies: "",
    image: null,
  })

  const [loading, setLoading] = useState(false);

  const competencyOptions = [
    "Environmental Science", "Project Management", "Teaching", "Medical Skills",
    "Communication", "Marketing", "Fundraising", "Event Planning", "Leadership",
    "Technical Skills", "Social Work", "Research", "Design", "Photography",
  ]

  const [selectedCompetencies, setSelectedCompetencies] = useState([])


  useEffect(() => {
    const fetchMission = async () => {
      try {
        setLoading(true);
        const data = await missionsAPI.getMissionById(missionId);
        setFormData({
          missionName: data.title,
          description: data.description,
          startDate: data.startDate.split('T')[0],
          endDate: data.endDate.split('T')[0],
          location: data.location,
          volunteersNeeded: data.volunteersNeeded.toString(),
          competencies: "", // Handled by selectedCompetencies
          image: null
        });
        if (data.skills) {
          setSelectedCompetencies(data.skills.map(skillWrapper => skillWrapper.skill.name));
        }
      } catch (error) {
        console.error("Failed to load mission", error);
        alert("Failed to load mission details");
      } finally {
        setLoading(false);
      }
    };

    if (missionId) {
      fetchMission();
    }
  }, [missionId]);


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!missionId) return;

    try {
      setLoading(true);
      const updateData = {
        title: formData.missionName,
        description: formData.description,
        location: formData.location, // Check if supported
        volunteersNeeded: parseInt(formData.volunteersNeeded),
        // startDate: new Date(formData.startDate).toISOString(), 
        // endDate: new Date(formData.endDate).toISOString(), 
        // isPublished: true
      };

      await missionsAPI.updateMission(missionId, updateData);
      alert("Mission updated successfully!");
      navigate("/orgdashboard"); // Navigate back
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update mission");
    } finally {
      setLoading(false);
    }
  }

  const handleCancel = () => {
    navigate("/orgdashboard");
  }

  if (loading && !formData.missionName) return <div>Loading mission detail...</div>;

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2>Edit Mission informations</h2>
        <p className={styles.subtitle}>
          Edit your volunteering mission details below.
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
              disabled
            />
            <label htmlFor="image-upload" className={styles.uploadLabel}>
              <span>(Image update not supported)</span>
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
              readOnly
              style={{ backgroundColor: "#f0f0f0" }}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.half}`}>
            <label>END Date</label>
            <input
              type="date"
              name="endDate"
              className={styles.dateInput}
              value={formData.endDate}
              readOnly
              style={{ backgroundColor: "#f0f0f0" }}
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
          <label>Competencies Required (View Only)</label>
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
                  readOnly
                />
                <span className={styles["checkbox-label"]}>{c}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.btnCreate} disabled={loading}>
            {loading ? "Saving..." : "Edit"}
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
