import { ShoppingCart } from "lucide-react";
import axios from "axios";
import React, { useState } from "react";
import { StatusBadge } from "../status/status";

export default function ProductCard({ purchase }) {
  const {
    assetType,
    quantity,
    supplier,
    requestedBy,
    createdAt,
    description,
    base,
    status,
    totalCost,
    _id,
  } = purchase;

  const statusOptions = ["Rejected", "Approved", "Pending"];
  const token = localStorage.getItem("token");
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/assets/update-purchase-status/${_id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
      setCurrentStatus(status);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300 gap-4">
      {/* Left Section */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 flex-1">
        {/* Icon */}
        <div className="bg-blue-100 rounded-xl p-3 self-start">
          <ShoppingCart className="text-blue-600 w-6 h-6" />
        </div>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {assetType}
            </h2>
            <span className="text-xs bg-gray-100 border px-2 py-0.5 rounded-full text-gray-600 break-all">
              {_id || "N/A"}
            </span>
          </div>

          <div className="text-sm text-gray-700 flex flex-wrap gap-x-6 gap-y-1">
            <p>
              <span className="font-medium">Quantity:</span> {quantity}
            </p>
            <p>
              <span className="font-medium">Supplier:</span> {supplier}
            </p>
          </div>

          <div className="text-sm text-gray-700 flex flex-wrap gap-x-6 gap-y-1">
            <p>
              <span className="font-medium">Requested by:</span>{" "}
              {requestedBy?.username || "N/A"}
            </p>
            <p>
              <span className="font-medium">Base:</span> {base || "N/A"}
            </p>
          </div>

          <p className="italic text-sm text-gray-500">
            {description || "No description provided."}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-between items-end space-y-2 min-w-[120px]">
        <StatusBadge
          currentStatus={currentStatus}
          handleStatusChange={handleStatusChange}
          statusOptions={statusOptions}
        />

        <div className="text-right text-sm text-gray-600 space-y-1">
          <div className="text-xl sm:text-2xl font-bold text-green-600">
            {totalCost?.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>

          <p className="text-xs sm:text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
