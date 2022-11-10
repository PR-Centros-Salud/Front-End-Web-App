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

