import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faXmark, } from '@fortawesome/free-solid-svg-icons'
import '../styles/SearchBar.css';
import { useState } from 'react';

const SearchBar = ({ handleOnSearch }) => {
    const [searchQuery, setSearchQuery] = useState("")

    const clearSearch = () => {
        setSearchQuery("")
    }
    const submit = (event) => {
        event.preventDefault()
        if (searchQuery.length)
            handleOnSearch(searchQuery)
    }

    return (
        <form onSubmit={submit} className="search-form" data-testid="search-form">
            <input data-testid="search-bar" className='search-input' placeholder="Search" onChange={(event)=>setSearchQuery(event?.target?.value)} value={searchQuery}/>
            {searchQuery.length ? <button type='submit' className='close-button'>
                <FontAwesomeIcon data-testid="close-icon" icon={faXmark} className='close-icon' onClick={clearSearch} />
            </button> : null}
            <button type='submit' className='search-icon'>
                <FontAwesomeIcon data-testid="search-icon" icon={faSearch} className="magnifying-glass" />
            </button>
        </form>
    );
}

export default SearchBar;