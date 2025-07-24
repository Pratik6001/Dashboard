// models/AssetTransfer.js
const mongoose = require("mongoose");

const assetTransferSchema = new mongoose.Schema(
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
    fromBase: {
      type: String,
      required: true,
      trim: true,
    },
    toBase: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: [
        "Initiated",
        "Approved",
        "In-Transit",
        "Received",
        "Rejected",
        "Delivered",
        "Cancelled",
      ],
      default: "Initiated",
    },

    initiatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    approvedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InitiateTransfer", assetTransferSchema);
