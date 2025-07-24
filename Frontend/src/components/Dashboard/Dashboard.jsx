import React, { useEffect, useState } from "react";
import { DollarSign, Package } from "lucide-react";
import PurchaseRequest from "../../utils/PurchaseRequest";
import { useUser } from "../../context/userContext";
import FiltersAndControls from "./FiltersAndControls";
import Metrics from "./Metrics";
import RecentActivity from "./RecentActivity";
import axios from "axios";

export default function AdminDashboard() {
  const [isActive, setActive] = useState(false);
  const { user } = useUser();
  const [error, setError] = useState("");
  const [query, setQuery] = useState({
    assetType: "",
    base: "",
    date: "",
    search: "",
  });
  const [assets, setAssets] = useState([]); // State to store API response
  const [recentActivity, setRecentActivity] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const filter = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/assets/dashboard-filter`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: query,
            withCredentials: true,
          }
        );
        console.log(response.data, "API response");
        setAssets(response.data);
      } catch (error) {
        setError(`No data found according to this filter!`);
        console.error("Error fetching assets:", error);
      }
    };
    filter();
  }, [query, token]);

  useEffect(() => {
    const getRecentTransactions = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/api/assets/get-top-five/recent-transactions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        console.log("date of recnet", response.data);
        setRecentActivity(response.data.recentTransactions);
      } catch (error) {
        setError(`No data found according to this filter!`);
        console.error("Error fetching assets:", error);
      }
    };
    getRecentTransactions();
  }, [token]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="p-6 md:p-12 space-y-8 md:space-y-10 bg-gray-100 h-screen overflow-y-auto">
      <div className="flex flex-col space-y-3 w-full">
        <div className="flex justify-between items-center w-full flex-wrap gap-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Asset Dashboard
          </h1>
        </div>

        <p className="text-gray-600 text-lg">
          Welcome back,{" "}
          <span className="text-black font-semibold">
            {user?.username || "unknown"}
          </span>{" "}
          !
        </p>

        <p className="text-white w-fit rounded-xl px-4 py-1 bg-red-600 text-xs font-semibold">
          {user?.roles || "No Base Assigned"}
        </p>

        {/* Stats section - responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-4">
          <p className="flex gap-2 items-center font-semibold bg-white px-4 py-3 rounded-lg shadow-sm w-full sm:w-auto">
            <DollarSign className="text-green-500 w-5 h-5" />
            Total Value:{" "}
            <span className="font-bold">${assets?.totalValue || "0"}</span>
          </p>
          <p className="flex gap-2 items-center font-semibold bg-white px-4 py-3 rounded-lg shadow-sm w-full sm:w-auto">
            <Package className="text-blue-500 w-5 h-5" />
            Total Items:{" "}
            <span className="font-bold">{assets?.totalItems || "0"}</span>
          </p>
        </div>
      </div>

      {/* Conditionally Render UI */}
      {isActive && <PurchaseRequest setActive={setActive} />}
      {error && (
        <div className="flex flex-col items-center justify-center text-center bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
          <p className="text-lg font-medium text-red-500">{error}</p>
          <p className="text-sm text-gray-500 mt-1">
            Try adjusting your filters or search keywords.
          </p>
        </div>
      )}

      <FiltersAndControls query={query} setQuery={setQuery} />
      <Metrics data={assets?.summary} />
      <RecentActivity data={recentActivity} />

      {/* Example: Render assets from API response */}
      {/* <div className="space-y-6">
        {assets?.items?.map((asset) => (
          <ProductCard key={asset.id} asset={asset} />
        ))}
      </div> */}
    </div>
  );
}
