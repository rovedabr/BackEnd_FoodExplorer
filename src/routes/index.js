const { Router } = require("express");

const userRouter = require("./user.routes")
const mealsRouter = require("./meals.routes")
// const ingredientsRouter = require("./ingredients.routes")

const routes = Router()

routes.use("/users", userRouter)
routes.use("/meals", mealsRouter)
// routes.use("/ingredients", ingredientsRouter)

module.exports = routes