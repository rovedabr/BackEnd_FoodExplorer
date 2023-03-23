const knex = require("knex");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite")

class MealsController {
  async create(request, response) {
    const { title, category, description, price } = request.body;
    const { user_id } = request.params;

    const Meals = await knex("Meals").insert({
      title,
      category,
      description,
      price 
    })

    response.json()
  }

};

module.exports = MealsController;