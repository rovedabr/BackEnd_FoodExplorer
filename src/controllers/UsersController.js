const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const { hash, compare } = require("bcryptjs");
const sqliteConnection = require("../database/sqlite");

const UserRepository = require("../repositories/UserRepository");
const UserCreateServices = require("../services/UserCreateServices");
const UserUpdateServices = require("../services/UserUpdateServices");

class UsersController {
  async create (request, response ) {
    const { name, email, admin, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateServices =new UserCreateServices(userRepository);
    await userCreateServices.execute({ name, email, admin, password });

    response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password, admin } = request.body;
    const user_id = request.user.id;  

    const database = await sqliteConnection();

    const userRepository = new UserRepository();
    const userUpdateServices =new UserUpdateServices(userRepository);
    await userUpdateServices.execute({ name, email, admin, password, old_password, user_id })

    // const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id]);

    // const userWithEmail = await knex("users").select("email").where({email})
    // const userWithUpdatedEmail = userWithEmail.length

    // if(userWithUpdatedEmail === 0 ) {
    //   throw new AppError("Este e-mail não está cadastrado")
    // }

    // if (password && old_password) {
    //   const checkOldPassword = await compare(old_password, user.password)

    //   if (!checkOldPassword) {
    //     throw new AppError("A senha antiga não confere.")
    //   }

    //   user.password = await hash(password, 10)
    // }

    // user.name = name ?? user.name;
    // user.email = email ?? user.email;
    // user.admin = admin ?? user.admin;

    // if (password && !old_password) {
    //   throw new AppError("Você precisa informar a senha antiga para redefinição da nova senha.")
    // }

    // await database.run(`
    //   UPDATE users SET
    //   name = ?,
    //   email = ?,
    //   password = ?,
    //   admin = ?,
    //   updated_at = DATETIME("now")
    //   WHERE id = ?`,
    //   [user.name, user.email, user.password, user.admin, user_id]
    // );

    return response.status(200).json();
  }

}

module.exports = UsersController;