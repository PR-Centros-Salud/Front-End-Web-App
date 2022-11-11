import jwtDecode from 'jwt-decode'
// In this file, we are make all functions that we need to use in the app to get, remove, set the token and check if the token is expired

// Function that will be used to get the token from the local storage
export const getToken = () => {
    return localStorage.getItem('token')
}

export const setToken = (token) => {
    localStorage.setItem('token', token)
}

export const removeToken = () => {
    localStorage.removeItem('token')
}

export const isTokenExpired = (token) => {
    const decoded = jwtDecode(token)
    const expireDate = decoded.exp * process.env.EXPIRATION_TIME
    const currentDate = new Date().getTime()
    return currentDate > expireDate
}

