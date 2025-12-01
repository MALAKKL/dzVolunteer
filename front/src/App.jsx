import { Routes, Route, Link} from "react-router-dom";
import LoginPage from "./pages/logIn";
import SignUp from "./pages/signUp";
import Home from "./pages/HomePage";

function App() {
  return (
    <>

     {/* <nav> */}
        {/* <Link to="/">Home</Link> */}
        {/* <Link to="/login">Login</Link> */}
        {/* <Link to="/signup">SignUp</Link> */}
      {/* </nav>   */}

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
       
      </Routes>
    </>
  );
}

export default App;
