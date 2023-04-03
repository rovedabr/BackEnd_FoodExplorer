const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class UserCreateServices {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, admin, password }) {

    if(!name) {
      throw new AppError("O nome é obrigatório!");
    }

    const user = await this.userRepository.findByEmail({ email }); 
  
    if (user) {
      throw new AppError("E-mail já cadastrado!")
    };

    const hashedPassword = await hash(password, 10);

    const userCreated = await this.userRepository.create({ name, email, admin, password: hashedPassword });

    return userCreated;
  }

  async update({name, email, password, old_password, admin }) {
    const  user_id = request.user.id;
    const database = await sqliteConnection();

    const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id]);
  
    const userWithEmail = await knex("users").where({email}).first()
    // const userWithUpdatedEmail = userWithEmail.length
  
    if (!userWithEmail ) {
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
  }
}

module.exports = UserCreateServices;