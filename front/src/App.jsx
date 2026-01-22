import { Routes, Route} from "react-router-dom";
import LoginPage from "./pages/logIn";
import SignUp from "./pages/signUp";
import Home from "./pages/HomePage";
import OrgDashboard from "./pages/dashOrgan";

function App() {
  return (
    <>

   
{/* <BrowserRouter>   */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
         <Route path="/orgdashboard" element={<OrgDashboard />} />
       
      </Routes>


{/* </BrowserRouter>  */}
    </>
  );
}

export default App;
