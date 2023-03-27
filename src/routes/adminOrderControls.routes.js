const { Router } = require("express");

const AdminOrderController = require("../controllers/AdminOrderController");

const adminOrderControlsRoutes = Router();

const adminOrderController = new AdminOrderController();

adminOrderControlsRoutes.put("/:mealsOrder_id", adminOrderController.update);
adminOrderControlsRoutes.get("/:mealsOrder_id", adminOrderController.show);

module.exports = adminOrderControlsRoutes;