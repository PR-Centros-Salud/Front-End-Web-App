import { BASE_PATH } from "../utils/constants"
import FormData from "form-data"
import axios from "axios"

axios.defaults.headers["Access-Control-Allow-Origin"] = "*"

export const loginApi = async (data) => {
    try {
        const url = `${BASE_PATH}/person/login`
        const formData = new FormData()
        formData.append("username", data.user)
        formData.append("password", data.password)
        const response = await axios.post(url, formData)
        return response
    } catch (e) {
        console.log(e)
        return null
    }
}