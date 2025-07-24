import { ClipboardCheck, Undo2, Ban } from "lucide-react";

const assignmentStatusStyles = {
  Assigned: {
    icon: ClipboardCheck,
    className: "bg-blue-100 text-blue-700",
  },
  Returned: {
    icon: Undo2,
    className: "bg-green-100 text-green-700",
  },
  Damaged: {
    icon: Ban,
    className: "bg-red-100 text-red-700",
  },
};

export default function AssignmentStatusBadge({ status }) {
  const { icon: Icon, className } = assignmentStatusStyles[status] || {
    icon: Ban,
    className: "bg-gray-200 text-gray-600",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${className}`}
    >
      <Icon className="w-4 h-4" />
      {status}
    </div>
  );
}
