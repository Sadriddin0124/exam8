import { $api } from "@/api/interceptors";

export const getEmployeeGuides = async () => {
  try {
    const response = await $api.get(
      "user-guides?page%5Boffset%5D=0&page%5Blimit%5D=10&completed=true&user_id=1"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getGuidesForEmployee = async () => {
  const response = await $api.get(
    `/guides?q=&page%5Boffset%5D=0&page%5Blimit%5D=`
  );
  return response;
};
export const markAsRead = async (id: string) => {
  const response = await $api.post(
    `/user-guides/${id}/read`
  );
  console.log(response);
};
