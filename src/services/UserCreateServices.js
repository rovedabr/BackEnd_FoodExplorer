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

    const checkUser = await this.userRepository.findByEmail(email);  
    let checkUserExist = () => checkUser.length;
  
    if (checkUserExist > 0) {
      throw new AppError("E-mail já cadastrado!")
    };

    const hashedPassword = await hash(password, 10);

    const userCreated = await this.userRepository.create({ name, email, admin, password: hashedPassword });

    return userCreated;
  }
}

module.exports = UserCreateServices;