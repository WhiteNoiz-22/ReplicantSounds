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

function App() {
  const [searchGame, setSearchGame] = useState("");

  const location = useLocation();

  // Only show Navbar if not on /login
  const showNavbar = location.pathname !== "/login" && "/signup";
  const showFooter = location.pathname !== "/login" && "/signup";

  return (
    <>
      <div className="app-content">
        {showNavbar && (
          <Navbar searchGame={searchGame} setSearchGame={setSearchGame} />
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<Register />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home searchGame={searchGame} />} />
          <Route path="/library" element={<Library />} />
          <Route path="/Soundtracks" element={<Soundtracks />} />
        </Routes>
      </div>
      {showFooter && <Footer />}
    </>
  );
}

export default App;
