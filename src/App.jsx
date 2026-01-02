import { Routes, Route } from "react-router-dom";
import MissionPage from "./pages/MissionPage";
import MissionsPage from "./pages/MissionsPage";
import MissionCardPage from "./pages/MissionCardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MissionPage />} />
      <Route path="/missions" element={<MissionsPage />} />
      <Route path="/missioncard/:id" element={<MissionCardPage />} />

    </Routes>
  );
}

export default App;
