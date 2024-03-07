import { $apiAuth } from "@/api/interceptors"
import { saveCookie } from "@/helpers/auth.helper";
import { IAuthPayload } from "@/types/auth.types";

export const Login =async(data: IAuthPayload)=> {
    const response = await $apiAuth.post("/users/login", data)
    saveCookie(response?.data?.data?.token)
    return response
}