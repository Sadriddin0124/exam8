import { getCookie } from "@/helpers/auth.helper";
import axios, { CreateAxiosDefaults } from "axios";
const API_URL = "http://localhost:8080"
const options:CreateAxiosDefaults = {
    baseURL: API_URL,
    withCredentials: true

}
const $api = axios.create(options)
const $apiAuth = axios.create({
    baseURL: API_URL
})

$api.interceptors.request.use((config)=> {
    const access_token = getCookie()
    if(config.headers && access_token){
        config.headers.Authorization = `Bearer ${access_token}`
    }
    return config
})

export {$apiAuth, $api}