import api from "@/lib/axios";
import { DashboardResponse } from "@/types/dashboard";

export const dashboardService = {
  getDashboard: async (): Promise<DashboardResponse> => {
    const { data } = await api.get("/dashboard");
    return data;
  },
};