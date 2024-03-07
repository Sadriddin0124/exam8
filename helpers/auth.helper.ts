import Cookies from "js-cookie"
export const saveCookie = (token:string) => {
    Cookies.set("token", token)
}
export const getCookie = () => {
    return Cookies.get("token")
}
export const saveSearch = (value:string) => {
    Cookies.set("search", value)
}
export const getSearch = () => {
    return Cookies.get("search")
}