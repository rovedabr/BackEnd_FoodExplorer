const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MealsController {
  async create(request, response) {
    const { title, category, description, price } = request.body;
    const { user_id } = request.params;

    if(!title || !category || !description || !price) {
      throw new AppError("Insira todos os dados! (nome, categoria descrição e valor)")
    }

    const getTitle = await knex("meals").select("title").where({ title })
    const titleExist = getTitle.length

    if ( titleExist > 0 ) {
      throw new AppError("Este prato já se encontra cadastrado!")
    }

    const meals = await knex("meals").insert({
      title,
      category,
      description,
      price 
    })

    return response.json()
  }

  async show(request, response) {
    const { id } = request.params;
    const meals = await knex("meals").where({ id }).first()

    return response.json({
      ...meals
    })
  }

//fazer a função delete e a função de index

};

module.exports = MealsController;