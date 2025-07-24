// models/AssetAssignment.js
const mongoose = require("mongoose");

const assetAssignmentSchema = new mongoose.Schema(
  {
    personnel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming personnel are also stored in User schema
      required: true,
    },
    assetType: {
      type: String,
      required: true,
      trim: true,
    },
    assetName: {
      type: String, // Name of the asset
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    notes: {
      type: String,
      trim: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // the officer assigning the asset
      required: true,
    },
    assignedDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Assigned", "Returned", "Damaged"],
      default: "Assigned",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AssetAssignment", assetAssignmentSchema);
