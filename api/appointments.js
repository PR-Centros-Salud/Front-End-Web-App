import { BASE_PATH } from "../utils/constants"
import { getToken, isTokenExpired } from "./token"
import FormData from "form-data"
import axios from "axios"
import {authFetch} from './user'

axios.defaults.headers["Access-Control-Allow-Origin"] = "*"

export const getMedAppointments = async (type, logout) => {
    try {
        const url = `${BASE_PATH}/medappointments/medical_personal?q=${type}`
        const result = await authFetch(url, { method: "GET" }, logout)
        return result ? result : null
    } catch (e) {
        console.log(e)
        return null
    }
}

export const getLabAppointments = async (type, logout) => {
    try {
        const url = `${BASE_PATH}/labappointments/medical_personal?q=${type}`
        const result = await authFetch(url, { method: "GET" }, logout)
        return result ? result : null
    } catch (e) {
        console.log(e)
        return null
    }
}

export const getLabAppointment = async (id, logout) => {
    try {
        const url = `${BASE_PATH}/labappointments/get/${id}`
        const result = await authFetch(url, { method: "GET" }, logout)
        return result ? result : null
    } catch (e) {
        console.log(e)
        return null
    }
}

export const getMedAppointment = async (id, logout) => {
    try {
        const url = `${BASE_PATH}/medappointments/get/${id}`
        const result = await authFetch(url, { method: "GET" }, logout)
        return result ? result : null
    } catch (e) {
        console.log(e)
        return null
    }
}

export const confirmMedAppointment = async (id, logout) => {
    try {
        const url = `${BASE_PATH}/medappointments/confirm/${id}`
        const result = await authFetch(url, { method: "PATCH" }, logout)
        return result ? result : null
    } catch (e) {
        console.log(e)
        return null
    }
}

export const confirmLabAppointment = async (id, logout) => {
    try {
        const url = `${BASE_PATH}/labappointments/confirm/${id}`
        const result = await authFetch(url, { method: "PATCH" }, logout)
        return result ? result : null
    } catch (e) {
        console.log(e)
        return null
    }
}

export const cancelMedAppointment = async (id, logout) => {
    try {
        const url = `${BASE_PATH}/medappointments/cancel/${id}`
        const result = await authFetch(url, { method: "PATCH" }, logout)
        return result ? result : null
    } catch (e) {
        console.log(e)
        return null
    }
}

export const cancelLabAppointment = async (id, logout) => {
    try {
        const url = `${BASE_PATH}/labappointments/cancel/${id}`
        const result = await authFetch(url, { method: "PATCH" }, logout)
        return result ? result : null
    } catch (e) {
        console.log(e)
        return null
    }
}

export const finishMedAppointment = async (id, logout, values) => { 
    try {
        const url = `${BASE_PATH}/medappointments/finish/${id}`
        const result = await authFetch(url, {
            method: "PATCH", body: {
            recipe: values.recipe,
        } }, logout)
        return result ? result : null
    } catch (e) {
        console.log(e)
        return null
    }
}

export const finishLabAppointment = async (id, logout, values) => { 
    try {
        const url = `${BASE_PATH}/labappointments/finish/${id}`
        const result = await authFetch(url, { method: "PATCH", body: values }, logout)
        return result ? result : null
    } catch (e) {
        console.log(e)
        return null
    }
}

