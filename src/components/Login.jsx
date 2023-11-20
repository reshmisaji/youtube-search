import { useContext, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { validateLogin } from "../utils/validations";
import { LoginContext } from "../context/LoginContext";

export const Login = () => {
    const userNameReference = useRef();
    const passwordReference = useRef()
    const navigate = useNavigate()
    const { setIsLoggedIn } = useContext(LoginContext)

    const handleLogin = () => {
        const credentials = {
            userName: userNameReference?.current?.value,
            password: passwordReference?.current?.value
        }

        if (validateLogin(credentials)) {
            setIsLoggedIn(true)
            navigate("/search")
            return;
        }
        setIsLoggedIn(false)
        navigate("/")
    }

    return (
        <div data-testid="login">
            <Link to="/" >Home</Link>
            <form data-testid="login-form" onSubmit={handleLogin} >
                <input data-testid="user-name" ref={userNameReference} />
                <input data-testid="password" type="password" ref={passwordReference} />
                <button type="submit" data-testid="submit-button">Login</button>
            </form>
        </div>
    )
}