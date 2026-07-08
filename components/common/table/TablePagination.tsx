import Button from "@/components/common/Button";

export default function TablePagination() {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4">
      <p className="text-sm text-slate-500">
        Showing 1 to 10 of 50 entries
      </p>

      <div className="flex gap-2">
        <Button variant="outline">
          Previous
        </Button>

        <Button>
          1
        </Button>

        <Button variant="outline">
          Next
        </Button>
      </div>
    </div>
  );
}