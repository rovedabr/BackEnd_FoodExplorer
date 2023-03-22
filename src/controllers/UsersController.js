const { hash } = require("bcryptjs")
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

  async update(request, response) {
    const { name, email } = request.body;
    const { id } = request.params;

    const database = await sqliteConnecction();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("Usuário não encontrado!");
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está cadastrado")
    }

    user.name = name;
    user.email = email;

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      updated_at = ?
      WHERE id = ?`,
      [user.name, user.email, new Date(), id]
    );

    return response.status(200).json();
  }

  


}

module.exports = UsersController;