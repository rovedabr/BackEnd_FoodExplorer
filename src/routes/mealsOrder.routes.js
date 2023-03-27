const { Router, request, response } = require("express");

const MealsRequestController = require("../controllers/MealsOrderController")

const mealsOrderRoutes = Router();

const mealsOrderController = new MealsRequestController();

mealsOrderRoutes.post("/:user_id", mealsOrderController.create);
mealsOrderRoutes.get("/:user_id", mealsOrderController.show);
mealsOrderRoutes.delete("/:mealsOrder_id", mealsOrderController.delete);

module.exports = mealsOrderRoutes;

