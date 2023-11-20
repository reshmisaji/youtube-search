import { Link } from "react-router-dom"

export const Home = () => {

    return <div data-testid="home">
        <Link to='/login' data-testid="login-link" > Login</Link>
        <Link to="/search" data-testid="search-link" > Search</Link>
    </div>
}