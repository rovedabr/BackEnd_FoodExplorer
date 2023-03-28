const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class FavoritesController  {
  async create(request, response) {
    const user_id = request.user.id;
    const meal_id = knex("meals").select("id")

    console.log(user_id, meal_id)
  }

}
module.exports = FavoritesController;