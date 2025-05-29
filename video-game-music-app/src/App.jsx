import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import Library from './pages/Library';
import Soundtracks from './pages/Soundtracks';
import Footer from './components/Footer';

function App() {

  return (
    <>
    <div className='app-content'>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/library" element={<Library/>}/>
      <Route path="/Soundtracks" element={<Soundtracks/>}/>
    </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App;
