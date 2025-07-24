import React, { useState } from "react";
import { ArrowRight, ArrowRightLeft, MoveRight } from "lucide-react";
import axios from "axios";
import { StatusBadge } from "../status/status";

export default function InitiateCard({ data }) {
  const {
    assetType,
    quantity,
    supplier,
    requestDate,
    createdAt,
    initiatedBy,
    toBase,
    notes,
    fromBase,
    status,
    totalCost,
    _id,
  } = data;

  const statusOptions = [
    "Initiated",
    "Approved",
    "In-Transit",
    "Received",
    "Rejected",
    "Delivered",
    "Cancelled",
  ];
  const token = localStorage.getItem("token");
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/assets/update-initiate-status/${_id}`,
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
    <div className="flex flex-col sm:flex-row justify-between bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-blue-500 hover:shadow-lg transition duration-300 space-y-4 sm:space-y-0">
      {/* Left Section */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 flex-1">
        {/* Icon */}
        <div className="bg-blue-100 rounded-xl p-3 self-start">
          <ArrowRightLeft className="text-blue-600 w-6 h-6" />
        </div>

        {/* Details */}
        <div className="flex flex-col space-y-2 text-left w-full">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {assetType}
            </h2>
            <span className="text-xs bg-gray-100 border px-2 py-0.5 rounded-full text-gray-600 break-all">
              {_id || "N/A"}
            </span>
          </div>

          <div className="flex flex-wrap text-sm text-gray-700 gap-x-6 gap-y-1">
            <p>
              <span className="font-medium">Quantity:</span> {quantity}
            </p>
            <p>
              <span className="font-medium">Initiated By:</span>{" "}
              {initiatedBy?.username || "N/A"}
            </p>
          </div>

          <div className="flex flex-wrap text-sm text-gray-700 gap-x-6 gap-y-1">
            <p>
              <span className="font-medium">Approved By:</span>{" "}
              {initiatedBy?.username || "N/A"}
            </p>
            <p className="flex gap-2">
              <span>From: {fromBase}</span>
              <span>
                <MoveRight></MoveRight>
              </span>
              <span>Base:</span> {toBase || "N/A"}
            </p>
          </div>

          <p className="italic text-sm text-gray-500 break-words">
            {notes || "No note provided."}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-between items-start sm:items-end text-sm gap-2 min-w-[150px]">
        <StatusBadge
          currentStatus={currentStatus}
          handleStatusChange={handleStatusChange}
          statusOptions={statusOptions}
        />
        <div className="text-gray-500">
          {new Date(requestDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  );
}
