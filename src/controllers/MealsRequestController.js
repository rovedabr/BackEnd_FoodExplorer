const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MealsRequestController {
  async create(request, response) {
    const { user_id }   = request.params;
    const { total_price, request_details, payment_type } = request.body;

    console.log(request_details)

    await knex("mealsRequest").insert({
      user_id,
      request_details,
      total_price,
      payment_type
    })

    return response.json()
  }
};

module.exports = MealsRequestController;