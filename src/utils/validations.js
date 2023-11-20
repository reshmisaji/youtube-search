const USER_CREDS = {
    USER_NAME: "admin",
    PASSWORD: "password"
}

export const validateLogin = (credentials) => {
    return credentials?.userName === USER_CREDS.USER_NAME && credentials?.password === USER_CREDS.PASSWORD
}