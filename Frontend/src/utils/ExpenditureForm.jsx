import axios from "axios";
import { useState, useEffect } from "react";

export default function ExpenditureForm({ setFormType, refreshData }) {
  const [assetOptions] = useState([
    "Weapon",
    "Vehicle",
    "Ammunition",
    "Helmet",
    "Night-vision",
  ]);
  const [categoryOptions] = useState([
    "Training Exercise",
    "Combat Loss",
    "Equipment Failure",
    "Maintenance",
    "Other",
  ]);
  const [formState, setFormState] = useState({
    asset: "",
    assetname: "",
    quantity: "",
    category: "",
    cost: "",
    reason: "",
  });
  const [assetNameOptions, setAssetNameOptions] = useState([]);
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
    setFormState((prev) => ({ ...prev, assetname: "" }));
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
      const { asset, assetname, quantity, category, cost, reason } = formState;
      if (!asset || !assetname || !quantity || !category || !reason) {
        setError("Please fill in all required fields.");
        return;
      }
      if (Number(quantity) <= 0) {
        setError("Quantity must be a positive number.");
        return;
      }
      if (cost && Number(cost) < 0) {
        setError("Cost cannot be negative.");
        return;
      }
      const payload = {
        assetType: asset,
        assetName: assetname,
        quantity: Number(quantity),
        category,
        cost: cost ? Number(cost) : 0,
        reason,
      };
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/assets/asset-expenditure`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setFormType(null);
      setFormState({
        asset: "",
        assetname: "",
        quantity: "",
        category: "",
        cost: "",
        reason: "",
      });
      setError("");
      if (refreshData) {
        await refreshData();
      }
    } catch (error) {
      console.error("Error submitting expenditure form:", error);
      setError("Failed to record expenditure. Please try again.");
    }
  };

  return (
    <div className="items-center bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="bg-red-100 p-6 space-y-1 rounded">
        <h1 className="text-xl font-semibold text-blue-500">
          Record Asset Expenditure
        </h1>
        <p className="text-red-500">
          Document asset expenditures for training, combat, or maintenance
        </p>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-2 gap-8">
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
          <div>
            <label
              htmlFor="category"
              className="font-semibold block text-gray-700 mb-2"
            >
              Category *
            </label>
            <select
              id="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              {categoryOptions?.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="cost"
              className="font-semibold block text-gray-700 mb-2"
            >
              Cost ($)
            </label>
            <input
              type="number"
              id="cost"
              placeholder="Enter cost (optional)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState.cost}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="reason"
            className="font-semibold block text-gray-700 mb-2"
          >
            Reason *
          </label>
          <input
            type="text"
            id="reason"
            placeholder="Detailed reason for expenditure (e.g., training exercise, combat loss)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formState.reason}
            onChange={handleChange}
            required
          />
        </div>
        <div className="gap-4 flex">
          <button className="bg-red-500 p-2 rounded px-4 text-white hover:bg-red-600">
            Record Expenditure
          </button>
          <button
            onClick={() => setFormType(null)}
            className="border p-2 rounded px-4"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
