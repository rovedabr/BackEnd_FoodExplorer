const { Router, request, response } = require("express");

const MealsOrderController = require("../controllers/MealsOrderController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const mealsOrderRoutes = Router();

const mealsOrderController = new MealsOrderController();

mealsOrderRoutes.use(ensureAuthenticated);

mealsOrderRoutes.post("/",  mealsOrderController.create);
// mealsOrderRoutes.get("/",  mealsOrderController.show);
// mealsOrderRoutes.delete("/:mealsOrder_id", mealsOrderController.delete);

module.exports = mealsOrderRoutes;

