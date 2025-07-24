const AssetAssignment = require("../models/AssetAssignment");
const AssetExpenditure = require("../models/AssetExpenditure");
const InitiateTransfer = require("../models/InitiateTransfer");
const PurchaseRequest = require("../models/PurchaseRequest");

exports.AssetAssignments = async (req, res) => {
  try {
    const userId = req.user.id;
    const { assettype, assetName, quantity, notes, personnel } = req.body;

    if (!assettype || !assetName || !quantity || !personnel) {
      return res.status(400).json({
        message: "Fields are required",
      });
    }

    const data = new AssetAssignment({
      assetType: assettype,
      assetName: assetName,
      quantity: quantity,
      notes: notes,
      assignedBy: userId,
      personnel: userId,
    });

    await data.save();
    return res.status(201).json({
      message: "Purchase request created successfully",
      data,
    });
  } catch (error) {
    console.error("Error creating purchase request:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
exports.AssetPurchaseRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      assettype,
      assetName,
      quantity,
      supplier,
      totalcost,
      requestdate,
      base,
      description,
    } = req.body;

    if (!assettype || !assetName || !quantity || !supplier || !totalcost) {
      return res.status(400).json({
        message: "Fields are required",
      });
    }

    const data = new PurchaseRequest({
      userId: userId,
      assetType: assettype,
      assetName: assetName,
      quantity: quantity,
      supplier: supplier,
      totalCost: totalcost,
      requestDate: requestdate || Date.now(),
      base: base,
      description: description,
      requestedBy: userId,
    });

    await data.save();
    return res.status(201).json({
      message: "Purchase request created successfully",
      data,
    });
  } catch (error) {
    console.error("Error creating purchase request:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.AssetInitiateTransfer = async (req, res) => {
  try {
    const { assetType, quantity, fromBase, toBase, assetName, notes } =
      req.body;
    const userId = req.user.id;

    if (!assetType || !quantity || !fromBase || !assetName || !toBase) {
      return res.status(400).json({
        message: "Fields are required",
      });
    }

    const data = new InitiateTransfer({
      assetType,
      assetName,
      quantity,
      fromBase,
      toBase,
      notes: notes || "",
      initiatedBy: userId,
    });

    await data.save();
    return res.status(201).json({
      message: "InitiateTransfer request created successfully",
      data,
    });
  } catch (error) {
    console.error("Error creating initiatetransfer request:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.AssetExpenditure = async (req, res) => {
  try {
    const { assetType, assetName, quantity, category, cost, reason } = req.body;
    const userId = req.user.id;

    if (!assetType || !quantity || !assetName || !category || !reason) {
      return res.status(400).json({
        message: "Fields are required",
      });
    }

    const data = new AssetExpenditure({
      assetType,
      assetName,
      quantity,
      category,
      cost,
      reason,
      recordedBy: userId,
    });

    await data.save();
    return res.status(201).json({
      message: "InitiateTransfer request created successfully",
      data,
    });
  } catch (error) {
    console.error("Error creating initiatetransfer request:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getAllAssetPurchaseRequest = async (req, res) => {
  try {
    const purchase = await PurchaseRequest.find()
      .populate("userId", "username")
      .populate("requestedBy", "username")
      .sort({ createdAt: -1 });

    if (!purchase || purchase.length === 0) {
      return res.status(404).json({ message: "No purchase requests found" });
    }

    return res.status(200).json({
      message: "Purchase requests fetched successfully",
      data: purchase,
    });
  } catch (error) {
    console.error("Error fetching purchase requests:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching purchase requests",
      error: error.message,
    });
  }
};

exports.getAllInitiateTransfer = async (req, res) => {
  try {
    const initiate = await InitiateTransfer.find()
      .populate("initiatedBy", "username")
      .populate("approvedBy", "username")
      .sort({ createdAt: -1 });

    console.log("Initiate Transfer Fetched:", initiate);

    if (!initiate || initiate.length === 0) {
      return res.status(200).json({
        message: "No initiate transfer requests found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Initiate transfer requests fetched successfully",
      data: initiate,
    });
  } catch (error) {
    console.error("Error fetching initiate transfer requests:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching initiate transfer requests",
      error: error.message,
    });
  }
};

exports.getAllAssetExpenditure = async (req, res) => {
  try {
    const expenditure = await AssetExpenditure.find()
      .populate("recordedBy", "username")
      .sort({ createdAt: -1 });

    if (!expenditure || expenditure.length === 0) {
      return res.status(404).json({ message: "No asset expenditures found" });
    }

    return res.status(200).json({
      message: "Asset expenditures fetched successfully",
      data: expenditure,
    });
  } catch (error) {
    console.error("Error fetching asset expenditures:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching asset expenditures",
      error: error.message,
    });
  }
};
exports.getAllAssetAssignment = async (req, res) => {
  try {
    const assignments = await AssetAssignment.find()
      .populate("assignedBy", "username base role")
      .populate("personnel", "name")
      .sort({ createdAt: -1 });

    if (!assignments || assignments.length === 0) {
      return res.status(404).json({ message: "No asset assignments found" });
    }

    return res.status(200).json({
      message: "Asset assignments fetched successfully",
      data: assignments,
    });
  } catch (error) {
    console.error("Error fetching asset assignments:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching asset assignments",
      error: error.message,
    });
  }
};

exports.updateInitiateStatusByAdmin = async (req, res) => {
  try {
    const { status } = req.body;
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const transfer = await InitiateTransfer.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!transfer) {
      return res.status(404).json({ message: "Transfer not found" });
    }

    return res.status(200).json({
      message: "Transfer status updated successfully",
      data: transfer,
    });
  } catch (error) {
    console.error("Error updating transfer status:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
exports.updatePurchaseStatusByAdmin = async (req, res) => {
  try {
    const { status } = req.body;
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const data = await PurchaseRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ message: "Transfer not found" });
    }

    return res.status(200).json({
      message: "Transfer status updated successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error updating transfer status:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.searchQuery = async (req, res) => {
  try {
    const { assetType, status, date } = req.query;

    const { start, end } = date
      ? getDateRange(date)
      : { start: new Date(0), end: new Date() };

    const match = {
      ...(assetType && { assetType }),
      ...(status && { status }),
      createdAt: { $gte: start, $lte: end },
    };

    const result = await PurchaseRequest.aggregate([
      { $match: match },
      {
        $project: {
          assetType: 1,
          status: 1,
          createdAt: 1,
          quantity: 1,
          _id: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    if (!result.length) {
      return res.status(404).json({ message: "No matching records found." });
    }

    return res.status(200).json({
      data: result,
      totalValue: result.reduce(
        (sum, item) => sum + (item.quantity * 1000 || 0),
        0
      ),
      totalItems: result.length,
      message: "Fetched successfully",
    });
  } catch (error) {
    console.error("Error in searchQuery:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.initiateSearchQuery = async (req, res) => {
  try {
    const { assetType, status, date } = req.query;

    const { start, end } = date
      ? getDateRange(date)
      : { start: new Date(0), end: new Date() };

    const match = {
      ...(assetType && { assetType }),
      ...(status && { status }),

      createdAt: { $gte: start, $lte: end },
    };

    const result = await InitiateTransfer.aggregate([
      { $match: match },
      {
        $project: {
          assetType: 1,
          status: 1,
          createdAt: 1,
          quantity: 1,
          _id: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    if (!result.length) {
      return res.status(404).json({ message: "No matching records found." });
    }

    return res.status(200).json({
      data: result,
      totalValue: result.reduce(
        (sum, item) => sum + (item.quantity * 1000 || 0),
        0
      ),
      totalItems: result.length,
      message: "Fetched successfully",
    });
  } catch (error) {
    console.error("Error in initiateSearchQuery:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
exports.assignmentSearchQuery = async (req, res) => {
  try {
    const { assetType, status, date } = req.query;

    const { start, end } = date
      ? getDateRange(date)
      : { start: new Date(0), end: new Date() };

    const match = {
      ...(assetType && { assetType }),
      ...(status && { status }),
      createdAt: { $gte: start, $lte: end },
    };

    const result = await AssetAssignment.aggregate([
      { $match: match },
      {
        $project: {
          assetType: 1,
          status: 1,
          createdAt: 1,
          quantity: 1,
          _id: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    if (!result.length) {
      return res.status(404).json({ message: "No matching records found." });
    }

    return res.status(200).json({
      data: result,
      totalValue: result.reduce(
        (sum, item) => sum + (item.quantity * 1000 || 0),
        0
      ),
      totalItems: result.length,
      message: "Fetched successfully",
    });
  } catch (error) {
    console.error("Error in initiateSearchQuery:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
exports.expenditureSearchQuery = async (req, res) => {
  try {
    const { assetType, status, date } = req.query;

    const { start, end } = date
      ? getDateRange(date)
      : { start: new Date(0), end: new Date() };

    const match = {
      ...(assetType && { assetType }),
      ...(status && { status }),
      createdAt: { $gte: start, $lte: end },
    };

    const result = await AssetExpenditure.aggregate([
      { $match: match },
      {
        $project: {
          assetType: 1,
          status: 1,
          createdAt: 1,
          quantity: 1,
          _id: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    if (!result.length) {
      return res.status(404).json({ message: "No matching records found." });
    }

    return res.status(200).json({
      data: result,
      totalValue: result.reduce(
        (sum, item) => sum + (item.quantity * 1000 || 0),
        0
      ),
      totalItems: result.length,
      message: "Fetched successfully",
    });
  } catch (error) {
    console.error("Error in initiateSearchQuery:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

function getDateRange(date) {
  const d = new Date(date);
  const start = new Date(d.setHours(0, 0, 0, 0));
  const end = new Date(d.setHours(23, 59, 59, 999));
  return { start, end };
}

exports.dashboardFilter = async (req, res) => {
  try {
    const { assetType, status, base, date } = req.query;
    const matchCriteria = {};

    if (assetType) matchCriteria.assetType = assetType;
    if (status) matchCriteria.status = status;
    if (base) matchCriteria.base = base;

    const { start, end } = date
      ? getDateRange(date)
      : { start: new Date(0), end: new Date() };

    // Total received and expended before the selected period
    const [receivedBefore, expendedBefore] = await Promise.all([
      PurchaseRequest.aggregate([
        {
          $match: {
            ...matchCriteria,
            createdAt: { $lt: start },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$quantity" },
          },
        },
      ]),
      AssetExpenditure.aggregate([
        {
          $match: {
            ...matchCriteria,
            date: { $lt: start },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$quantity" },
          },
        },
      ]),
    ]);

    const openingBalance =
      (receivedBefore[0]?.total || 0) - (expendedBefore[0]?.total || 0);

    // Total received and expended during the period
    const [receivedDuring, expendedDuring] = await Promise.all([
      PurchaseRequest.aggregate([
        {
          $match: {
            ...matchCriteria,
            createdAt: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$quantity" },
          },
        },
      ]),
      AssetExpenditure.aggregate([
        {
          $match: {
            ...matchCriteria,
            date: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$quantity" },
          },
        },
      ]),
    ]);

    const netMovement =
      (receivedDuring[0]?.total || 0) - (expendedDuring[0]?.total || 0);
    const closingBalance = openingBalance + netMovement;

    // Existing data fetches
    const [
      purchaseRequests,
      assetExpenditures,
      assetAssignments,
      initiateTransfers,
    ] = await Promise.all([
      PurchaseRequest.aggregate([
        {
          $match: {
            ...matchCriteria,
            ...(date && { createdAt: { $gte: start, $lte: end } }),
          },
        },
        { $sort: { createdAt: -1 } },
      ]),

      AssetExpenditure.find({
        ...matchCriteria,
        ...(date && { date: { $gte: start, $lte: end } }),
      })
        .populate("recordedBy", "username")
        .sort({ date: -1 })
        .lean(),

      AssetAssignment.find({
        ...matchCriteria,
        ...(date && { assignedDate: { $gte: start, $lte: end } }),
      })
        .populate("assignedBy", "username")
        .populate("personnel", "name")
        .sort({ assignedDate: -1 })
        .lean(),

      InitiateTransfer.find({
        ...matchCriteria,
        ...(date && { requestDate: { $gte: start, $lte: end } }),
      })
        .populate("initiatedBy", "username")
        .populate("approvedBy", "username")
        .sort({ requestDate: -1 })
        .lean(),
    ]);

    const assignedAssets = assetAssignments.filter(
      (a) => a.status === "Assigned"
    ).length;

    const totalItems = purchaseRequests.reduce(
      (acc, req) => acc + (req.quantity || 0),
      0
    );

    const totalValue = purchaseRequests.reduce((acc, req) => {
      const quantity = req.quantity || 0;
      const unitCost = req.unitCost || 0;
      const totalCost = req.totalCost || quantity * unitCost;
      return acc + totalCost;
    }, 0);

    const totalPurchases = purchaseRequests.reduce(
      (acc, req) => acc + (req.quantity || 0),
      0
    );

    const transfersIn = initiateTransfers.filter((t) =>
      ["Delivered", "Received"].includes(t.status)
    ).length;

    const transfersOut = initiateTransfers.filter((t) =>
      ["Initiated", "Approved", "In-Transit"].includes(t.status)
    ).length;

    res.status(200).json({
      purchaseRequests,
      assetExpenditures,
      summary: {
        openingBalance,
        netMovement,
        closingBalance,
        assignedAssets,
        totalPurchases,
        transfersIn,
        transfersOut,
      },
      assetAssignments,
      initiateTransfers,
      totalItems,
      totalValue,
    });
  } catch (error) {
    console.error("Error in dashboardFilter:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getRecentTransactions = async (req, res) => {
  try {
    const [purchases, expenditures, assignments, transfers] = await Promise.all(
      [
        PurchaseRequest.find().sort({ createdAt: -1 }).limit(5).lean(),

        AssetExpenditure.find()
          .sort({ date: -1 })
          .limit(5)
          .populate("recordedBy", "username")
          .lean(),

        AssetAssignment.find()
          .sort({ assignedDate: -1 })
          .limit(5)
          .populate("assignedBy", "username")
          .populate("personnel", "name")
          .lean(),

        InitiateTransfer.find()
          .sort({ requestDate: -1 })
          .limit(5)
          .populate("initiatedBy", "username")
          .populate("approvedBy", "username")
          .lean(),
      ]
    );

    // Tag each with type and unify
    const combined = [
      ...purchases.map((e) => ({
        ...e,
        type: "PurchaseRequest",
        sortDate: new Date(e.createdAt),
      })),
      ...expenditures.map((e) => ({
        ...e,
        type: "AssetExpenditure",
        sortDate: new Date(e.date),
      })),
      ...assignments.map((e) => ({
        ...e,
        type: "AssetAssignment",
        sortDate: new Date(e.assignedDate),
      })),
      ...transfers.map((e) => ({
        ...e,
        type: "InitiateTransfer",
        sortDate: new Date(e.requestDate),
      })),
    ];

    // Sort all combined by their sortDate descending
    const recentTransactions = combined
      .sort((a, b) => b.sortDate - a.sortDate)
      .slice(0, 5);

    res.status(200).json({ recentTransactions });
  } catch (error) {
    console.error("Error in getRecentTransactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
