import React, { useState, useEffect } from "react";
import axios from "axios";
import { DollarSign, Package, Plus } from "lucide-react";
import PurchaseRequest from "../../utils/PurchaseRequest";
import Filter from "../../utils/filter";
import ProductCard from "../../utils/cards/ProductCard";

export default function Purchases() {
  const [isActive, setActive] = useState(false);
  const [data, setPurchases] = useState([]);
  const StatusOptions = ["Pending", "Approved", "Rejected"];
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");

  // Function to fetch all purchase requests
  const fetchPurchases = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/assets/get-all/purchase-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("Purchase Requests:", response.data);
      setPurchases(response.data.data); // Replace state with new data
    } catch (error) {
      console.error("Error fetching purchase requests:", error);
      setError("Failed to fetch purchase requests.");
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, [token]);

  const [query, setQuery] = useState({
    assetType: "",
    base: "",
    date: "",
    status: "",
  });

  useEffect(() => {
    const filter = async () => {
      // Check if any query parameter is non-empty
      const hasQuery = Object.values(query).some(
        (value) => value && value.trim() !== ""
      );

      if (hasQuery) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/api/assets/query-search`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: query,
              withCredentials: true,
            }
          );
          console.log(response.data, "API response");
          setPurchases(response.data.data); // Replace state with filtered data
          setError(""); // Clear any previous errors
        } catch (error) {
          setError("No data found according to this filter!");
          setPurchases([]); // Clear data on error to avoid stale data
          console.error("Error fetching assets:", error);
        }
      } else {
        // If no query parameters, fetch all purchases
        fetchPurchases();
      }
    };
    filter();
  }, [query, token]);

  console.log("Purchase Data:", data);
  const totalItems = data.reduce((acc, purchase) => acc + purchase.quantity, 0);
  const totalValue = data.reduce(
    (acc, purchase) => acc + purchase.totalCost,
    0
  );

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, query]);

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 space-y-6 sm:space-y-8 md:space-y-10 bg-gray-100 h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Asset Purchases
          </h1>
          <button
            onClick={() => setActive((prev) => !prev)}
            className="bg-blue-600 flex items-center justify-center gap-2 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-md hover:bg-blue-700 transition text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            {isActive ? "Cancel Request" : "New Purchase Request"}
          </button>
        </div>

        <p className="text-gray-500 text-base sm:text-lg">
          Manage procurement and purchase requests
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <p className="flex gap-2 items-center font-semibold bg-white px-4 py-3 rounded-lg shadow-sm w-full sm:w-auto">
            <DollarSign className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
            Total Value: <span className="font-bold">${totalValue}</span>
          </p>
          <p className="flex gap-2 items-center font-semibold bg-white px-4 py-3 rounded-lg shadow-sm w-full sm:w-auto">
            <Package className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
            Total Items: <span className="font-bold">{totalItems}</span>
          </p>
        </div>
      </div>

      {/* Form */}
      {isActive && (
        <PurchaseRequest
          setActive={setActive}
          refreshPurchases={fetchPurchases}
        />
      )}

      {error && (
        <div className="flex flex-col items-center justify-center text-center bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
          <p className="text-lg font-medium text-red-500">{error}</p>
          <p className="text-sm text-gray-500 mt-1">
            Try adjusting your filters or search keywords.
          </p>
        </div>
      )}

      {/* Filters */}
      <Filter setQuery={setQuery} StatusOptions={StatusOptions} />

      {/* Cards */}
      <div className="space-y-4 sm:space-y-6">
        {data.length > 0 ? (
          data.map((purchase) => (
            <ProductCard key={purchase._id} purchase={purchase} />
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No purchase requests found.
          </p>
        )}
      </div>
    </div>
  );
}
