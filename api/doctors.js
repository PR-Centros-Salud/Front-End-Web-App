import { BASE_PATH } from "../utils/constants"
import { getToken, isTokenExpired } from "./token"
import FormData from "form-data"
import axios from "axios"
import {authFetch} from "./user"

axios.defaults.headers["Access-Control-Allow-Origin"] = "*"
// Function that will be used to get Doctors from the API
export const getDoctorsApi = async (logout) => {
    try {
        // Define the URL
        const url = `${BASE_PATH}/medicalPersonal/institution`
        // Make the petition GET to the API
        const result = await authFetch(url, { method: "GET" }, logout)
        // Return the result of the petition
        return result
    } catch (e) {
        console.log(e)
        return null
    }
}
