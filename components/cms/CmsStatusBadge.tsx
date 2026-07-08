interface CmsStatusBadgeProps {
  status: "Published" | "Draft";
}

export default function CmsStatusBadge({
  status,
}: CmsStatusBadgeProps) {
  const styles = {
    Published:
      "bg-green-100 text-green-700 ring-green-200",
    Draft:
      "bg-yellow-100 text-yellow-700 ring-yellow-200",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${styles[status]}`}
    >
      {status}
    </span>
  );
}