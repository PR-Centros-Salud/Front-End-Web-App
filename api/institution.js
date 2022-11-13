import { BASE_PATH } from "../utils/constants"
import { getToken, isTokenExpired } from "./token"
import FormData from "form-data"
import axios from "axios"
import {authFetch} from "./user"

axios.defaults.headers["Access-Control-Allow-Origin"] = "*"

export const getRoomsApi = async (logout, type) => {
    try {
        const url = `${BASE_PATH}/institution/rooms/${type ? `?type=${type}` : ''}`
        const result = await authFetch(url, { method: "GET" }, logout)
        return result ? result : null
    } catch (e) {
        console.log(e)
        return null
    }
}