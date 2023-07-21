import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({ searchText, setSearchText, handleOnSearch }) => {
    const onKeyDown = (event) => {
        if (event?.code === "Enter") handleOnSearch()
    }

    return (
        <>
            <input data-testid="search-bar" placeholder="Search" value={searchText} onChange={(event) => setSearchText(event?.target?.value)} onKeyDown={onKeyDown} />
            <FontAwesomeIcon data-testid="search-icon" icon={faSearch} onClick={handleOnSearch} />
        </>
    );
}

export default SearchBar;