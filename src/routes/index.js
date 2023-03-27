const { Router } = require("express");

const userRouter = require("./user.routes")
const mealsRouter = require("./meals.routes")
const mealsOrderRouter = require("./mealsOrder.routes")
const adminOrderControlsRouter = require("./adminOrderControls.routes")

const routes = Router()

routes.use("/users", userRouter)
routes.use("/meals", mealsRouter)
routes.use("/mealsOrder", mealsOrderRouter)
routes.use("/adminOrderControls", adminOrderControlsRouter)

module.exports = routes