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

  async update({ name, email, password, updated_at }) {
    // const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id]);
    // const database = await sqliteConnection();
    
    const userId = await knex("users").where({ email }).first().update({
      name,
      email,
      updated_at,
      newPassword: password
    })

    return { userId , name, email, updated_at, password}
  //   const userUpdate = await database.run(`
  //     UPDATE users SET
  //     name = ?,
  //     email = ?,
  //     password = ?,
  //     admin = ?,
  //     updated_at = DATETIME("now")
  //     WHERE id = ?`,
  //     [user.name, user.email, user.password, user.admin, user_id]
  //   );
  //   return { userUpdate }
  }

}

module.exports = UserRepository;