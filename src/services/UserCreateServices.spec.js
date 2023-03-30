const UserCreateServices = require("./UserCreateServices");

it("user should be create", () => {
  const user = {
    name: "User Test",
    email:"user@test.com",
    admin: 0,
    password: "123"
  };

  const userCreateServices = new UserCreateServices();
  const userCreated = await userCreateServices.execute(user);

  expect(userCreated).toHaveProperty("id");
})