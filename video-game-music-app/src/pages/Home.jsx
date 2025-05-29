import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "../styles/Home.css";
import SearchOnMusicAppsButton from "../components/SearchOnMusicApps";
import useDebounce from "../hooks/Debounce";
import useFetchGames from "../hooks/useFetchGames";

function Home({searchGame}) {
  // Fetches API using axios
  const fetchGames = async () => {
    const url = `https://api.rawg.io/api/games?key=${
      import.meta.env.VITE_API_KEY
    }`;
    const response = await axios.get(url);
    return response.data;
  };

  // Handles our API calls
  const { data, error, isPending } = useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
    //Ensures that we don't do unnesscary API calls, our staletime is an hour
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    enabled: !searchGame,
  });

  // Stores our search query, and debounces it by 1 second to reduce unnecessary API calls
  const debouncedSearch = useDebounce(searchGame, 1000);

  // Our parameters form our useFetchGames query hook
  const {
    data: searchData,
    isPending: isSearchLoading,
    error: searchError,
  } = useFetchGames(debouncedSearch);

  // Checks for errors and loading
  if (isPending) return <h1>Loading... Please Wait!</h1>;
  if (error) return <h1>An error has occured: {error.message}</h1>;

  // If we have a search query, we return 10 results if available
  if (debouncedSearch) {
    if (isSearchLoading) return <h1>Loading... Please Wait</h1>;
    if (searchError) return <h1>An error has occured: {searchError.message}</h1>;

    return (
      <>
        <h1>Results:</h1>
        <div className="containers">
          {searchData && searchData.results && searchData.results.length > 0 ? (
            searchData.results.slice(0, 10).map((game) => (
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
                  {game.released ? game.released.slice(0, 4) : "N/A"}
                </h3>
                <h3>
                  <b>Rating: </b>
                  {game.rating ? Math.round(game.rating * 10) / 10 : "N/A"}/5
                </h3>
                <SearchOnMusicAppsButton name={game.name} />
              </div>
            ))
          ) : (
            <h2>No results found.</h2>
          )}
        </div>
      </>
    );
  }

  return(
    <>
    <DisplayHome data={data}/>
    </>
  )
}

function DisplayHome({ data }) {
  return (
    <>
      <h1>Welcome!</h1>
      <h2>Most Popular Video Games</h2>
      <div className="containers">
        {data.results.slice(0, 10).map((game) => (
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

export default Home;
