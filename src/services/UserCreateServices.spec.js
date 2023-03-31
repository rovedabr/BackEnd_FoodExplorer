const UserCreateServices = require("./UserCreateServices");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const UserRepository = require("../repositories/UserRepository");
const AppError = require("../utils/AppError.js");

describe("UserCreateServices", () => {
  it("user should be create", async () => {
    const user = {
      name: "User Test",
      email:"user@test.com",
      admin: 0,
      password: "123"
    };
  
    const userRepositoryInMemory = new UserRepositoryInMemory();
    const userCreateServices = new UserCreateServices(userRepositoryInMemory);
    const userCreated = await userCreateServices.execute(user);
  
    console.log(userCreated)
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

    const userInRepository = new UserRepositoryInMemory();
    const userCreateServices = new UserCreateServices(UserRepository);

    await userCreateServices.execute(userTest1);
    await expect(userCreateServices.execute(userTest2)).rejects.toEqual(new AppError("Este e-mail não está cadastrado"));
  })

})
