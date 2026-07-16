export interface DashboardResponse {
  success: boolean;
  message: string;

  data: {
    users: {
      total: number;
      active: number;
    };

    pages: {
      published: number;
      draft: number;
    };

    cmsUsers: {
      admins: number;
      editors: number;
    };

    adminRequests: {
      approved: number;
    };
  };
}