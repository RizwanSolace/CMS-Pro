import api from "@/lib/axios";
import { DashboardResponse } from "@/types/dashboard";

export const dashboardService = {
  getDashboard: async (): Promise<DashboardResponse> => {
    try {
      const { data } = await api.get<DashboardResponse>("/dashboard");
      return data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);

      const fallbackData: DashboardResponse = {
        success: false,
        message: "Failed to fetch dashboard data",
        data: {
          users: {
            total: 0,
            active: 0,
          },
          pages: {
            published: 0,
            draft: 0,
          },
          cmsUsers: {
            admins: 0,
            editors: 0,
          },
          adminRequests: {
            approved: 0,
          },
        },
      };

      return fallbackData;
    }
  },
};