import { BASE_PATH } from "../utils/constants"
import { getToken, isTokenExpired } from "./token"
import FormData from "form-data"
import axios from "axios"
import {authFetch} from './user'

axios.defaults.headers["Access-Control-Allow-Origin"] = "*"

// Function that will be used to get the admin from the API
export const getAdminByIdApi = async (id, logout) => {
    try {
        // Define the URL
        const url = `${BASE_PATH}/admin/get/${id}`
        // Make the petition to the API
        const result = await authFetch(url, { method: "GET" }, logout)
        // Return the result of the petition
        return result ? result : null
    } catch (e) {
        // Return null if there is an error
        console.log(e)
        return null
    }
}

export const updateInstitutionApi = async (id, values, logout) => {
    try {
        const url = `${BASE_PATH}/institution/update/${id}`
        console.log(values)
        const formData = new FormData()
        formData.append("name", values.name.trim())
        formData.append("address", values.address.trim())
        formData.append("phone", values.phone.trim())
        formData.append("latitude", values.latitude)
        formData.append("longitude", values.longitude)
        
        const params = {
            body: formData,
            headers: {
                "Content-Type": "application/json"
            }, 
            method: "PATCH"
        }
        const result = await authFetch(url, { method: "PATCH", body: values }, logout)
        return result ? result : null
    } catch (e) { 
        console.log(e)
        return null
    }
}
