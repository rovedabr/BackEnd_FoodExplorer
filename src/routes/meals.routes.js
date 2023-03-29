const { Router, request, response } = require("express");
const multer = require("multer");
const uploadsConfig = require("../configs/upload");

const MealsController = require("../controllers/MealsController");

const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const ensureUserAdminVerify = require("../middleware/ensureUserAdminVerify");

const mealsRoutes = Router();
const upload = multer(uploadsConfig.MULTER);

const mealsController = new MealsController();

mealsRoutes.post("/",  ensureAuthenticated, ensureUserAdminVerify, mealsController.create);
mealsRoutes.get("/:id", mealsController.show);
mealsRoutes.get("/", mealsController.index);
mealsRoutes.delete("/:id", ensureAuthenticated, ensureUserAdminVerify, mealsController.delete)
mealsRoutes.patch("/:id", ensureAuthenticated, ensureUserAdminVerify, upload.single("image"), mealsController.update);

module.exports = mealsRoutes; 