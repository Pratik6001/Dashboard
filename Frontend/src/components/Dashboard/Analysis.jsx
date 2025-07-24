import React from "react";
import {
  TrendingUp,
  ShoppingCart,
  ChartColumn,
  TrendingDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export default function NetMovementAnalysis({ data }) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 font-sans">
      {/* Header */}
      <div>
        <h2 className="text-xl  font-semibold flex items-center gap-2">
          <ChartColumn className="text-blue-600"></ChartColumn> Net Movement
          Analysis
        </h2>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold flex gap-2 text-green-700 mb-3">
            <TrendingUp></TrendingUp> Asset Inflows
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm border">
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <ShoppingCart size={24} /> Purchases
              </div>
              <div className="text-green-700 font-semibold">
                {data.totalPurchases}
              </div>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm border">
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <ArrowRight size={24} /> Transfers In
              </div>
              <div className="text-green-700 font-semibold">
                {data.transfersIn}
              </div>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-green-500 text-green-800 font-semibold">
            Total Inflows{" "}
            <span className="float-right">
              {data.totalPurchases + data.transfersIn}
            </span>
          </div>
        </div>
        <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
          <h3 className="font-semibold flex gap-2 text-red-700 mb-3">
            <TrendingDown></TrendingDown> Asset Outflows
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm border">
              <div className="flex items-center gap-2 text-red-600 font-medium">
                <ArrowLeft size={24} /> Transfers Out
              </div>
              <div className="text-red-700 font-semibold">
                -{data.transfersOut}
              </div>
            </div>
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md border border-dashed text-gray-400">
              <div className="flex items-center gap-2">Other Outflows</div>
              <div className="">-0</div>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-red-500 text-red-800 font-semibold">
            Total Outflows{" "}
            <span className="float-right">-{data.transfersOut}</span>
          </div>
        </div>
      </div>
      <div className="bg-rose-50 flex justify-between border-l-4 border-rose-400 p-4 rounded-lg">
        <div>
          <h3 className="font-semibold flex gap-2 text-rose-600 mb-2">
            <TrendingDown></TrendingDown> Net Movement
          </h3>
          <p className="text-sm text-rose-700">
            The net change in asset inventory after accounting for all inflows
            and outflows.
          </p>
        </div>
        <div className="text-3xl font-bold text-rose-800 mt-2">
          {data.netMovement}
        </div>
      </div>
    </div>
  );
}
