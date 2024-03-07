import { $api } from "@/api/interceptors";
import { MeTypes } from "@/types/me.types";

export const getProfileData = async() => {
    try {
        const response = await $api?.get(`users/me`)
        return response
        
    } catch (error) {
        console.log(error);
        
    }
}
export const editProfileData = async(data: MeTypes) => {
    try {
        const response = await $api?.patch(`users/me`, data)
        return response
        
    } catch (error) {
        console.log(error);
        
    }
}