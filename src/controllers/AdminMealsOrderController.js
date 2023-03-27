const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class AdminMealsOrderController {
  async update(request, response) {
    const { id } =request.params
    const { status } = request.body;

    const mealsData = knex("mealsOrder").select("id", "order_details").where({ id:mealsOrder_id, order_details})
    const admin = knex("users").select("id").where({ user_id: id })

    console.log(user_id, admin, status, mealsData)

    return response.json()

  }

  // async show(request, response) {
  //   const { user_id } = request.params;
    
  //   const order_details = await knex("mealsOrder").select("order_details").where({ id: user_id })
  //   const observation = await knex("mealsOrder").select("observation").where({ id: user_id })
    
  //   return response.json({
  //     user_id,
  //     order_details,
  //     observation
  //   })
  // }

};



//criar a função de delete, show e index

module.exports = AdminMealsOrderController;