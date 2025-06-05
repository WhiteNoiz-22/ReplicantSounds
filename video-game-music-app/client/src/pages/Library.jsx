import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useFetchGamesByIds from "../hooks/useFetchGamesByIds";
import SearchOnMusicAppsButton from "../components/SearchOnMusicApps";
import { useQueryClient } from "@tanstack/react-query";

function Library() {
  const [gameIds, setGameIds] = useState([]);
  const token = localStorage.getItem("loginToken");
  let user_id = "";
  const queryClient = useQueryClient();

  // Decodes our login token to get user id
  if (token) {
    const decoded = jwtDecode(token);
    user_id = decoded.user_id;
  }

  useEffect(() => {
    if (!user_id) return;
    axios.get(`http://localhost:3000/api/library/${user_id}`).then((res) => {
          // Filter out any empty/invalid IDs
    setGameIds(res.data.map((game) => game.game_id).filter(Boolean));
    });
  }, [user_id]);

const { data: rawgGames = [], isLoading } = useFetchGamesByIds(gameIds);

const handleRemoveGame = async (game_id) => {
  try {
    // Optimistically update UI
    setGameIds((prev) => prev.filter((id) => id !== game_id));

    await axios.delete("http://localhost:3000/api/soundtracks", {
      data: { user_id, game_id },
    });
    // Invalidate the cache so useFetchGamesByIds refetches
    queryClient.invalidateQueries({ queryKey: ["libraryGames"] });
    // Optionally, refetch from backend to ensure sync
    const res = await axios.get(`http://localhost:3000/api/library/${user_id}`);
    setGameIds(res.data.map((game) => game.game_id).filter(Boolean));
  } catch (error) {
    alert("Could not remove game from library.");
  }
};


  if(isLoading) return <h2>Loading your library... Please wait</h2>
  if(rawgGames.length === 0) return <h2>It's empty here. Add some soundtracks!</h2>

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
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveGame(game.id)}
              >
                Remove From Library
              </button>
            </div>
          ))}
        </div>
      </>
    );
}

export default Library;
