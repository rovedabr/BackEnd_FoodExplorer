const knex = require("knex");
const AppError = require("../utils/AppError");

class MealsController {
  async create(request, response) {
    const { title, category, description, price } = request.body;
    // const { user_id } = request.params;

    const meals = await knex("meals").insert({
      title,
      category,
      description,
      price 
    })

    console.log(meals)
    console.error(error)

    return response.json()
  }

};

module.exports = MealsController;