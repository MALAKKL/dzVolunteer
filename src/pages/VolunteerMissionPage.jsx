import { useParams } from "react-router-dom";
import MissionCard from "../components/MissionCard";

const missions = [
  {
    id: 1,
    title: "Planting 1 Million Trees",
    organization: "Aldjazayer khedra",
    date: "05/12/2025 - 15/12/2025",
    description: "An environmental mission focused on planting trees.",
    number: "15",
    location: "Tala Athmane, Tizi Ouzou",
    image: "/mp2.png",
    competencies: ["Physical Fitness", "Environmental Awareness"],
  },
];

export default function VolunteerMissionPage() {
  const { id } = useParams();
  const mission = missions.find((m) => m.id === parseInt(id));

  const handleApply = () => {
    alert("Application submitted!");
    // later → API call
  };

  if (!mission) return <p>Mission not found</p>;

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
      <MissionCard mission={mission} showApplyButton={true} onApply={handleApply} />

    </div>
  );
}
