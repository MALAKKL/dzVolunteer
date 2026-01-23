import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/logIn";
import SignUp from "./pages/signUp";
import Home from "./pages/HomePage";
import OrgDashboard from "./pages/dashOrgan";
import OrganizationsPage from "./pages/OrganizationsPage";
import DashboardHeader from "./pages/dashVol";
import MissionPage from "./pages/MissionPage";
import MissionsPage from "./pages/MissionsPage";
import MissionCardPage from "./pages/MissionCardPage";
import AdminDashboard from "./pages/dashAdmin";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/orgdashboard" element={user?.role === 'organization' ? <OrgDashboard /> : <Home />} />
        <Route path="/create_mission" element={user?.role === 'organization' ? <MissionPage /> : <Home />} />
        <Route path="/missions" element={<MissionsPage />} />
        <Route path="/missioncard/:id" element={<MissionCardPage />} />
        <Route path="/organizations" element={<OrganizationsPage />} />
        <Route path="/voldashboard" element={user?.role === 'volunteer' ? <DashboardHeader /> : <Home />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;