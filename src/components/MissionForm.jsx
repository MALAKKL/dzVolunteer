"use client"

import { useState } from "react"
import "./MissionForm.css"

export default function MissionForm() {
  const [formData, setFormData] = useState({
    missionName: "",
    description: "",
    startDate: "2020-01-15",
    endDate: "2020-01-15",
    location: "",
    volunteersNeeded: "",
    competencies: "",
    image: null,
  })

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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleCancel = () => {
    console.log("Form cancelled")
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Create New Mission</h2>
        <p className="subtitle">Fill in the details for you new volunteer mission</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Mission Image Upload */}
        <div className="form-group">
          <label>Mission Image</label>
          <div className="upload-area">
            <input type="file" id="image-upload" className="file-input" accept="image/*" onChange={handleImageUpload} />
            <label htmlFor="image-upload" className="upload-label">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>Click to upload image</span>
            </label>
          </div>
        </div>

        {/* Mission Name */}
        <div className="form-group">
          <label>Mission Name</label>
          <input
            type="text"
            name="missionName"
            className="text-input"
            placeholder="Enter mission name"
            value={formData.missionName}
            onChange={handleInputChange}
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            className="textarea-input"
            placeholder="Enter mission description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
          />
        </div>

        {/* Start Date & End Date */}
        <div className="form-row">
          <div className="form-group half">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              className="date-input"
              value={formData.startDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group half">
            <label>END Date</label>
            <input
              type="date"
              name="endDate"
              className="date-input"
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Location */}
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            className="text-input"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>

        {/* Volunteers Needed */}
        <div className="form-group">
          <label>volunteers needed</label>
          <input
            type="text"
            name="volunteersNeeded"
            className="text-input"
            placeholder="Enter the number of the volunteers needed"
            value={formData.volunteersNeeded}
            onChange={handleInputChange}
          />
        </div>

        {/* Competencies Required */}
        <div className="form-group">
          <label>competencies Required</label>
          <textarea
            name="competencies"
            className="textarea-input"
            placeholder="Enter required competencies"
            value={formData.competencies}
            onChange={handleInputChange}
            rows="3"
          />
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button type="submit" className="btn-create">
            Create Mission
          </button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
