const express = require("express");
const router = express.Router();
const assetController = require("../controllers/asset.controller");
const { authenticateToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

// Dashboard & Summary Filters
router.get(
  "/dashboard-filter",
  authenticateToken,
  assetController.dashboardFilter
);

// Expenditures
router.get(
  "/get-all/expenditures",
  authenticateToken,
  authorizeRoles("admin", "base_commander"),
  assetController.getAllAssetExpenditure
);

// Assignments
router.get(
  "/get-all/assignments",
  authenticateToken,
  authorizeRoles("admin", "base_commander"),
  assetController.getAllAssetAssignment
);

// Purchases
router.get(
  "/get-all/purchase-requests",
  authenticateToken,
  authorizeRoles("admin", "base_commander", "logistics_officer"),
  assetController.getAllAssetPurchaseRequest
);

// Transfers
router.get(
  "/get-all/initiate-transfers",
  authenticateToken,
  authorizeRoles("admin", "logistics_officer", "base_commander"),
  assetController.getAllInitiateTransfer
);

// Assignment Transfer Search
router.get(
  "/get-all/assignment-transfers",
  authenticateToken,
  authorizeRoles("admin", "base_commander"),
  assetController.assignmentSearchQuery
);

// Expenditure Transfer Search
router.get(
  "/get-all/expenditure-transfers",
  authenticateToken,
  authorizeRoles("admin", "base_commander"),
  assetController.assignmentSearchQuery
);

// Search Queries
router.get(
  "/query-search",
  authenticateToken,
  authorizeRoles("admin", "logistics_officer", "base_commander"),
  assetController.searchQuery
);
router.get(
  "/initiate/query-search",
  authenticateToken,
  authorizeRoles("admin", "logistics_officer", "base_commander"),
  assetController.initiateSearchQuery
);

// Recent Transactions
router.get(
  "/get-top-five/recent-transactions",
  authenticateToken,
  authorizeRoles("admin", "base_commander"),
  assetController.getRecentTransactions
);

router.post(
  "/purchase-request",
  authenticateToken,
  authorizeRoles("admin", "logistics_officer", "base_commander"),
  assetController.AssetPurchaseRequest
);
router.post(
  "/asset-expenditure",
  authenticateToken,
  authorizeRoles("base_commander", "admin"),
  assetController.AssetExpenditure
);
router.post(
  "/initiate-transfer",
  authenticateToken,
  authorizeRoles("admin", "logistics_officer", "base_commander"),
  assetController.AssetInitiateTransfer
);
router.post(
  "/asset-Assignment",
  authenticateToken,
  authorizeRoles("admin", "base_commander"),
  assetController.AssetAssignments
);

router.patch(
  "/update-initiate-status/:id",
  authenticateToken,
  authorizeRoles("admin", "logistics_officer", "base_commander"),
  assetController.updateInitiateStatusByAdmin
);
router.patch(
  "/update-purchase-status/:id",
  authenticateToken,
  authorizeRoles("admin", "logistics_officer", "base_commander"),
  assetController.updatePurchaseStatusByAdmin
);

module.exports = router;
