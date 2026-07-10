export interface DashboardResponse {
  success: boolean;
  message: string;
  data: {
    totalUsers?: number;
    totalAdmins?: number;
    totalEditors?: number;
    activeUsers?: number;
    inactiveUsers?: number;
    pendingAdminRequests?: number;
  };
}