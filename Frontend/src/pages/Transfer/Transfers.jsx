import React, { useState, useEffect } from "react";
import { ArrowLeftRight, CircleCheck, Clock4, Plus } from "lucide-react";
import axios from "axios";
import InitiateTransfer from "../../utils/InitiateTransfer";
import Filter from "../../utils/filter";
import InitiateCard from "../../utils/cards/initiateCard";

export default function Transfers() {
  const [isActive, setActive] = useState(false);
  const [data, setTransfer] = useState([]);
  const [error, setError] = useState("");

  const transferStatusOptions = [
    "Initiated",
    "Approved",
    "In-Transit",
    "Received",
    "Rejected",
    "Delivered",
    "Cancelled",
  ];

  const token = localStorage.getItem("token");

  const [query, setQuery] = useState({
    assetType: "",
    date: "",
    status: "",
  });

  // Fetch all transfers
  const fetchTransfers = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/assets/get-all/initiate-transfers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("Transfer Requests:", response.data.data);
      setTransfer(response.data.data);
    } catch (error) {
      console.error("Error fetching transfer requests:", error);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  useEffect(() => {
    const filter = async () => {
      if (query) {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_SERVER_URL
            }/api/assets/initiate/query-search`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: query,
              withCredentials: true,
            }
          );
          console.log(response.data, "API response");
          setTransfer(response.data.data);
        } catch (error) {
          setError("No data found according to this filter!");
          console.error("Error filtering transfers:", error);
        }
      }
    };
    filter();
  }, [query, token]);

  const totalTransfers = data.length;
  const completedTransfers = data.filter((t) => t.status === "Approved").length;
  const pendingTransfers = data.filter((t) => t.status === "Initiated").length;

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="p-4 sm:p-6 space-y-10 bg-gray-100 h-screen overflow-y-auto">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h1 className="text-3xl sm:text-4xl font-semibold">
            Asset Transfers
          </h1>
          <button
            onClick={() => setActive((prev) => !prev)}
            className="bg-blue-600 flex gap-2 items-center text-white px-4 py-2 sm:px-5 sm:py-3 rounded-md hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm sm:text-base">
              {isActive ? "Cancel Transfer" : "Initiate Transfer"}
            </span>
          </button>
        </div>
        <p className="text-gray-500 text-sm sm:text-lg">
          Manage asset transfers between bases
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
          <p className="flex gap-2 items-center font-semibold bg-white px-4 py-3 rounded-lg shadow-sm w-full sm:w-auto">
            <ArrowLeftRight className="text-blue-500 w-5 h-5" />
            Total: <span className="font-bold">{totalTransfers}</span>
          </p>
          <p className="flex gap-2 items-center font-semibold bg-white px-4 py-3 rounded-lg shadow-sm w-full sm:w-auto">
            <CircleCheck className="text-green-500 w-5 h-5" />
            Completed: <span className="font-bold">{completedTransfers}</span>
          </p>
          <p className="flex gap-2 items-center font-semibold bg-white px-4 py-3 rounded-lg shadow-sm w-full sm:w-auto">
            <Clock4 className="text-yellow-500 w-5 h-5" />
            Pending: <span className="font-bold">{pendingTransfers}</span>
          </p>
        </div>
      </div>

      {/* Transfer Form */}
      {isActive && (
        <InitiateTransfer
          setActive={setActive}
          refreshTransfers={fetchTransfers}
        />
      )}

      {/* Error Alert */}
      {error && (
        <div className="flex flex-col items-center justify-center text-center bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
          <p className="text-lg font-medium text-red-500">{error}</p>
          <p className="text-sm text-gray-500 mt-1">
            Try adjusting your filters or search keywords.
          </p>
        </div>
      )}

      {/* Filter */}
      <Filter StatusOptions={transferStatusOptions} setQuery={setQuery} />

      {/* Transfer Cards */}
      <div className="space-y-6">
        {data.length === 0 ? (
          <div className="text-center text-gray-500">
            No transfer requests found.
          </div>
        ) : (
          data.map((transfer) => (
            <InitiateCard key={transfer._id} data={transfer} />
          ))
        )}
      </div>
    </div>
  );
}
