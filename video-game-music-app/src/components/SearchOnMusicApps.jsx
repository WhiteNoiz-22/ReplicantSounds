import '../styles/MusicApps.css';

// This button will redirect the user to their music platform of choice so they can search music
function SearchOnMusicApps({name}){

    return(
        <>
        <a
          href={`https://open.spotify.com/search/${encodeURIComponent(name + " soundtrack")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success"
        >
          Search on Spotify
        </a>
        {" "}
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(name + " soundtrack")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-danger"
        >
          Search on YouTube
        </a>
        </>
    )
}

export default SearchOnMusicApps;