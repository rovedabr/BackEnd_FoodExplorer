const UserCreateServices = require("./UserCreateServices");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const UserRepository = require("../repositories/UserRepository");
const AppError = require("../utils/AppError");

describe("UserCreateServices", () => {
  let userRepositoryInMemory = null;
  let userCreateServices = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateServices = new UserCreateServices(userRepositoryInMemory);

  })

  it("user should be create", async () => {
    const user = {
      name: "User Test",
      email:"user@test.com",
      admin: 0,
      password: "123"
    };
  
    const userCreated = await userCreateServices.execute(user);
    expect(userCreated).toHaveProperty("id");
  });

  it("user not should be create with exists email", async () => {
    const userTest1 = {
      name: "User Test 1",
      email: "usertest@test.com",
      password: "111",
      admin: 0
    }

    const userTest2 = {
      name: "User Test 2",
      email: "usertest@test.com",
      password: "222",
      admin: 0
    }

    await userCreateServices.execute(userTest1);
    await expect(userCreateServices.execute(userTest2)).rejects.toEqual(new AppError("E-mail já cadastrado!"));
  })

  it("user cannot be updated, email does not exist", async () => {
    
  })

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

})
