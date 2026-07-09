import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  GetUsersResponse,
  UpdateUserPayload,
} from "@/types/user";
import api from "@/lib/axios";
export const userService = {
  // Existing APIs...

  changePassword: async (
    payload: ChangePasswordPayload
  ): Promise<ChangePasswordResponse> => {
    const { data } = await api.patch(
      "/user/change-password",
      payload
    );

    return data;
  },
   getUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    isActive?: boolean;
    sortBy?: string;
    order?: "asc" | "desc";
  }): Promise<GetUsersResponse> => {
    try{
    const { data } = await api.get("/manageUser", {
      params,
    });
  console.log("Fetched users data:", data); // Log the fetched data
    return data;
  }catch (error) {
    console.error("Error fetching users:", error);
    console.log("Error Response", (error as any).response);
    throw error;
  }
},
updateUser: async (
  id: string,
  payload: UpdateUserPayload
) => {
  const { data } = await api.patch(
    `/manageUser/${id}`,
    payload
  );
    console.log("PATCH Response:", data);

  

  return data;
},
}