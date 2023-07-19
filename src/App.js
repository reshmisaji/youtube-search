import './App.css';
import { SearchBar } from './components/SearchBar';

function App() {

  return (
    <div className="app">
      <header data-testid="app-header" className="app-header">
        Youtube Search
      </header>
      <SearchBar />
    </div>
  );
}

export default App;
