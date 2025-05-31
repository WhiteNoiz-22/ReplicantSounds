import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import '../styles/Navbar.css'

function Navbar({searchGame, setSearchGame}) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav mr-auto">
          <li>
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>{" "}
          <li>
            <Link to="/library" className="nav-link">
              Library
            </Link>
          </li>{" "}
          <li>
            <Link to="/soundtracks" className="nav-link">
              Soundtracks
            </Link>
          </li>
        </ul>
        <SearchBar searchGame={searchGame} setSearchGame={setSearchGame} />
      </nav>
    </>
  );
}

export default Navbar;
