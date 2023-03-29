const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MealsOrderController {
  async create(request, response) {
    const user_id   = request.user.id;
    const { total_price, order_details, payment_type, observation, status } = request.body;
    
    await knex("mealsOrder").insert({
      user_id,
      order_details,
      total_price,
      payment_type,
      observation,
      status
    })

    return response.json()
  }

  async show(request, response) {
    const user_id  = request.user.id;
    const { mealsOrder_id } = request.params;
  
    const mealOrder = await knex("mealsOrder")
      .select([
        "user_id",
        "order_details",
        "observation",
        "created_at",
      ])
      .where({
        user_id, 
        id: mealsOrder_id
      })

    return response.json(mealOrder)
  }

//!verificar a função de delete
  async delete(request, response) {
    const { id } = request.params;
    console.log(id)
 
    // await knex("mealsOrder").where({ id }).delete()

    return response.json("Pedido apagado com sucesso")
  }

};

module.exports = MealsOrderController;