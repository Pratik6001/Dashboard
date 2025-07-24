import { Activity } from "lucide-react";
import ActivityCard from "../../utils/cards/ActivityCard";
export default function RecentActivity({ data }) {
  return (
    <div>
      <div className="bg-white p-6 space-y-2 rounded-lg shadow-md">
        <h1 className="flex gap-2">
          <Activity className="text-blue-600"></Activity> <p>Recent Activity</p>
        </h1>
        <p className="text-gray-500">
          Latest asset movements and transactions across your authorized bases
        </p>
      </div>

      {data?.length > 0 ? (
        data.map((item) => <ActivityCard key={item._id} data={item} />)
      ) : (
        <p>Nothing</p>
      )}
    </div>
  );
}
