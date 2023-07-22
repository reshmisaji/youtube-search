import { useEffect, useState } from 'react';
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

  const fetchResults = async (newSearch = false) => {
    setIsLoading(true)

    search(searchText, (!newSearch ?? nextPageToken))
      .then(({ data = {} }) => {
        const { items, nextPageToken } = data;
        setNextPageToken(nextPageToken)
        setSearchResult([...(newSearch ? [] : searchResult), ...items])
      }).catch(error => {
        setError(error.message)
      }).finally(() => {
        setIsLoading(false)
      });
  }

  useEffect(() => {
    if (searchText)
      fetchResults(true)
  }, [searchText])

  return (
    <div className="app">
      <header data-testid="app-header" className="app-header">
        <div className='heading-text'>Youtube Search</div>
        <SearchBar handleOnSearch={setSearchText} />
      </header>
      {searchResult?.length? <SearchResults results={searchResult} fetchData={fetchResults} hasMore={Boolean(nextPageToken)} /> : null}
      {error ?? <div>{error}</div>}
      {isLoading ?? <div data-testid="loading">Loading...</div>}
    </div>
  );
}

export default App;
