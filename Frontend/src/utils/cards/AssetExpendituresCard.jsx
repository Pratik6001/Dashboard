import { TriangleAlert } from "lucide-react";
import React from "react";
import { useUser } from "../../context/userContext";
import CategoryBadge from "../../utils/status/category";

export default function AssetExpendituresCard({ data }) {
  const { assetType, quantity, cost, reason, category, recordedBy, date } =
    data;
  const { user } = useUser();
  console.log(data, "expenditure");

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm w-full mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="bg-red-100 text-red-700 rounded-lg p-2">
            <TriangleAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{assetType || "N/A"}</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Quantity: {quantity || 0}
            </p>
            <p className="text-xs text-gray-500">
              Cost: ${(cost || 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Reason:</span> {reason || "N/A"}
            </p>
          </div>
        </div>
        <div className="text-right space-y-1">
          <span className="bg-gray-100 text-xs px-2 py-1 rounded-full font-medium text-gray-700">
            EXP-{data._id?.slice(0, 3) || "N/A"}
          </span>
          <p className="text-sm text-gray-800">
            Recorded by: {recordedBy?.username || "N/A"}
          </p>
        </div>
      </div>

      {/* Label */}
      <div className="flex items-center mt-4 rounded-full px-3 py-1 text-sm font-medium gap-2">
        <CategoryBadge category={category || "N/A"} />
      </div>

      {/* Footer */}
      <div className="mt-4 text-sm text-gray-600 space-y-1">
        <p>
          {date
            ? new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "N/A"}
        </p>
        <p>{user?.base || "N/A"}</p>
      </div>
    </div>
  );
}
