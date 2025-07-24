import React, { useState, useEffect } from "react";
import { Funnel } from "lucide-react";

export default function FiltersAndControls({ setQuery }) {
  const [date, setDate] = useState("");
  const [baseList] = useState([
    "Delhi Base",
    "Chennai Base",
    "North-East Base",
    "Mumbai Base",
    "Kolkata Base",
  ]);
  const [equipmentList] = useState([
    "Weapon",
    "Vehicle",
    "Ammunition",
    "Helmet",
    "Night-vision",
  ]);

  const [selectedBase, setSelectedBase] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [search, setSearch] = useState("");

  // Initialize date to today's date
  useEffect(() => {
    const today = new Date();
    const formatted = today.toISOString().split("T")[0];
    setDate(formatted);
  }, []);

  // filter values with query
  useEffect(() => {
    setQuery({
      assetType: selectedEquipment,
      base: selectedBase,
      date: date,
      search: search,
    });
  }, [selectedEquipment, selectedBase, date, setQuery]);

  return (
    <div>
      <div className="w-full p-4 sm:p-6 items-center justify-center rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
        <div className="py-2 space-y-2">
          <h1 className="flex gap-2 items-center text-lg sm:text-xl font-semibold">
            <Funnel className="text-blue-500 w-6 h-6" />
            Filters & Controls
          </h1>
          <p className="text-gray-500 text-sm">
            Customize your view by selecting equipment type, base, and date
            range
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {/* Equipment */}
          <div>
            <label
              htmlFor="equipment"
              className="font-semibold block text-gray-700 mb-2"
            >
              Equipment Type
            </label>
            <select
              id="equipment"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
            >
              <option value="">Select Equipment</option>
              {equipmentList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Base */}
          <div>
            <label
              htmlFor="base"
              className="font-semibold block text-gray-700 mb-2"
            >
              Base
            </label>
            <select
              id="base"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedBase}
              onChange={(e) => setSelectedBase(e.target.value)}
            >
              <option value="">Select Base</option>
              {baseList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="font-semibold block text-gray-700 mb-2"
            >
              Date Range
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={date || ""}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
