import {
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRightLeft,
  PackageCheck,
  UserCheck,
  Inbox,
  Undo2,
  Send,
  ShieldX,
} from "lucide-react";

const statusColorMap = {
  Pending: "text-yellow-700 bg-yellow-100",
  Approved: "text-green-700 bg-green-100",
  Rejected: "text-red-700 bg-red-100",
  Delivered: "text-cyan-700 bg-cyan-100",
  "In-Transit": "text-purple-700 bg-purple-100",
  Initiated: "text-indigo-700 bg-indigo-100",
  Received: "text-sky-700 bg-sky-100",
  Completed: "text-green-700 bg-green-100",
  Assigned: "text-blue-700 bg-blue-100",
  Returned: "text-emerald-700 bg-emerald-100",
  Damaged: "text-rose-700 bg-rose-100",
};

const statusIconMap = {
  Pending: Clock,
  Approved: CheckCircle,
  Rejected: XCircle,
  Delivered: Truck,
  "In-Transit": ArrowRightLeft,
  Initiated: Send,
  Received: Inbox,
  Completed: PackageCheck,
  Assigned: UserCheck,
  Returned: Undo2,
  Damaged: ShieldX,
};

export const RecentStatusBadge = ({ currentStatus }) => {
  const IconComponent = statusIconMap[currentStatus] || Clock;
  return (
    <div
      className={`inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full ${
        statusColorMap[currentStatus] || "text-gray-700 bg-gray-100"
      }`}
    >
      <IconComponent className="w-4 h-4" /> <span>{currentStatus}</span>
    </div>
  );
};

export const StatusBadge = ({
  currentStatus,
  handleStatusChange,
  statusOptions,
}) => {
  const IconComponent = statusIconMap[currentStatus] || Clock;
  return (
    <div
      className={`inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full ${
        statusColorMap[currentStatus] || "text-gray-700 bg-gray-100"
      }`}
    >
      <IconComponent className="w-4 h-4" />
      <select
        value={currentStatus}
        onChange={handleStatusChange}
        className={`bg-transparent text-sm focus:outline-none ${
          statusColorMap[currentStatus]?.split(" ")[0] || "text-gray-700"
        }`}
      >
        {statusOptions.map((option) => (
          <option key={option} value={option} className="text-black">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default { StatusBadge, RecentStatusBadge };
