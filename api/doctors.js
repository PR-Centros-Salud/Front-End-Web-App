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

export const createDoctorApi = async (logout, data) => {
    try {
        const url = `${BASE_PATH}/medicalPersonal/create`
        data.first_name = data.first_name.trim()
        data.last_name = data.last_name.trim()
        data.email = data.email.trim()
        data.phone = data.phone.trim()
        data.identity_card = data.identity_card.trim()
        data.address = data.address.trim()
        data.role = data.role.trim()
        data.second_last_name = data.second_last_name.length < 4 ? null : data.second_last_name.trim()

        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        }
        const result = await authFetch(url, params, logout)
        return result
    } catch (e) {
        return e
    }
}

export const addScheduleApi = async (logout, data) => {
    try {
        console.log(data.schedule_day_list)
        
        data.schedule_day_list = data.schedule_day_list.map(e => {
            return {
                day: e.value,
                start_time: data.start_time,
                end_time: data.end_time,
                room_id: data.is_lab_personal == "0" ? data.room_id : null
            }
        })


        const url = `${BASE_PATH}/medicalPersonal/add-schedule/${data.id}`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        }
        const result = await authFetch(url, params, logout)
        return result
    } catch (e){
        return e
    }
}

export const deleteDoctorApi = async (logout, id) => {
    try {
        const url = `${BASE_PATH}/medicalPersonal/delete/${id}`
        const params = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
        const result = await authFetch(url, params, logout)
        return result
    } catch (e) {
        return e
    }
}

export const getDoctorApi = async (logout, id) => { 
    try {
        const url = `${BASE_PATH}/medicalPersonal/get/${id}`
        const result = await authFetch(url, { method: "GET"}, logout)
        return result
    } catch (e) {
        return e
    }
}