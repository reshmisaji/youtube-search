import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const SearchBar = () => {

    return (
        <>
            <input data-testid="search-bar" placeholder="Search" />
            <FontAwesomeIcon data-testid="search-icon" icon={faSearch} />
        </>
    );
}

