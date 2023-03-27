const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MealsOrderController {
  async create(request, response) {
    const { user_id }   = request.params;
    const { total_price, order_details, payment_type, observation} = request.body;

    await knex("mealsRequest").insert({
      user_id,
      order_details,
      total_price,
      payment_type,
      observation
    })

    return response.json()
  }

  async show(request, response) {
    const { user_id } = request.params;
    
    const order_details = await knex("mealsOrder").select("order_details").where({ id: user_id })
    const observation = await knex("mealsOrder").select("observation").where({ id: user_id })
    
    return response.json({
      user_id,
      order_details,
      observation
    })
  }

  async update(request, response) {
    const { mealsOrder_id } = request.body;

    await knex("mealsOrder").select("id").where({ id: mealsOrder_id }).delete()

    return response.json()
  }
};



//criar a função de delete, show e index

module.exports = MealsOrderController;