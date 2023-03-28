const { Router, request, response } = require("express");
const multer = require("multer");
const uploadsConfig = require("../configs/upload")

const MealsController = require("../controllers/MealsController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const mealsRoutes = Router();
const upload = multer(uploadsConfig.MULTER)

const mealsController = new MealsController();

mealsRoutes.post("/", mealsController.create);
mealsRoutes.get("/:id", mealsController.show);
mealsRoutes.get("/", mealsController.index);
mealsRoutes.delete("/:id", mealsController.delete)
mealsRoutes.patch("/:id", ensureAuthenticated, upload.single("image"), (request, response) => {
  console.log(request.file.filename)
  response.json()
} )

module.exports = mealsRoutes;