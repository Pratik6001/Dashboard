import {
  BookOpenCheck,
  Activity,
  AlertTriangle,
  XCircle,
  Wrench,
  MoreHorizontal,
} from "lucide-react";

const categoryStyles = {
  "Training Exercise": {
    icon: BookOpenCheck,
    className: "bg-yellow-100 text-yellow-700",
  },
  "Operational Use": {
    icon: Activity,
    className: "bg-blue-100 text-blue-700",
  },
  Damage: {
    icon: AlertTriangle,
    className: "bg-red-100 text-red-700",
  },
  Lost: {
    icon: XCircle,
    className: "bg-gray-200 text-gray-700",
  },
  Maintenance: {
    icon: Wrench,
    className: "bg-indigo-100 text-indigo-700",
  },
  Other: {
    icon: MoreHorizontal,
    className: "bg-slate-100 text-slate-600",
  },
};

export default function CategoryBadge({ category }) {
  const { icon: Icon, className } =
    categoryStyles[category] || categoryStyles["Other"];

  return (
    <div
      className={`inline-flex w-full items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${className}`}
    >
      <Icon className="w-4 h-4" />
      {category}
    </div>
  );
}
