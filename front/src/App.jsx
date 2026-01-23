import { Routes, Route} from "react-router-dom";
import LoginPage from "./pages/logIn";
import SignUp from "./pages/signUp";
import Home from "./pages/HomePage";
import OrgDashboard from "./pages/dashOrgan";
import OrganizationsPage from "./pages/OrganizationsPage";



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
       
      </Routes>


{/* </BrowserRouter>  */}
    </>
  );
}

export default App;
