const { Router, request, response } = require("express");

const MealsRequestController = require("../controllers/MealsRequestController")

const mealsRequestRoutes = Router();

const mealsRequestController = new MealsRequestController();

mealsRequestRoutes.post("/", mealsRequestRoutes.create);

module.exports = ingredientsRoutes;