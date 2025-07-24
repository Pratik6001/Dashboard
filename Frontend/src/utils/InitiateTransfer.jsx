import axios from "axios";
import { useState, useEffect } from "react";

export default function InitiateTransfer({ setActive, refreshTransfers }) {
  const [assetOptions] = useState([
    "Weapon",
    "Vehicle",
    "Ammunition",
    "Helmet",
    "Night-vision",
  ]);
  const [baseOptions] = useState([
    "Delhi Base",
    "Chennai Base",
    "North-East Base",
    "Mumbai Base",
  ]);
  const [fromBaseOptions] = useState(["Kolkata Base"]);
  const [assetNameOptions, setAssetNameOptions] = useState([]);
  const [formState, setFormState] = useState({
    asset: "",
    assetname: "",
    quantity: "",
    frombase: "",
    tobase: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

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
      const { asset, assetname, quantity, frombase, tobase } = formState;
      if (!asset || !assetname || !quantity || !frombase || !tobase) {
        setError("Please fill in all required fields.");
        return;
      }
      if (frombase === tobase) {
        setError("From Base and To Base cannot be the same.");
        return;
      }
      if (Number(quantity) <= 0) {
        setError("Quantity must be a positive number.");
        return;
      }
      const payload = {
        assetType: asset,
        assetName: assetname,
        quantity: Number(quantity),
        fromBase: frombase,
        toBase: tobase,
        notes: formState.notes,
      };
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/assets/initiate-transfer`,
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
        frombase: "",
        tobase: "",
        notes: "",
      });
      setError("");
      // Refresh transfer requests
      if (refreshTransfers) {
        await refreshTransfers();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to initiate transfer. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-blue-100 p-4 sm:p-6 space-y-1">
        <h1 className="text-lg sm:text-xl font-semibold text-blue-500">
          Initiate Asset Transfer
        </h1>
        <p className="text-blue-500 text-sm sm:text-base">
          Transfer assets between military bases with proper authorization
        </p>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="p-4 sm:p-6 space-y-6 sm:space-y-8"
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
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
              <option value="">Select Asset type</option>
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
              <option value="">Select Asset Name</option>
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

          {/* From Base */}
          <div>
            <label
              htmlFor="frombase"
              className="font-semibold block text-gray-700 mb-2"
            >
              From Base *
            </label>
            <select
              id="frombase"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState.frombase}
              onChange={handleChange}
              required
            >
              <option value="">Select From Base</option>
              {fromBaseOptions?.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* To Base */}
          <div>
            <label
              htmlFor="tobase"
              className="font-semibold block text-gray-700 mb-2"
            >
              To Base *
            </label>
            <select
              id="tobase"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState.tobase}
              onChange={handleChange}
              disabled={!formState.frombase}
              required
            >
              <option value="">Select To Base</option>
              {baseOptions
                ?.filter((base) => base !== formState.frombase)
                .map((r) => (
                  <option key={r} value={r}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor="notes"
            className="font-semibold block text-gray-700 mb-2"
          >
            Notes
          </label>
          <input
            type="text"
            id="notes"
            placeholder="Optional notes about the transfer"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formState.notes}
            onChange={handleChange}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full sm:w-auto"
          >
            Initiate Transfer
          </button>
          <button
            type="button"
            onClick={() => setActive(false)}
            className="border px-4 py-2 rounded hover:bg-gray-100 transition w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
