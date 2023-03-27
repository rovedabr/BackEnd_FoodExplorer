const { Router } = require("express");

const AdminOrderControlsController = require("../controllers/AdminOrderControlsController")

const adminOrderControlsRoutes = Router();

const adminOrderControlsController = new AdminOrderControlsController();

adminOrderControlsRoutes.put("/:mealsOrder_id ", adminOrderControlsController.update);


module.exports = adminOrderControlsRoutes;

