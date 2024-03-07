import { $api } from "@/api/interceptors";

export const getGuidesBulk = async () => {
    const response = await $api.get(
      `/guides?q=&page%5Boffset%5D=0&page%5Blimit%5D=100`
    );
    return response;

};
export const getUsersBulk = async () => {
    const response = await $api.get(
      `/users?q=&page%5Boffset%5D=0&page%5Blimit%5D=&sort%5Bby%5D=id&sort%5Border%5D=desc&filters%5Brole%5D=admin`
    );
    return response;

};
export const postBulk = async (data: any) => {
    const response = await $api.post("/user-guides/bulk",data );
    return response;

};

