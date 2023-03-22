const AppError = require("../utils/AppError");
const sqliteConnecction = require("../database/sqlite")

class UsersController {
  async create (request, response ) {
    const { name, email, password } = request.body

    if(!name) {
      throw new AppError("O nome é obrigatório!")
    }

    const database = await sqliteConnecction();
    const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    
    if (checkUserExist) {
      throw new AppError("E-mail já cadastrado!")
    }

    const hashedPassword = await hash(password, 10)

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])

    response.status(201).json()
  }


}

module.exports = UsersController;