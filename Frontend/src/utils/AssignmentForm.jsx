import axios from "axios";
import { useState, useEffect } from "react";

export default function AssignmentForm({ setFormType, refreshData }) {
  const [personnelOptions] = useState([
    "Sergeant John Smith",
    "Corporal Jane Doe",
    "Private Mike Brown",
  ]);
  const [assetOptions] = useState([
    "Weapon",
    "Vehicle",
    "Ammunition",
    "Helmet",
    "Night-vision",
  ]);
  const [formState, setFormState] = useState({
    personnel: "",
    asset: "",
    assetname: "",
    quantity: "",
    notes: "",
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
      const { personnel, asset, assetname, quantity } = formState;
      if (!personnel || !asset || !assetname || !quantity) {
        setError("Please fill in all required fields.");
        return;
      }
      if (Number(quantity) <= 0) {
        setError("Quantity must be a positive number.");
        return;
      }
      const payload = {
        assettype: asset,
        assetName: assetname,
        quantity: Number(quantity),
        personnel,
        notes: formState.notes,
      };
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/assets/asset-Assignment`,
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
        personnel: "",
        asset: "",
        assetname: "",
        quantity: "",
        notes: "",
      });
      setError("");
      if (refreshData) {
        await refreshData();
      }
    } catch (error) {
      console.error("Error submitting assignment form:", error);
      setError("Failed to assign asset. Please try again.");
    }
  };

  return (
    <div className="items-center bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="bg-green-100 p-6 space-y-1 rounded">
        <h1 className="text-xl font-semibold text-blue-500">
          Assign Asset to Personnel
        </h1>
        <p className="text-green-500">
          Assign equipment to military personnel with proper documentation
        </p>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label
              htmlFor="personnel"
              className="font-semibold block text-gray-700 mb-2"
            >
              Personnel *
            </label>
            <select
              id="personnel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState.personnel}
              onChange={handleChange}
              required
            >
              <option value="">Select personnel</option>
              {personnelOptions?.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>
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
              htmlFor="notes"
              className="font-semibold block text-gray-700 mb-2"
            >
              Notes
            </label>
            <input
              type="text"
              id="notes"
              placeholder="Optional assignment notes"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState.notes}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="gap-4 flex">
          <button className="bg-green-500 p-2 rounded px-4 text-white hover:bg-green-600">
            Assign Asset
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
