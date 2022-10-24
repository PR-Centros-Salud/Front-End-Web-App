import jwtDecode from 'jwt-decode'

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

