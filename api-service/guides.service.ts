import { $api } from "@/api/interceptors";
import { IGuidesPayload } from "@/types/guide.types";

export const getGuides = async (query: string, page: number, ITEM_PER_PAGE: number) => {
    const response = await $api.get(
      `/guides?q=${query}&page%5Boffset%5D=${ITEM_PER_PAGE * (page - 1)}&page%5Blimit%5D=${ITEM_PER_PAGE}`
    );
    return response;

};

export const postGuide = async (data: IGuidesPayload) => {
  try {
    const response = await $api.post("/guides", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const updateGuide = async (data: IGuidesPayload) => {
  try {
    const response = await $api.patch(`/guides/${data?._id}`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const deleteGuide = async (id: string | undefined) => {
  try {
    const response = await $api.delete(`/guides/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
