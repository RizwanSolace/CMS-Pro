interface UserStatusBadgeProps {
  status: string;
}

export default function UserStatusBadge({
  status,
}: UserStatusBadgeProps) {
  const styles = {
    Active:
      "bg-green-100 text-green-700",

    Inactive:
      "bg-yellow-100 text-yellow-700",

    Blocked:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status as keyof typeof styles]
      }`}
    >
      {status}
    </span>
  );
}