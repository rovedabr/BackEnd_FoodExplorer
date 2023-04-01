const knex = require("../database/knex")
const sqliteConnection = require("../database/sqlite");

class UserRepository {
  async findByEmail({ email }) {
    const user = await knex("users").where({ email }).first()
    
    return user
  }

  async create({ name, email, admin, password }) {
    const userInsert = await knex('users').insert({
      name,
      email,
      admin,
      password
    })
    return { userInsert }
  }
}

module.exports = UserRepository;