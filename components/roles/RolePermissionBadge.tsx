interface Props {
  permissions: string[];
}

export default function RolePermissionBadge({
  permissions,
}: Props) {
  const visible =
    permissions.slice(0, 3);

  const remaining =
    permissions.length - visible.length;

  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((permission) => (
        <span
          key={permission}
          className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white"
        >
          {permission}
        </span>
      ))}

      {remaining > 0 && (
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          +{remaining}
        </span>
      )}
    </div>
  );
}