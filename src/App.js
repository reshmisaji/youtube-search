import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import { search } from './apis/YouTube';

function App() {
  const [searchText, setSearchText] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [error, setError] = useState()

  const handleOnSearch = async () => {
    search(searchText)
  }

  return (
    <div className="app">
      <header data-testid="app-header" className="app-header">
        Youtube Search
      </header>
      <SearchBar handleOnSearch={handleOnSearch} searchText={searchText} setSearchText={setSearchText} />
    </div>
  );
}

export default App;
