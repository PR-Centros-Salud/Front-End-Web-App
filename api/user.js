import { BASE_PATH } from "../utils/constants"
import { getToken, isTokenExpired } from "./token"
import FormData from "form-data"
import axios from "axios"

axios.defaults.headers["Access-Control-Allow-Origin"] = "*"

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

export const authFetch = async (url, params, logout) => { 
    const token = getToken()

    if (!token) {
        logout()
    } else {
        if (isTokenExpired(token)) {
            logout()
        } else {
            const paramsTemp = {
                data: params.body,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`, 
                },
                method: params.method ? params.method : "GET",
            }
            try {
                const response = await axios(url, paramsTemp)
                return response
            } catch (e) {
                console.log(e)
                return e
            }
        }
    }
}