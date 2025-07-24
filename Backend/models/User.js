// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: [/.+@.+\..+/, "Please use a valid email address"],
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "base_commander", "logistics_officer"],
    default: "logistics_officer",
  },
  base: {
    type: String,
    enum: [
      "Delhi Base",
      "Chennai Base",
      "North-East Base",
      "Mumbai Base",
      "Kolkata Base",
    ],
    default: "Home Base",
  },

  // baseAssigned: {
  //   type: String, // or ObjectId if you're referencing a "Base" model
  //   default: "Unassigned",
  //   required: function () {
  //     return (
  //       this.role === "base_commander" || this.role === "logistics_officer"
  //     );
  //   },
  // },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
