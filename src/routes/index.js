const { Router } = require("express");

const userRouter = require("./user.routes")
const mealsRouter = require("./meals.routes")

const routes = Router()

routes.use("/users", userRouter)
routes.use("/meals", mealsRouter)

module.exports = routes