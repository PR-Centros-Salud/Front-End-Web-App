import { BASE_PATH } from "../utils/constants"
import { getToken, isTokenExpired } from "./token"
import FormData from "form-data"
import axios from "axios"
import {authFetch} from './user'

axios.defaults.headers["Access-Control-Allow-Origin"] = "*"

export const getAdminByIdApi = async (id, logout) => {
    try {
        const url = `${BASE_PATH}/admin/get/${id}`
        const result = await authFetch(url, { method: "GET" }, logout)
        return result ? result : null
    } catch (e) {
        console.log(e)
        return null
    }
}

export const updateInstitutionApi = async (id, values, logout) => {
    try {
        const url = `${BASE_PATH}/institution/update/${id}`
        console.log(values)
        const formData = new FormData()
        formData.append("name", values.name)
        formData.append("address", values.address)
        formData.append("phone", values.phone)
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
