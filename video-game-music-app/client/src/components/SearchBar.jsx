
import useDebounce from '../hooks/Debounce';
import useFetchGames from '../hooks/useFetchGames'

function SearchBar({searchGame, setSearchGame}){

    // Handles our debounced search, 1000ms delay or 1 second
    const debouncedSearch = useDebounce(searchGame, 1000);

    // debounced search for getting our values
    const {data, isLoading, error} = useFetchGames(debouncedSearch);

    // Handles our search and sets it to the input
    const handleSearchInput = (e) =>{
        setSearchGame(e.target.value);
    }


    return(
        <>
        <div className='ms-auto'>
            <form className="form-inline my-2 my-lg-0">
            <input
            className="form-control mr-sm-2"
            type='text'
            value={searchGame}
            onChange={handleSearchInput}
            placeholder='Search for a game...'
            />
            </form>
            </div>
        </>
    );
}

export default SearchBar;