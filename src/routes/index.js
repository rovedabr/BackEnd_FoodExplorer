const { Router } = require("express");

const userRouter = require("./user.routes")
const mealsRouter = require("./meals.routes")
const mealsOrderRouter = require("./mealsOrder.routes")
const adminMealsOrderRouter = require("./AdminMealsOrder.routes")

const routes = Router()

routes.use("/users", userRouter)
routes.use("/meals", mealsRouter)
routes.use("/mealsRequest", mealsOrderRouter)
routes.use("/adminOrderControls", adminMealsOrderRouter)

module.exports = routes