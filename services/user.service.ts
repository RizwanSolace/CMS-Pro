import {
  ChangePasswordPayload,
  ChangePasswordResponse,
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
};