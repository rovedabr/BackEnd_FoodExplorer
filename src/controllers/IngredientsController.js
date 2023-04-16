const { json } = require("express");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class IngredientsController {
  async index(request, response) {
    const  { name }  = request.params;

    const meals_idThisIngredient = await knex("ingredients").select("meals_id").whereLike("name", `%${name}`)

    return response.json(meals_idThisIngredient)
  }

}

module.exports = IngredientsController;