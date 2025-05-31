import "../styles/Home.css";
import SearchOnMusicAppsButton from "../components/SearchOnMusicApps";
import useDebounce from "../hooks/Debounce";
import useFetchGames from "../hooks/useFetchGames";
import { useNavigate } from "react-router";


function Home({searchGame}) {

  // Our navigate hook
  const navigate = useNavigate();

  // Handles logging out and redirects user to the login page
  const handleLogout = () => {
    navigate('/login');
  }


  // Stores our search query, and debounces it by 1 second to reduce unnecessary API calls
  const debouncedSearch = useDebounce(searchGame, 1000);

  // Our parameters from out default page for useFetchGames, this is the default if we dont have a search query
  const {
    data: data
  } = useFetchGames();


  // Our parameters from our useFetchGames query hook, for getting our search results
  const {
    data: searchData,
    isPending: isSearchLoading,
    error: searchError,
  } = useFetchGames(debouncedSearch);

  // Checks for errors and loading
  if (isSearchLoading) return <h1>Loading... Please Wait!</h1>;
  if (searchError) return <h1>An error has occured: {error.message}</h1>;

  // If we have a search query, we return 10 results if available
  if (debouncedSearch) {
    if (isSearchLoading) return <h1>Loading... Please Wait</h1>;
    if (searchError) return <h1>An error has occured: {searchError.message}</h1>;

    return (
      <>
        <button onClick={handleLogout} type="button" class="btn btn-primary">Logout?</button>
        <h1>Results:</h1>
        <div className="containers">
          {searchData && searchData.results && searchData.results.length > 0 ? (
            searchData.results.map((game) => (
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
    <DisplayHome data={data} handleLogout={handleLogout}/>
    </>
  )
}

function DisplayHome({ data, handleLogout }) {

  if(!data || !data.results){
    return <h1>Loading games... please wait!</h1>
  }


  return (
    <> 
      <button onClick={handleLogout} type="button" class="btn btn-primary">Logout?</button>
      <h1>Welcome!</h1>
      <h2>Most Popular Video Games</h2>
      <div className="containers">
        {data.results.slice(0, 21).map((game) => (
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
