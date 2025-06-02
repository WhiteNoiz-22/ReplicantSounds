import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useFetchGamesByIds from "../hooks/useFetchGamesByIds";
import SearchOnMusicAppsButton from "../components/SearchOnMusicApps";

function Library() {
  const [gameIds, setGameIds] = useState([]);
  const token = localStorage.getItem("token");
  let user_id = "";

  if (token) {
    const decoded = jwtDecode(token);
    user_id = decoded.user_id;
  }

  useEffect(() => {
    if (!user_id) return;
    axios
      .get(`http://localhost:3000/api/library/${user_id}`)
      .then((res) => {
        setGameIds(res.data.map(game => game.game_id));
      });
  }, [user_id]);

  const { data: rawgGames = [], isLoading } = useFetchGamesByIds(gameIds);

  return (
    <>
      <h1>Your Library</h1>
      <div className="containers">
        {rawgGames.slice(0, 21).map((game) => (
          <div key={game.id} className="card">
            <img
              src={game.background_image}
              alt="image of game"
              loading="lazy"
              width={320}
              height={200}
            />
            <h3>{game.name}</h3>
            <h3>
              <b>Release Year: </b>
              {game.released.slice(0, 4)}
            </h3>
            <h3>
              <b>Rating: </b>
              {Math.round(game.rating * 10) / 10}/5
            </h3>
                            <SearchOnMusicAppsButton name={game.name} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Library;
