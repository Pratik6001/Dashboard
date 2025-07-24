import { RecentStatusBadge } from "../../utils/status/status";
import { getTimeAgo } from "../timeAgo";

export default function ActivityCard({ data }) {
  const {
    type,
    assetType,
    quantity,
    base,
    fromBase,
    toBase,
    supplier,
    recordedBy,
    assignedBy,
    personnel,
    initiatedBy,
    approvedBy,
    status,
    requestDate,
    createdAt,
    sortDate,
  } = data;

  // Fallback to createdAt if sortDate is missing
  const timeAgo = sortDate ? getTimeAgo(sortDate) : getTimeAgo(createdAt);

  // Set up dynamic titles and subtitles based on the type
  let title = `${assetType} (${quantity})`;
  let subtitle = "";
  let actorLine = "";

  switch (type) {
    case "PurchaseRequest":
      subtitle = `Requested from ${supplier} → ${base}`;
      actorLine = `Initiated on behalf of base by ${supplier}`;
      break;
    case "AssetExpenditure":
      subtitle = `Expenditure at ${base}`;
      actorLine = `Recorded by ${recordedBy?.username || "Unknown"}`;
      break;
    case "AssetAssignment":
      subtitle = `Assigned to ${personnel?.name || "Unknown"} at ${base}`;
      actorLine = `By ${assignedBy?.username || "Unknown"}`;
      break;
    case "InitiateTransfer":
      subtitle = `Transfer: ${fromBase || "Source Base"} → ${
        toBase || "Destination Base"
      }`;
      actorLine = `Initiated by ${initiatedBy?.username || "Unknown"}`;
      break;
    case "ApproveTransfer":
      subtitle = `Transfer Approval: ${fromBase} → ${toBase}`;
      actorLine = `Approved by ${approvedBy?.username || "Unknown"}`;
      break;
    case "ReceiveTransfer":
      subtitle = `Received at ${toBase}`;
      actorLine = `Confirmed by ${recordedBy?.username || "Unknown"}`;
      break;
    default:
      subtitle = `Activity at ${base || "Unknown base"}`;
      actorLine = `Handled by ${recordedBy?.username || "Unknown"}`;
  }

  return (
    <div className="flex p-6 pt-4 pb-4 bg-white">
      <div className="flex border shadow-md p-6 pt-4 pb-4 justify-between w-full bg-white rounded-lg items-center hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-6">
          <p className="px-4 py-1 text-sm rounded-full items-center flex bg-black text-white capitalize">
            {type.replace(/([A-Z])/g, " $1").trim()}
          </p>
          <div>
            <h1 className="font-semibold text-base">{title}</h1>
            <p className="text-sm text-gray-600">{subtitle}</p>
            {actorLine && <p className="text-xs text-gray-500">{actorLine}</p>}
          </div>
        </div>
        <div className="text-right text-sm">
          <p className="text-gray-500">{timeAgo}</p>
          <p>
            {status ? (
              <RecentStatusBadge currentStatus={status} />
            ) : (
              <span className="text-gray-400">Unknown status</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
