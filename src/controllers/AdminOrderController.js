const { json } = require("express");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class AdminOrderController {
  async show(request, response) {
    const { mealsOrder_id } = request.params;
    const { status } = request.body;

    const details = await knex("mealsOrder").where({ id:mealsOrder_id }).select("order_details")
    const user_id = await knex("mealsOrder").where({ id: mealsOrder_id }).select("user_id") 

     return response.json({
      user_id,
      mealsOrder_id,
      status,
      details
    })

  }

  async update(request, response) {
    const { mealsOrder_id } = request.params;
    const { status } = request.body;

    const order = await knex("mealsOrder")
      .select([
        "mealsOrder.user_id",
        "mealsOrder.id",
        "mealsOrder.order_details"
      ])
      .where({id: mealsOrder_id })

      console.log(mealsOrder_id)
  
    const mealOrder = order.map(data => {
      return {
        ...data,
        mealsOrder_id,
        status,
      }
    })

    const mealOrderInsert = mealOrder.pop("id")

    console.log(mealOrderInsert)


    // await knex("adminOrderControls").insert(mealOrder)
    
     
  }

};



//criar a função de delete, show e index

module.exports = AdminOrderController;