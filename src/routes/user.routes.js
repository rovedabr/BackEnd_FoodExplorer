const { Router, request, response } = require("express");

const UsersController = require("../controllers/UsersController");

const userRoutes = Router();

const usersController = new UsersController();

userRoutes.post("/", usersController.create);



module.exports = userRoutes;