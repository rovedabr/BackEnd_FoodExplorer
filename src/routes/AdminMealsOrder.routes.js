const { Router, request, response } = require("express");

const AdminMealsOrderController = require("../controllers/AdminMealsOrderController")

const adminMealsOrderRoutes = Router();

const adminMealsOrderController = new AdminMealsOrderController();

adminMealsOrderRoutes.put("/:mealsOrder_id", AdminMealsOrderController.update);
// adminMealsOrderRoutes.get("/:user_id", AdminMealsOrderController.show);
// mealsOrderRoutes.delete("/:mealsOrder_id", mealsOrderController.delete);

module.exports = adminMealsOrderRoutes;

