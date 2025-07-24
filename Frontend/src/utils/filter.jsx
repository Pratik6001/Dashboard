import React, { useEffect, useState } from "react";

export default function Filter({ StatusOptions, setQuery }) {
  const assetTypeOptions = [
    "Weapon",
    "Vehicle",
    "Ammunition",
    "Helmet",
    "Night-vision",
  ];

  const [statusOptions, setStatusOptions] = useState(
    StatusOptions || "All Status"
  );
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [date, setDate] = useState("");

  const handleClearFilters = () => {
    setSelectedType("");
    setSelectedStatus("");
    setDate("");
  };

  useEffect(() => {
    setQuery({
      assetType: selectedType,
      status: selectedStatus,
      date,
    });
  }, [selectedStatus, selectedType, date]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 sm:p-6 items-start rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
        {/* Asset Type */}
        <div>
          <label
            htmlFor="assettype"
            className="font-semibold block text-gray-700 mb-2"
          >
            Asset Type
          </label>
          <select
            id="assettype"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="All Types">All Types</option>
            {assetTypeOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="font-semibold block text-gray-700 mb-2"
          >
            Status
          </label>
          <select
            id="status"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All Status">All Status</option>
            {statusOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        {/* Date Range */}
        <div>
          <label
            htmlFor="date"
            className="font-semibold block text-gray-700 mb-2"
          >
            Date Range
          </label>
          <input
            type="date"
            id="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={date || ""}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Clear Filters */}
        <div className="flex items-center h-auto  mt-8">
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 rounded border w-full bg-gray-100 hover:bg-gray-200 transition text-sm font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
