"use client";
import { useEffect, useState } from "react";
import { dashboardService } from "@/services/dashboard.service";

interface DashboardStats {
  users:number;
  totalUsers: number;
  activeUsers: number;
  publishedPages: number;
  draftPages: number;
  totalCmsPages: number;
  totalRoles: number;
  newSignups: number;
}
interface DashboardResponse {
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


export default function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await dashboardService.getDashboard();
      console.log("Dashboard data:", res.data);
      const mapped:any = {
        totalUsers: res.data.users.total,
        activeUsers: res.data.users.active,
        publishedPages: res.data.pages.published,
        draftPages: res.data.pages.draft,
        totalCmsPages:
          res.data.pages.published + res.data.pages.draft,
        totalRoles:
          (res.data.cmsUsers.admins ?? 0) +
          (res.data.cmsUsers.editors ?? 0),
        newSignups:
          res.data.adminRequests?.approved ?? 0,
      };
      setStats(mapped);
    } finally {
      setLoading(false);
      // Adjust these according to your business logic
      
  
    }
  }
  

  return {
    stats,
    loading,
    fetchDashboard,
  };
}