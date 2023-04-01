class UserRepositoryInMemory {
  users = []

  async create({ name, email, admin, password }) {
    const user = {
      id: Math.floor(Math.random() * 1000 + 1),
      email,
      name,
      password
    }

    this.users.push(user)

    return user
  }

  async findByEmail({email}) {
    console.log( {email})
    // console.log(users)
    // console.log(user.email)
    return this.users.find(user => user.email === email)
    console.log (user.email)
  }
}

module.exports = UserRepositoryInMemory;