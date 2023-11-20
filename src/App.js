import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Search } from "./components/Search";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { LoginContext } from "./context/LoginContext";
import { useContext } from "react";

function App() {
  const { isLoggedIn } = useContext(LoginContext)
  return (
    <div data-testid="app">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={isLoggedIn ? <Search />: <Navigate to="/login"/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
