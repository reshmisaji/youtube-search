import { useEffect, useState } from "react";
import { APP_NAME } from "../constants";
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import { search } from "../clients/YouTube";
import "../App.css"
import { Link } from "react-router-dom";

export const Search = () => {
    const [searchText, setSearchText] = useState("")
    const [searchResult, setSearchResult] = useState({ items: [], nextPageToken: '' })
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const fetchResults = async (newSearch = false) => {
        setIsLoading(true)

        search(searchText, (!newSearch && searchResult?.nextPageToken))
            .then(({ data = {} }) => {
                const { items, nextPageToken } = data;
                setSearchResult({ items: [...(newSearch ? [] : searchResult.items), ...items], nextPageToken })
            }).catch(error => {
                setError(error.message)
            }).finally(() => {
                setIsLoading(false)
            });
    }

    useEffect(() => {
        if (searchText)
            fetchResults(true)
        // eslint-disable-next-line 
    }, [searchText])

    return (
        <div className="app">
            <header data-testid="app-header" className="app-header">
                <div className='heading-text'>{APP_NAME}</div>
                <SearchBar handleOnSearch={setSearchText} />
            <Link to="/"> Go back </Link>
            </header>
            {searchResult?.items?.length ? <SearchResults results={searchResult?.items} fetchData={fetchResults} hasMore={Boolean(searchResult?.nextPageToken)} /> : null}
            {error ? <div>{error}</div> : null}
            {!searchResult?.items?.length && isLoading ? <div className='loading-container'>
                <div data-testid="loading" className="loading"></div>
            </div> : null}
        </div>
    );
}