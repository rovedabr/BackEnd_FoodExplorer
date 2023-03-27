const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class AdminOrderControlsController {
  async update(request, response) {
    const { mealsOrder_id } = request.params
    const { status } = request.body;

    const details = await knex("mealsOrder").where({ id:mealsOrder_id }).select("order_details")
    const user_id = await knex("mealsOrder").where({ id: mealsOrder_id }).select("user_id") 

    console.log(mealsOrder_id)
    // const mealsOrder_id = await knex("mealsOrder").where({id: user_id}).select("id")

    return await knex("adminOrderControls").insert({
    user_id,
    mealsOrder_id,
    status,
    details
    })
     

    console.log(teste)

    return response.json()

    //delete
    //index

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

module.exports = AdminOrderControlsController;