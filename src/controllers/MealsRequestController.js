const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MealsRequestController {
  async create(request, response) {
    const { id }  = request.params;
    const { status, total_price, payment_type } = request.body;

    const user_id = await knex("users").select("id").where({ id })

    await knex("mealsRequest").insert({
      user_id,
      status,
      total_price,
      payment_type
    })

    return response.json()
  }
};

module.exports = MealsRequestController;