import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import { search } from './clients/YouTube';
import SearchResults from './components/SearchResults';
import { APP_NAME } from './constants';

function App() {
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
      </header>
      {searchResult?.items?.length ? <SearchResults results={searchResult?.items} fetchData={fetchResults} hasMore={Boolean(searchResult?.nextPageToken)} /> : null}
      {error ? <div>{error}</div> : null}
      {!searchResult?.items?.length && isLoading ? <div className='loading-container'>
        <div data-testid="loading" className="loading"></div>
      </div> : null}
    </div>
  );
}

export default App;
