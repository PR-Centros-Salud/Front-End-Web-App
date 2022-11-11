import { BASE_PATH } from "../utils/constants"
import { getToken, isTokenExpired } from "./token"
import FormData from "form-data"
import axios from "axios"
import {authFetch} from "./user"


axios.defaults.headers["Access-Control-Allow-Origin"] = "*"
// Function that will be used to get Provinces from the API
export const getProvincesApi = async (logout) => {
    try {
        // Define the URL
        const url = `${BASE_PATH}/config/available-provinces`
        // Make the petition to the API
        const result = await axios.get(url)
        // Return the result of the petition
        return result ? result : null
    } catch (e) {
        console.log(e)
        return null
    }
}