import React, { useState, useEffect } from "react";
import { FileText, Plus, TriangleAlert, UserCheck, Users } from "lucide-react";
import axios from "axios";
import AssignmentForm from "../../utils/AssignmentForm";
import ExpenditureForm from "../../utils/ExpenditureForm";
import PersonnelAssignmentsCard from "../../utils/cards/PersonnelAssignmentsCard";
import AssetExpendituresCard from "../../utils/cards/AssetExpendituresCard";
import Filter from "../../utils/filter";
export default function Assignments() {
  const [activeTab, setActiveTab] = useState("personnel");
  const [formType, setFormType] = useState(null);
  const [data, setData] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");
  const StatusOptions = ["Assigned", "Returned", "Damaged"];
  const StatusOptions1 = [
    "Training Exercise",
    "Operational Use",
    "Damage",
    "Combat Loss",
    "Equipment Failure",
    "Lost",
    "Maintenance",
    "Other",
  ];
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const expenditureResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/assets/get-all/expenditures`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      const assignmentResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/assets/get-all/assignments`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setAssignments(assignmentResponse.data.data);
      setData(expenditureResponse.data.data);
    } catch (error) {
      console.error("Error fetching assignments or expenditures:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const [query, setQuery] = useState({
    assetType: "",
    date: "",
    status: "",
  });

  useEffect(() => {
    const filter = async () => {
      const hasQuery = Object.values(query).some(
        (value) => value && value.trim() !== ""
      );

      if (hasQuery) {
        try {
          const baseUrl =
            activeTab === "personnel"
              ? "/get-all/assignment-transfers"
              : "/get-all/expenditure-transfers";

          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/assets${baseUrl}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: query,
              withCredentials: true,
            }
          );

          if (activeTab === "personnel") {
            setAssignments(response.data.data);
          } else {
            setData(response.data.data);
          }

          setError("");
        } catch (error) {
          setError("No data found according to this filter!");
          if (activeTab === "personnel") setAssignments([]);
          else setData([]);
          console.error("Error filtering transfers:", error);
        }
      } else {
        fetchData();
      }
    };

    filter();
  }, [query, token]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const totalExpenditures = data.reduce(
    (acc, expenditure) => acc + expenditure.quantity,
    0
  );
  const totalCost = data.reduce(
    (acc, expenditure) => acc + (expenditure.cost || 0),
    0
  );
  const totalActiveAssignments = assignments.length;

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <div className="flex flex-col space-y-6 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-semibold">
              Assignments & Expenditures
            </h1>
            <p className="text-gray-400 text-lg">
              Manage asset assignments to personnel and record expenditures
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() =>
                setFormType((prev) =>
                  prev === "assignmentform" ? null : "assignmentform"
                )
              }
              disabled={activeTab === "expenditure"}
              className={`flex items-center gap-2 border border-green-500 text-green-500 px-4 py-2 rounded-md transition
                ${
                  activeTab === "expenditure"
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-100 hover:text-black"
                }`}
            >
              <Plus className="w-5 h-5" />
              New Assignment
            </button>

            <button
              onClick={() =>
                setFormType((prev) =>
                  prev === "expenditureform" ? null : "expenditureform"
                )
              }
              disabled={activeTab === "personnel"}
              className={`flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-md transition
                ${
                  activeTab === "personnel"
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-100 hover:text-black"
                }`}
            >
              <Plus className="w-5 h-5" />
              Record Expenditure
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 text-sm md:text-base">
          <p className="flex gap-2 items-center font-semibold bg-white px-4 py-3 rounded-lg shadow-sm w-full sm:w-auto">
            <UserCheck className="text-green-500 w-5 h-5" />
            Active Assignments:{" "}
            <span className="font-bold">{totalActiveAssignments}</span>
          </p>
          <p className="flex gap-2 items-center font-semibold bg-white px-4 py-3 rounded-lg shadow-sm w-full sm:w-auto">
            <TriangleAlert className="text-red-500 w-5 h-5" />
            Total Expenditures:{" "}
            <span className="font-bold">{totalExpenditures}</span>
          </p>
          <p className="flex gap-2 items-center font-semibold bg-white px-4 py-3 rounded-lg shadow-sm w-full sm:w-auto">
            <FileText className="text-blue-500 w-5 h-5" />
            Total Cost:{" "}
            <span className="font-bold">${totalCost.toLocaleString()}</span>
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4">
          <button
            onClick={() => {
              setActiveTab("personnel");
              setFormType(null);
            }}
            className={`flex gap-2 items-center border px-5 py-2 rounded-md transition
              ${
                activeTab === "personnel"
                  ? "bg-blue-200 text-black"
                  : "text-gray-500 hover:bg-blue-200 hover:text-black"
              }`}
          >
            <Users className="w-5 h-5" />
            Personnel Assignments
          </button>

          <button
            onClick={() => {
              setActiveTab("expenditure");
              setFormType(null);
            }}
            className={`flex gap-2 items-center border border-red-500 px-5 py-2 rounded-md transition
              ${
                activeTab === "expenditure"
                  ? "bg-red-200 text-black"
                  : "text-red-500 hover:bg-red-200 hover:text-black"
              }`}
          >
            <TriangleAlert className="w-5 h-5" />
            Asset Expenditures
          </button>
        </div>

        {/* Forms */}
        {formType === "assignmentform" && (
          <AssignmentForm setFormType={setFormType} refreshData={fetchData} />
        )}
        {formType === "expenditureform" && (
          <ExpenditureForm setFormType={setFormType} refreshData={fetchData} />
        )}
        {error && (
          <div className="flex flex-col items-center justify-center text-center bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
            <p className="text-lg font-medium text-red-500">{error}</p>
            <p className="text-sm text-gray-500 mt-1">
              Try adjusting your filters or search keywords.
            </p>
          </div>
        )}

        <Filter
          setQuery={setQuery}
          StatusOptions={
            activeTab === "personnel" ? StatusOptions : StatusOptions1
          }
        ></Filter>

        {/* Data Cards */}
        <div className="space-y-6">
          {activeTab === "personnel" &&
            (assignments.length > 0 ? (
              assignments.map((item) => (
                <PersonnelAssignmentsCard key={item._id} data={item} />
              ))
            ) : (
              <p className="text-gray-500">No personnel assignments found.</p>
            ))}

          {activeTab === "expenditure" &&
            (data.length > 0 ? (
              data.map((item) => (
                <AssetExpendituresCard key={item._id} data={item} />
              ))
            ) : (
              <p className="text-gray-500">No expenditures found.</p>
            ))}
        </div>
      </div>
    </div>
  );
}
