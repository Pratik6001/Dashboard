import React, { useState } from "react";
import {
  ChartColumnDecreasing,
  Package,
  TrendingDown,
  Users,
  X,
} from "lucide-react";
import NetMovementAnalysis from "./Analysis";

export default function Metrics({ data }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* Opening Balance */}
      <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
        <h1 className="text-gray-500">Opening Balance</h1>
        <div className="flex justify-between items-center">
          <p className="text-3xl font-semibold">{data?.openingBalance}</p>
          <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
            <Package className="text-blue-600" />
          </div>
        </div>
        <p className="text-gray-500 text-sm">Assets at period start</p>
      </div>

      {/* Closing Balance */}
      <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
        <h1 className="text-gray-500">Closing Balance</h1>
        <div className="flex justify-between items-center">
          <p className="text-3xl font-semibold">{data?.closingBalance}</p>
          <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
            <Package className="text-blue-600" />
          </div>
        </div>
        <p className="text-gray-500 text-sm">Current asset count</p>
      </div>

      {/* Net Movement */}
      <div
        onClick={() => setShowModal(true)}
        className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      >
        <h1 className="text-gray-500">Net Movement</h1>
        <div className="flex justify-between items-center">
          <p className="text-3xl font-semibold">{data?.netMovement}</p>
          <div className="w-12 h-12 rounded-full bg-red-200 flex items-center justify-center">
            <ChartColumnDecreasing className="text-red-600" />
          </div>
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-gray-500 text-sm">Click for breakdown</p>
          <TrendingDown className="w-4 h-4 text-red-600" />
        </div>
      </div>

      {/* Assigned Assets */}
      <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
        <h1 className="text-gray-500">Assigned Assets</h1>
        <div className="flex justify-between items-center">
          <p className="text-3xl font-semibold">{data?.assignedAssets}</p>
          <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
            <Users className="text-blue-600" />
          </div>
        </div>
        <p className="text-gray-500 text-sm">Currently in use</p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            >
              <X className="w-6 h-6" />
            </button>
            <NetMovementAnalysis data={data} />
          </div>
        </div>
      )}
    </div>
  );
}
