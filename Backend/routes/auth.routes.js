const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  dashboard,
  Sign,
  getMyProfile,
  getProfile,
} = require("../controllers/auth.controller");

router.post("/sign", Sign);
router.post("/login", dashboard);
router.get("/profile", authenticateToken, getMyProfile);
router.get("/das/profile", authenticateToken, getProfile);

module.exports = router;
