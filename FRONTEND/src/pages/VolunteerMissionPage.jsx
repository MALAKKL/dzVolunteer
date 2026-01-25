"use client"
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MissionCard from "../components/MissionCard";
import { missionsAPI } from "../utils/api";
import { getImageUrl } from "../utils/imageUtils";

export default function VolunteerMissionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMission = async () => {
      try {
        setLoading(true);
        const data = await missionsAPI.getMissionById(id);

        // Transform API data to match MissionCard expectations
        // MissionCard expects: { title, organization, date, description, number, location, image, competencies }
        const transformedMission = {
          id: data.id,
          title: data.title,
          organization: data.organization ? data.organization.name : "Unknown",
          date: `${new Date(data.startDate).toLocaleDateString()} - ${new Date(data.endDate).toLocaleDateString()}`,
          description: data.description,
          number: data.volunteersNeeded.toString(),
          location: data.location,
          image: getImageUrl(data.image, "/mp2.png"),
          competencies: data.skills && data.skills.length > 0 ? data.skills.map(s => s.skill.name) : ["General"],
        };

        setMission(transformedMission);
      } catch (err) {
        console.error("Failed to load mission", err);
        setError("Mission not found or failed to load");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMission();
  }, [id]);

  const handleApply = async () => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication required. Please login to apply.");
      navigate("/login");
      return;
    }

    try {
      await missionsAPI.applyToMission(id, "I am interested in this mission.");
      alert("ur demmand will be treated");
      // Optionally redirect to dashboard
      navigate("/voldashboard");
    } catch (error) {
      console.error("Apply failed", error);
      alert("Failed to apply. You might have already applied.");
    }
  };

  if (loading) return <div style={{ padding: "50px", textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ padding: "50px", textAlign: "center" }}>{error}</div>;
  if (!mission) return <div style={{ padding: "50px", textAlign: "center" }}>Mission not found</div>;

  const role = localStorage.getItem("role");
  const isVolunteer = role === "VOLUNTEER";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <MissionCard mission={mission} showApplyButton={isVolunteer} onApply={handleApply} />
    </div>
  );
}
