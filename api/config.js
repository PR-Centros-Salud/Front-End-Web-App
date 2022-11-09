import { BASE_PATH } from "../utils/constants"
import { getToken, isTokenExpired } from "./token"
import FormData from "form-data"
import axios from "axios"
import {authFetch} from "./user"

axios.defaults.headers["Access-Control-Allow-Origin"] = "*"

export const getProvincesApi = async (logout) => {
    try {
        const url = `${BASE_PATH}/config/available-provinces`
        const result = await axios.get(url)
        return result ? result : null
    } catch (e) {
        console.log(e)
        return null
    }
}