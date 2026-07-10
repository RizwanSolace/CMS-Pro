"use client";
import { useEffect, useState } from "react";
import { dashboardService } from "@/services/dashboard.service";

export default function useDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await dashboardService.getDashboard();
      setStats(res.data);
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    loading,
    fetchDashboard,
  };
}