const { Router } = require("express");

const userRouter = require("./user.routes")
const mealsRouter = require("./meals.routes")
const mealsRequestRouter = require("./mealsRequest.routes")

const routes = Router()

routes.use("/users", userRouter)
routes.use("/meals", mealsRouter)
routes.use("/mealsRequest", mealsRequestRouter)

module.exports = routes