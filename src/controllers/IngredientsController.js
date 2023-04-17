const { json } = require("express");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class IngredientsController {
  async index(request, response) {
    const  { title, name }  = request.query; 

    if(name) {
      const mealIngredients = await knex("ingredients").whereLike("name",`%${name}%`)
  
      console.log(mealIngredients)
      // const titles = knex("meals").select("title").where(meals_id)
    } else {
      const titles = await knex("meals").whereLike("title",`%${title}%`)
      console.log(titles)  
    }
    
    // const [ingredients] = await knex("ingredients")

    // const [meals] = await knex("meals")


    // console.log(ingredients)
    // console.log(mealIngredients)
    // console.log(meals)

    // console.log(titles)
    // console.log(titles.id)

    // const mealIngredient = ingredients.filter( ingredient => ingredients.name === ingredient)
    // console.log(mealIngredient)
    // //   return

    // if (ingredient.name === ) {
     

      // console.log(ingredients)

    //   meals = await knex("ingredients")
    //     .select([
    //       "meals.id",
    //       "meals.title",
    //       "meals.description",
    //       "meals.category",
    //       "meals.price",
    //       "meals.image"
    //     ])
    //     // .whereIn("name", filterIngredients)
    //     .whereLike("meals.title", `%${title}`)
    //     .innerJoin("meals", "meals.id", "ingredients.meals_id")
    // } else {
    //   meals = await knex("meals").select("title").whereLike("title", `%${title}`)
    // }

    // const ingredientsAtMeals = await knex("ingredients")
    // // console.log(ingredientsAtMeals)
    // const mealsWithIngredients = meals.map(meal => {
    //   const mealIngredient = ingredientsAtMeals.filter( ingredient => ingredient.meals_id === meals.id)
    //   return {
    //     ...meal,
    //     ingredients: mealIngredient
    //   }
    // })

    return response.json()

  }

}

module.exports = IngredientsController;