const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");

class UserUpdateServices {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password, old_password, admin, user_id }) {

    const database = await sqliteConnection();

    const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id]);
    
    const userWithEmail = await knex("users").select("email").where({email})
    const userWithUpdatedEmail = userWithEmail.length

    if(userWithUpdatedEmail === 0 ) {
      throw new AppError("Este e-mail não está cadastrado")
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.")
      }

      user.password = await hash(password, 10)
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.admin = admin ?? user.admin;

    if (password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para redefinição da nova senha.")
    }
    
   const userUpdate = await this.userRepository.update({ name, email, admin, password, updated_at });

   return userUpdate;

  }
}

module.exports = UserUpdateServices;