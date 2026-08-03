"use client"
import { useEffect, useMemo, useState } from "react";
import RoleGuard from "@/components/auth/RoleGuard";
import { mockRoles } from "@/components/roles/mockroles";
import RolesTable from "@/components/roles/RolesTable";
import { userService } from "@/services/user.service";

export default function RolesPage() {
  const [roleCounts, setRoleCounts] = useState<Record<string, number>>({});
  const [loadingCounts, setLoadingCounts] = useState(true);
  const [countError, setCountError] = useState<string | null>(null);

  const normalizeRoleName = (value: string) =>
    value?.toLowerCase().replace(/_/g, " ").trim();

  useEffect(() => {
    const fetchRoleCounts = async () => {
      try {
        const firstPage = await userService.getUsers({
          page: 1,
          limit: 100,
        });

        let allUsers = firstPage.data.users;
        const totalPages = firstPage.data.pagination.totalPages;

        if (totalPages > 1) {
          const remainingPages = Array.from(
            { length: totalPages - 1 },
            (_, index) => index + 2
          );

          const pageResults = await Promise.all(
            remainingPages.map((page) =>
              userService.getUsers({ page, limit: 100 })
            )
          );

          allUsers = pageResults.reduce(
            (acc, result) => [...acc, ...result.data.users],
            allUsers
          );
        }

        const counts = allUsers.reduce(
          (acc: Record<string, number>, user) => {
            const roleName = normalizeRoleName(user.role ?? "User");
            acc[roleName] = (acc[roleName] ?? 0) + 1;
            return acc;
          },
          {}
        );

        setRoleCounts(counts);
      } catch (error: any) {
        console.error("Failed to fetch role counts:", error);
        setCountError("Unable to load role counts.");
      } finally {
        setLoadingCounts(false);
      }
    };

    fetchRoleCounts();
  }, []);

  const rolesWithCounts = useMemo(
    () =>
      mockRoles.map((role) => {
        const key = normalizeRoleName(role.name);
        const hasCounts = Object.keys(roleCounts).length > 0;

        return {
          ...role,
          users: hasCounts
            ? roleCounts[key] ?? 0
            : role.users,
        };
      }),
    [roleCounts]
  );
  return (
    <RoleGuard allowedRoles={["SUPER_ADMIN"]}>
      <div className="space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-5xl font-bold">Roles</h1>
            <p className="mt-2 text-slate-500">
              View system roles and permissions.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Role management is view-only in this screen.</p>
            <p className="mt-2 text-sm text-slate-500">
              {loadingCounts
                ? "Loading role counts..."
                : countError
                ? countError
                : `Total users across all roles: ${Object.values(roleCounts).reduce((acc, val) => acc + val, 0)}`} 
            </p>
          </div>
        </div>

        <RolesTable roles={rolesWithCounts} />
      </div>
    </RoleGuard>
  );
}