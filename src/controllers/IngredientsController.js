const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class IngredientsController {
  async create(request, response) {
    const { id, name } = request.body;
    const { meals_id } = request.params;

    const ingredients = await knex("ingredients").where({id}).first()
    const meals = await knex("meals").where({ meals_id: id }).orderBy("id")

    return response.json({
      ...ingredients,
      meals
    })
  }

}

module.exports = IngredientsController