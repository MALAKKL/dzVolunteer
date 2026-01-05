import { Routes, Route} from "react-router-dom";
import LoginPage from "./pages/logIn";
import SignUp from "./pages/signUp";
import Home from "./pages/HomePage";
import Dashboard from "./pages/dashOrgan";
import MissionsPage from "./pages/missionspage";
import OrgDashPage from "./pages/orgdash/page";
import OrgPage from "./pages/orgpage";
import VolunteerDash from "./pages/volunteerdash";

function App() {
  return (
    <>
      <Routes>        
        <Route path="/" element={<VolunteerDash />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/missions" element={<MissionsPage />} />
        <Route path="/orgdash" element={<OrgDashPage />} />
        <Route path="/orgpage" element={<OrgPage />} />
        <Route path="/volunteerdash" element={<VolunteerDash />} />
      </Routes>
    </>
  );
}

export default App;
