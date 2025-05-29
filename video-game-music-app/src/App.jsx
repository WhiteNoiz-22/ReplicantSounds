import './App.css'
import {Route, Routes} from "react-router-dom";
import { useState } from 'react';
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import Library from './pages/Library';
import Soundtracks from './pages/Soundtracks';
import Footer from './components/Footer';

function App() {

  const [searchGame, setSearchGame] = useState("");

  return (
    <>
    <div className='app-content'>
    <Navbar searchGame={searchGame} setSearchGame={setSearchGame}/>
    <Routes>
      <Route path="/" element={<Home searchGame={searchGame}/>}/>
      <Route path="/library" element={<Library/>}/>
      <Route path="/Soundtracks" element={<Soundtracks/>}/>
    </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App;
