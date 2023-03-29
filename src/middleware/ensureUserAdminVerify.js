const knex = require("../database/knex");
const AppError = require("../utils/AppError");

async function ensureUserAdminVerify(request, response, next) {
  const user_id = request.user.id;

  const userTagAdmin = await knex("users").select("admin").where({id: user_id}).first()

  if (userTagAdmin === 0) {
    throw new AppError("Acesso não autorizado!", 401)
  }

  next()
}

module.exports = ensureUserAdminVerify;