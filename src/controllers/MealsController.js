const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage")

class MealsController {
  async create(request, response) {
    const { title, category, description, price, ingredients } = request.body;

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
    const ingredients = await knex("ingredients").where({ meals_id: id})  
  
    return response.json({ 
      ...meals, 
      ingredients 
    })
  }


  async index(request, response) {
    const meals = await knex("meals").
      select([
        "id",
        "title",
        "category",
        "price",
        "description"
      ])
      .orderBy("title")

    const ingredients = await knex("ingredients")
      .select("name")
      .distinct()
      .orderBy("name")

    return response.json({
      ...meals,
      ingredients
    })
  }
  
  async update(request, response) { 
    const  { id }   = request.params;
    const { title, description, category, price, image } = request.body

    const imageFilename = request.file.filename;
    const diskStorage = new DiskStorage;

    const meal = await knex("meals").where({id}).first()

    if(!meal) {
      throw new AppError("Prato não localizado ou inexistente", 401)
    }

    console.log(meal.image)

    if (meal.image) {
      await diskStorage.deleteFile(meal.image)
    }

    const filename = await diskStorage.saveFile(imageFilename);

    meal.image = image ?? filename;
    meal.title = title ?? meal.title;
    meal.description = description ?? meal.description;
    meal.category = category ?? meal.category;
    meal.price = price ?? meal.price;

    await knex("meals").update(meal).where({ id })

 
    return response.status(200).json(meal)

  }

  async delete(request, response) {
    const { id } = request.params;
 
    await knex("meals").where({ id }).delete()

    return response.json()
  }

}

module.exports = MealsController;