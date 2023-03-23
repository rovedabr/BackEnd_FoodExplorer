const { Router, request, response } = require("express");

const MealsController = require("../controllers/MealsController");

const mealsRoutes = Router();

const mealsController = new MealsController();

mealsRoutes.post("/", mealsController.create);
// mealsRoutes.get("/", mealsController.index);


module.exports = mealsRoutes;