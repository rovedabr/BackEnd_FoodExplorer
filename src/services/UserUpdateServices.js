const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");
const { request } = require("express");

class UserUpdateServices {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password, old_password }) {
    // const user_id = request.params.id

    const user = await this.userRepository.findByEmail({email})
    // console.log(user)

    // const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id]);
    
    // const userWithEmail = await knex("users").select("email").where({email})
    // const userWithUpdatedEmail = userWithEmail.length

    if(!user ) {
      throw new AppError("Este e-mail não está cadastrado")
    }

    if (password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para redefinição da nova senha.")
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)
      // console.log(checkOldPassword)

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.")
      }

      // user.password = await hash(password, 10)
    }
    const newPassword = await hash(password, 10)
    console.log(newPassword)

    // hashPassword = user.password

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    // user.password = hashPassword ?? user.password
    // user.admin = admin ?? user.admin;


   const updated_at = knex.fn.now()
  //  const hashPassword = await hash(password, 10)
    // console.log(user.password)
   const userId = await this.userRepository.update({ name, email, updated_at, newPassword: password } );
    console.log(userId)
   return userId;

  }
}

module.exports = UserUpdateServices;