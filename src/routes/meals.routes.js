const { Router, request, response } = require("express");
const uploadsConfig = require("../configs/upload");
const multer = require("multer");

const MealsController = require("../controllers/MealsController");
const ImageController = require("../controllers/ImageController");

const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const ensureUserAdminVerify = require("../middleware/ensureUserAdminVerify");

const mealsRoutes = Router();
const upload = multer(uploadsConfig.MULTER);

const mealsController = new MealsController();
const imageController = new ImageController();

mealsRoutes.post("/",  ensureAuthenticated, ensureUserAdminVerify, mealsController.create);
mealsRoutes.get("/:id", mealsController.show);
mealsRoutes.get("/", mealsController.index);
mealsRoutes.delete("/:id", ensureAuthenticated, ensureUserAdminVerify, mealsController.delete)
mealsRoutes.patch("/image/:id", ensureAuthenticated, ensureUserAdminVerify, upload.single("image"), imageController.update);

module.exports = mealsRoutes; 