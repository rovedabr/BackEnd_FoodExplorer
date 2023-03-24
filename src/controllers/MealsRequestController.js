const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MealsRequestController {
  async create(request, response) {
    const id   = request.params;
    const { status, total_price, payment_type } = request.body;
    console.log(status, total_price, payment_type)

   const users_id = id
  //  const id = user_id.pop(id => {
  //   return {
  //     id
  //   }
  //  })
    // const users_id = id.pop()
    console.log(users_id)
    // console.log(id)

    await knex("mealsRequest").insert({
      users_id,
      status,
      total_price,
      payment_type
    })

    return response.json()
  }
};

module.exports = MealsRequestController;