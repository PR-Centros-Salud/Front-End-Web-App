import { BASE_PATH } from "../utils/constants"
import { getToken, isTokenExpired } from "./token"
import FormData from "form-data"
import axios from "axios"

// In this document we will see the CRUD request functions of the user. 

axios.defaults.headers["Access-Control-Allow-Origin"] = "*"

// Function that will be used to get the user data
export const loginApi = async (data) => {
    try {
        const url = `${BASE_PATH}/person/login`
        const formData = new FormData()
        formData.append("username", data.user)
        formData.append("password", data.password)
        const response = await axios.post(url, formData)
        return response
    } catch (e) {
        console.log(e)
        return null
    }
}

// Function that will be used to get the user data
export const getMeApi = async (logout) => { 
    try {
        const url = `${BASE_PATH}/person/me`
        const result = await authFetch(url, { method: "GET" }, logout)
        return result ? result : null 
    } catch (e) { 
        console.log(e)
        return null
    }
}

// Function that will be used to update the user password
export const changePasswordApi = async (logout, old_password, new_password) => {
    try {
        const url = `${BASE_PATH}/person/update-password`
        const formData = new FormData()
        formData.append("old_password", old_password.trim())
        formData.append("new_password", new_password.trim())
        
        const params = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                old_password,
                new_password,
            }
        }
        const result = await authFetch(url, params, logout)
        return result ? result : null
    } catch (e) {
        console.log(e)
        return null
    }

}

// Function that will control the token
export const authFetch = async (url, params, logout) => { 
    // Get the token from the local storage
    const token = getToken()

    // If the token is expired, we will remove it from the local storage
    if (!token) {
        logout()
    } else {
        // If the token is not expired, we will check if it is expired
        if (isTokenExpired(token)) {
            logout()
        } else {
            // If the token is not expired, we will add it to the headers
            const paramsTemp = {
                data: params.body,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`, 
                    "Access-Control-Allow-Origin" : "*"
                },
                method: params.method ? params.method : "GET",
            }
            try {
                // If the token is not expired, we will make the request
                const response = await axios(url, paramsTemp)
                return response
            } catch (e) {
                console.log(e)
                return e
            }
        }
    }
}