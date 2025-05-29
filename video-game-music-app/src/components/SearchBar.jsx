import {useState} from 'react';

function SearchBar(){

    // Will handle and store our users search
    const [searchGame, setSearchGame] = useState("");

    // Handles our search and sets it to the input
    const handleSearchInput = (e) =>{
        const searchGame = e.target.value;
        setSearchGame(searchGame);
    }


    return(
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
    )
}

export default SearchBar;