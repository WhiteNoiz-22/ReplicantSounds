import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Library from "./pages/Library";
import Soundtracks from "./pages/Soundtracks";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";


function App() {
  // Stores our data variables here so that we can use them inside of other components
  const [searchGame, setSearchGame] = useState("");
  const [username, setUsername] = useState("");

  const location = useLocation();

  // Only show Navbar if not on /login
  const showNavbar = location.pathname !== "/login" && location.pathname !== "/signup";
  const showFooter = location.pathname !== "/login" && location.pathname !== "/signup";

  return (
    <>
      <div className="app-content">
        {showNavbar && (
          <Navbar searchGame={searchGame} setSearchGame={setSearchGame} />
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<Register />}/>
          <Route path="/login" element={<Login setUsername={setUsername} />}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/home" element={<Home searchGame={searchGame} username={username} />} />
            <Route path="/library" element={<Library />} />
            <Route path="/Soundtracks" element={<Soundtracks />} />
          </Route>
        </Routes>
      </div>
      {showFooter && <Footer />}
    </>
  );
}

export default App;
