const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");

class UserUpdateServices {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password, old_password , admin }) {
    // const user_id = request.params.id

    const user = await this.userRepository.findByEmail({ email })

    // const user = await this.userRepository.findUser({id: user_id})
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
      
      user.password = await hash(password, 10)
      // console.log(user.password)
    }
    // const newPassword = await hash(password, 10)
    // console.log(newPassword)

    // hashPassword = user.password

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.admin = admin ?? user.admin;
    // user.password = hashPassword ?? user.password
// console.log(name)
  //  const updated_at = knex.fn.now()
      // const newUpdated_at = await this.userRepository.updateTime({updated_at})
      // console.log(newUpdated_at)
  //  const hashPassword = await hash(password, 10)
    // console.log(user.password)

  const userUpdated =  await this.userRepository.update(user.name, user.email, user.password);

  return userUpdated;
    // console.log((user.name, user.email, user.password))

  }
}

module.exports = UserUpdateServices;