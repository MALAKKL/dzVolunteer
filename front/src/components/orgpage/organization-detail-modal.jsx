import React from "react";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function OrganizationDetailModal({ organization, onClose }) {
  const navigate = useNavigate();

  if (!organization) return null;

  const handleSeeMissions = () => {
    // Navigate to missions page with organization filter
    navigate(`/missions?org=${organization.id}`);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "1rem"
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
          maxWidth: "800px",
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            borderRadius: "50%",
            padding: "0.5rem",
            border: "none",
            cursor: "pointer",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <FiX size={24} />
        </button>

        {/* Image Section */}
        <div style={{ width: "100%", height: "300px", overflow: "hidden", borderRadius: "12px 12px 0 0" }}>
          <img
            src={organization.image || "/placeholder.svg"}
            alt={organization.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Content Section */}
        <div style={{ padding: "2rem", flex: 1 }}>
          {/* Title */}
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1a1a1a", marginBottom: "0.5rem" }}>
            {organization.title}
          </h2>

          {/* Creator */}
          <p style={{ fontSize: "1rem", color: "#1a1a1a", marginBottom: "1.5rem" }}>
            {organization.subtitle}
          </p>

          {/* Description */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "0.875rem", fontWeight: "bold", color: "#2e7d32", marginBottom: "0.5rem", textTransform: "uppercase" }}>
              description
            </h3>
            <p style={{ fontSize: "0.875rem", color: "#1a1a1a", lineHeight: "1.6" }}>
              {organization.description}
            </p>
          </div>

          {/* Creation Date */}
          {organization.creationDate && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "0.875rem", fontWeight: "bold", color: "#2e7d32", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                creation date
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#1a1a1a" }}>
                {organization.creationDate}
              </p>
            </div>
          )}

          {/* Location */}
          {organization.location && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "0.875rem", fontWeight: "bold", color: "#2e7d32", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                Location
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#1a1a1a" }}>
                {organization.location}
              </p>
            </div>
          )}

          {/* Competence Needed */}
          {organization.competenceNeeded && (
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "0.875rem", fontWeight: "bold", color: "#2e7d32", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                competence needed
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#1a1a1a" }}>
                {organization.competenceNeeded}
              </p>
            </div>
          )}

          {/* See Missions Button */}
          <button
            onClick={handleSeeMissions}
            style={{
              width: "100%",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              background: "#34B26A",
              color: "#fff",
              fontSize: "1rem",
              transition: "background 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#2e9c5d";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#34B26A";
            }}
          >
            See Missions for this Organization
          </button>
        </div>
      </div>
    </div>
  );
}







