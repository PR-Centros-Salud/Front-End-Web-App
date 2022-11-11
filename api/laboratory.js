import { BASE_PATH } from "../utils/constants"
import { getToken, isTokenExpired } from "./token"
import FormData from "form-data"
import axios from "axios"
import {authFetch} from './user'

axios.defaults.headers["Access-Control-Allow-Origin"] = "*"

// Function that will be used to get Laboratory Services from the API
export const getLaboratoryServicesApi = async (logout) => {
    try {
        // Define the URL
        const url = `${BASE_PATH}/institution/laboratory`
        // Make the petition GET to the API
        const result = await authFetch(url, { method: "GET" }, logout)
        return result ? result : null
    } catch (e) {
        console.log(e)
        return null
    }
}

export const getLaboratorySpecialistsApi = async (id, logout) => {
    try {
        const url = `${BASE_PATH}/medicalPersonal/labspecialists`
        const result = await authFetch(url, { method: "GET" }, logout)
        return result ? result : null
    } catch (e) {
        console.log(e)
        return null
    }
}

export const createLaboratoryServiceApi = async (values, logout) => {
    try {
        const url = `${BASE_PATH}/institution/laboratory/create`
        const formData = new FormData()
        formData.append("laboratory_service_name", values.name.trim())
        formData.append("medical_personal_id", values.medId)
        
        const result = await authFetch(url, { method: "POST", body: formData, headers: { "Content-Type": "application/json" } }, logout)
        console.log(result)
        return result ? result : null
    } catch (e) {
        console.log(e)
        return null
    }
}