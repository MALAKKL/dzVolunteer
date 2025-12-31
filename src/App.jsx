import { Routes, Route } from "react-router-dom";
import MissionPage from "./pages/MissionPage";
import MissionsPage from "./pages/MissionsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MissionPage />} />
      <Route path="/missions" element={<MissionsPage />} />
    </Routes>
  );
}

export default App;
