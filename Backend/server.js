const express = require("express");
const cors = require("cors");
require("dotenv").config();
const apiLogger = require("./config/logger");

const connectToMongoDB = require("./config/db.config");
// const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const Asset = require("./routes/asset.routes");

connectToMongoDB();
const app = express();
const PORT = process.env.SERVER_PORT || 4000;
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(apiLogger);
// // User routes
// app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Asset routes
app.use("/api/assets", Asset);

// Routes
app.get("/", (req, res) => {
  res.send("Server is runing.... on port ", PORT);
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
