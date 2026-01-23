import { Routes, Route} from "react-router-dom";
import LoginPage from "./pages/logIn";
import SignUp from "./pages/signUp";
import Home from "./pages/HomePage";
import OrgDashboard from "./pages/dashOrgan";
import OrganizationsPage from "./pages/OrganizationsPage";
import AdminDashboard from "./pages/dashAdmin";
import Dashboard from "./pages/dashVol";
import EditMission from "./pages/edit_mission";
import VolunteerMissionPage from "./pages/VolunteerMissionPage";



import MissionPage from "./pages/MissionPage";
import MissionsPage from "./pages/MissionsPage";
import MissionCardPage from "./pages/MissionCardPage";

function App() {
  return (
    <>

   
{/* <BrowserRouter>   */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
         <Route path="/orgdashboard" element={<OrgDashboard />} />

       <Route path="/create_mission" element={<MissionPage />} />
      <Route path="/missions" element={<MissionsPage />} />
      <Route path="/missioncard/:id" element={<MissionCardPage />} />
      <Route path="/organizations" element={<OrganizationsPage />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/voldashboard" element={<Dashboard />} />
      <Route path="/edit_mission" element={<EditMission />} />
            <Route path="/volunteer/mission/:id" element={<VolunteerMissionPage />} />
       
      </Routes>


{/* </BrowserRouter>  */}
    </>
  );
}

export default App;
