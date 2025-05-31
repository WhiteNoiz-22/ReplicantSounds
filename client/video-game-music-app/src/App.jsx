import './App.css'
import {Route, Routes, Navigate, useLocation} from "react-router-dom";
import { useState } from 'react';
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import Library from './pages/Library';
import Soundtracks from './pages/Soundtracks';
import Footer from './components/Footer';
import Login from './pages/Login';

function App() {

  const [searchGame, setSearchGame] = useState("");

  const location = useLocation();

  // Only show Navbar if not on /login
  const showNavbar = location.pathname !== '/login';


  return (
    <>
    <div className='app-content'>
              {showNavbar && <Navbar searchGame={searchGame} setSearchGame={setSearchGame}/>}
    <Routes>
      <Route path='/' element={<Navigate to="/login" replace />}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/home" element={<Home searchGame={searchGame}/>}/>
      <Route path="/library" element={<Library/>}/>
      <Route path="/Soundtracks" element={<Soundtracks/>}/>
    </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App;
