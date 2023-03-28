const { Router } = require("express");

const OrderController = require("../controllers/OrderController");

const orderControlsRoutes = Router();

const orderController = new OrderController();

orderControlsRoutes.put("/:mealsOrder_id", orderController.update);
orderControlsRoutes.get("/:mealsOrder_id", orderController.show);

module.exports = orderControlsRoutes;