import { User, UserCheck } from "lucide-react";

export default function PersonnelAssignmentsCard({ data }) {
  const {
    personnel,
    assetType,
    notes,
    quantity,
    assetName,
    assignedBy,
    createdAt,
    status,
  } = data;
  console.log("PersonnelAssignmentsCard data:", data);
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-start gap-4">
          <div className="bg-green-100 text-green-700 rounded-lg p-2">
            <User className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-base sm:text-lg font-semibold break-words">
              {assetName}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Asset Type: {assetType}
            </p>
            <p className="text-xs text-gray-500">
              Personnel ID: {personnel?._id}
            </p>
            <p className="italic text-sm text-gray-500 mt-1 break-words">
              {notes || "Standard issue for deployment"}
            </p>
            <div className="mt-4 text-sm text-gray-600 space-y-1">
              <p>
                {new Date(createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>Base: {assignedBy?.base}</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="text-left sm:text-right space-y-1 min-w-[150px]">
          <span className="bg-gray-100 text-xs px-2 py-1 rounded-full font-medium text-gray-700 inline-block">
            ASG-{data?._id.slice(0, 4)}
          </span>
          <p className="text-sm text-gray-800 break-words">
            Asset: {assetName} × {quantity}
          </p>
          <p className="text-sm text-gray-800">
            Assigned by: {assignedBy?.username}
          </p>
          <div className="flex items-center mt-4 justify-end">
            <div className="flex items-center text-green-700 bg-green-100 rounded-full px-3 py-1 text-sm font-medium gap-2 w-fit ml-auto">
              <UserCheck className="w-4 h-4" />
              {status}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}

      {/* Footer */}
    </div>
  );
}
