const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MealsController {
  async create(request, response) {
    const { title, category, description, price, ingredients } = request.body;
    const { user_id, id } = request.params;

    if(!title || !category || !description || !price) {
      throw new AppError("Insira todos os dados! (nome, categoria descrição e valor)")
    }

    const getTitle = await knex("meals").select("title").where({ title })
    const titleExist = getTitle.length

    if ( titleExist > 0 ) {
      throw new AppError("Este prato já se encontra cadastrado!")
    }

    const meals_id = await knex("meals").insert({
      title,
      category,
      description,
      price 
    })

    const meal_id = meals_id.pop()

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        name: ingredient, 
        meals_id: meal_id
      }
    })
  
    await knex("ingredients").insert(ingredientsInsert)

    return response.json()
  }

  async show(request, response) {
    const { id } = request.params;
    

    const meals = await knex("meals").where({ id }).first()
    const ingredients = await knex("Ingredients").select().where({ meal_id })
    
    // const ingredientsEachMeal = ingredients.map( ingredient => {
    //   return {
    //      ...ingredientsEachMeal
    //   }
    // })

    // const ingredients = await knex("ingredients").where({ id })
    console.log(ingredients)
    console.log(ingredientsEachMeal)

    return response.json({
      ...meals,
      ingredients
    })
  }

//fazer a função delete e a função de index

};

module.exports = MealsController;