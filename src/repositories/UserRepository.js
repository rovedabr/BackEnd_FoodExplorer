const sqliteConnection = require("../database/sqlite");

class UserRepository {
  async findByEmail(email) {
    const user = await knex("users").select("email").where({email})

    return user
  }

  async create(name, email, admin, password) {
    const userInsert = await knex('users').insert({
      name,
      email,
      admin,
      password: hashedPassword
    })
    return userInsert
  }

}