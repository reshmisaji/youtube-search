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

  const handleOnSearch = async () => {
    if (!isLoading) {
      setIsLoading(true)
      search(searchText, nextPageToken).then(({ data }) => {
        if (data?.items && data?.nextPageToken) {
          const { items, nextPageToken } = data;
          setSearchResult([...searchResult, ...items])
          setNextPageToken(nextPageToken)
          setIsLoading(false)
        }
      }).catch(error => {
        setError(error.message)
        setIsLoading(false)
      });
    }
  }

  return (
    <div className="app">
      <header data-testid="app-header" className="app-header">
        Youtube Search
      </header>
      <SearchBar handleOnSearch={handleOnSearch} searchText={searchText} setSearchText={setSearchText} />
      {searchResult?.length ? <SearchResults results={searchResult} fetchData={handleOnSearch} hasMore={Boolean(nextPageToken)} /> : null}
      {error ?? <div>{error}</div>}
    </div>
  );
}

export default App;
