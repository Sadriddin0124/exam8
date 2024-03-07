import { $api } from "@/api/interceptors";
import { IEmployee } from "@/types/employee.types";

export const getUsers = async (query: string, page: number, ITEM_PER_PAGE: number) => {
  try {
    const response = await $api.get(
      `/users?q=${query}&page%5Boffset%5D=${
        (page - 1) * ITEM_PER_PAGE
      }&page%5Blimit%5D=${ITEM_PER_PAGE}&sort%5Bby%5D=id&sort%5Border%5D=desc&filters%5Brole%5D=admin`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getUserGuides = async() => {
  try {
      const response = await $api.get("/user-guides")
      return response
      
  } catch (error) {
      console.log(error);
      
  }
}
export const uploadImage = async (data: FormData) => {
  try {
    const response = await $api.post("/upload", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const createUser = async (data: IEmployee) => {
  try {
    const response = await $api.post("/users", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (data: IEmployee) => {
  try {
    const response = await $api.patch(`/users/${data?._id}`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (id: string | undefined) => {
  try {
    const response = await $api.delete(`/users/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
