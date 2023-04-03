const { request } = require("express");
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

  async update({ name, email, password, admin, updated_at }) {
    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      admin = ?,
      updated_at = DATETIME("now")
      WHERE id = ?`,
      [user.name, user.email, user.password, user.admin, user_id]
    );
    
    return
  }

}

module.exports = UserRepository;