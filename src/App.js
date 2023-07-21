import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import { search } from './clients/YouTube';
import SearchResults from './components/SearchResults';

function App() {
  const [searchText, setSearchText] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [error, setError] = useState()
  const [nextPageToken, setNextPageToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const fetchResults = async (searchQuery = '', newSearch = false) => {
    setIsLoading(true)

    search(searchQuery || searchText, nextPageToken).then(({ data }) => {
      if (data?.items && data?.nextPageToken) {
        const { items, nextPageToken } = data;
        setNextPageToken(nextPageToken)
        setIsLoading(false)
        if (newSearch) {
          setSearchResult(items)
          return;
        }
        setSearchResult([...searchResult, ...items])
      }
    }).catch(error => {
      setError(error.message)
      setIsLoading(false)
    });
  }

  const handleOnSearch = async (searchQuery) => {
    setSearchText(searchQuery)
    if (!isLoading && searchQuery.length) {
      const newSearch = true;
      fetchResults(searchQuery, newSearch)
    }
  }

  return (
    <div className="app">
      <header data-testid="app-header" className="app-header">
        <div className='heading-text'>Youtube Search</div>
        <SearchBar handleOnSearch={handleOnSearch} />
      </header>
      {searchResult?.length ? <SearchResults results={searchResult} fetchData={fetchResults} hasMore={Boolean(nextPageToken)} /> : null}
      {error ?? <div>{error}</div>}
    </div>
  );
}

export default App;
