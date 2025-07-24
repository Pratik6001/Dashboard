// models/AssetExpenditure.js
const mongoose = require("mongoose");

const assetExpenditureSchema = new mongoose.Schema(
  {
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
    category: {
      type: String,
      enum: [
        "Training Exercise",
        "Operational Use",
        "Damage",
        "Combat Loss",
        "Equipment Failure",
        "Lost",
        "Maintenance",
        "Other",
      ],
      required: true,
    },
    cost: {
      type: Number,
      default: 0,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Officer who recorded the expenditure
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AssetExpenditure", assetExpenditureSchema);
