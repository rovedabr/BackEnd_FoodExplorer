const { Router, request, response } = require("express");

const MealsOrderController = require("../controllers/MealsOrderController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const ensureUserAdminVerify = require("../middleware/ensureUserAdminVerify");

const mealsOrderRoutes = Router();

const mealsOrderController = new MealsOrderController();

mealsOrderRoutes.use(ensureAuthenticated);
mealsOrderRoutes.use(ensureUserAdminVerify);


mealsOrderRoutes.post("/",  mealsOrderController.create);
// mealsOrderRoutes.get("/",  mealsOrderController.show);
// mealsOrderRoutes.delete("/:mealsOrder_id", mealsOrderController.delete);

module.exports = mealsOrderRoutes;

