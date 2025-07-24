import axios from "axios";
import { useState, useEffect } from "react";

export default function PurchaseRequest({ setActive, refreshPurchases }) {
  const [assetOptions] = useState([
    "Weapon",
    "Vehicle",
    "Ammunition",
    "Helmet",
    "Night-vision",
  ]);
  const [supplierOptions] = useState([
    "Bharat Arms",
    "DRDO",
    "HAL",
    "Hindustan Aeronautics Limited",
  ]);
  const [baseOptions] = useState([
    "Delhi Base",
    "Chennai Base",
    "North-East Base",
    "Mumbai Base",
  ]);
  const [formState, setFormState] = useState({
    asset: "",
    assetname: "",
    quantity: "",
    supplier: "",
    totalcost: "",
    requestdate: "",
    base: "",
    description: "",
  });
  const [assetNameOptions, setAssetNameOptions] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  // Initialize request date with today's date
  useEffect(() => {
    const today = new Date();
    const formatted = today.toISOString().split("T")[0]; // "YYYY-MM-DD"
    setFormState((prev) => ({ ...prev, requestdate: formatted }));
  }, []);

  // Update asset name options when asset type changes
  useEffect(() => {
    const assetNameMap = {
      Weapon: ["M4 Rifle", "AK-47", "Sniper Rifle"],
      Vehicle: ["Humvee", "Armored Truck", "ATV"],
      Ammunition: ["5.56mm Ammo", "7.62mm Ammo", "9mm Ammo"],
      Helmet: ["Tactical Helmet", "Ballistic Helmet", "Combat Helmet"],
      "Night-vision": ["NV Goggles Gen 3", "Thermal Vision"],
    };

    setAssetNameOptions(assetNameMap[formState.asset] || []);
    setFormState((prev) => ({ ...prev, assetname: "" })); // Reset assetname when asset changes
  }, [formState.asset]);

  // Handle form field changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { asset, quantity, supplier, totalcost, assetname } = formState;
      if (!asset || !quantity || !supplier || !totalcost || !assetname) {
        setError("Please fill in all required fields.");
        return;
      }
      const payload = {
        assettype: asset,
        assetName: assetname,
        quantity: Number(quantity),
        supplier,
        totalcost: Number(totalcost),
        requestdate: formState.requestdate,
        base: formState.base,
        description: formState.description,
      };
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/assets/purchase-request`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setActive(false);
      // Reset form
      setFormState({
        asset: "",
        assetname: "",
        quantity: "",
        supplier: "",
        totalcost: "",
        requestdate: "",
        base: "",
        description: "",
      });
      setError("");
      // Refresh purchase requests
      if (refreshPurchases) {
        await refreshPurchases();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit purchase request. Please try again.");
    }
  };

  return (
    <div className="items-center bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-md mx-4 sm:mx-6 md:mx-12 my-6">
      <div className="bg-blue-100 p-6 space-y-1 rounded-t">
        <h1 className="text-xl font-semibold text-blue-500">
          New Purchase Request
        </h1>
        <p className="text-blue-500">
          Submit a new asset purchase request for approval
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {error && <p className="text-red-500">{error}</p>}

        {/* Grid responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Asset Type */}
          <div>
            <label
              htmlFor="asset"
              className="font-semibold block text-gray-700 mb-2"
            >
              Asset Type *
            </label>
            <select
              id="asset"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState.asset}
              onChange={handleChange}
              required
            >
              <option value="">Select asset type</option>
              {assetOptions?.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Asset Name */}
          <div>
            <label
              htmlFor="assetname"
              className="font-semibold block text-gray-700 mb-2"
            >
              Asset Name *
            </label>
            <select
              id="assetname"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState.assetname}
              onChange={handleChange}
              required
            >
              <option value="">Select asset name</option>
              {assetNameOptions?.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label
              htmlFor="quantity"
              className="font-semibold block text-gray-700 mb-2"
            >
              Quantity *
            </label>
            <input
              type="number"
              id="quantity"
              placeholder="Enter quantity"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState.quantity}
              onChange={handleChange}
              required
            />
          </div>

          {/* Supplier */}
          <div>
            <label
              htmlFor="supplier"
              className="font-semibold block text-gray-700 mb-2"
            >
              Supplier *
            </label>
            <select
              id="supplier"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState.supplier}
              onChange={handleChange}
              required
            >
              <option value="">Select supplier</option>
              {supplierOptions?.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Total Cost */}
          <div>
            <label
              htmlFor="totalcost"
              className="font-semibold block text-gray-700 mb-2"
            >
              Total Cost ($) *
            </label>
            <input
              type="number"
              id="totalcost"
              placeholder="Enter total cost"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState.totalcost}
              onChange={handleChange}
              required
            />
          </div>

          {/* Request Date */}
          <div>
            <label
              htmlFor="requestdate"
              className="font-semibold block text-gray-700 mb-2"
            >
              Request Date
            </label>
            <input
              type="date"
              id="requestdate"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState.requestdate}
              onChange={handleChange}
            />
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
              value={formState.base}
              onChange={handleChange}
            >
              <option value="">Select Base</option>
              {baseOptions?.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description (full width) */}
        <div>
          <label
            htmlFor="description"
            className="font-semibold block text-gray-700 mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="Brief description of the purchase request"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formState.description}
            onChange={handleChange}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
          >
            Submit Request
          </button>
          <button
            type="button"
            onClick={() => setActive(false)}
            className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
