import { createContext, useState } from "react"

export const LoginContext = createContext({ isLoggedIn: false, setIsLoggedIn: () => { } })

export const LoginContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
    </LoginContext.Provider>
}