// src/pages/MissionCardPage.jsx
import { useParams } from "react-router-dom";
import MissionCard from "../components/MissionCard";

// Temporary static missions array (can move to a context/api later)
const missions = [
  {
    id: 1,
    title: "Planting 1 Million Trees",
    organization: "Aldjazayer khedra",
    date: "05/12/2025 - 15/12/2025",
    description: "An environmental mission focused on planting trees to restore green spaces, protect nature, and raise environmental awareness through community action.",
    number: "15",
    location: "Tala Athmane, Tizi Ouzou",
    image: "/mp2.png",
    competencies: ["Physical Fitness", "Environmental Awareness"],
  },
  // add more missions here...
];

export default function MissionCardPage() {
  const { id } = useParams();
  const mission = missions.find((m) => m.id === parseInt(id));

  if (!mission) return <p>Mission not found</p>;

  return (
     <div
    style={{
      minHeight: "100vh",       // full viewport height
      display: "flex",
      justifyContent: "center", // horizontal center
      alignItems: "center",     // vertical center
      padding: "20px",
    }}
  >
      <MissionCard mission={mission} />
    </div>
  );
}

