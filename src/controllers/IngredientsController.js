const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class IngredientsController {
  async create(request, response) {
    const { name } = request.body;
    const { id, meals_id } = request.params;

    const meals = await knex("meals").where({ meals_id: id }).orderBy("id")

    const ingredients = await knex("ingredients").insert({
      name,
      meals_id
    })

    return response.json()
  }

}

module.exports = IngredientsController