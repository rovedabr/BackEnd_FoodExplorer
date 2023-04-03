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

  async update({ name, email, password, old_password, admin }) {
    const database = await sqliteConnection();

    // }
    // const { name, email, password, old_password, admin } = request.body;
    // const  user_id = request.user.id;


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

  }
}

module.exports = UserRepository;