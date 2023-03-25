exports.up = knex => knex.schema.createTable("favorites", table => {
  table.increments("id")
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
  table.integer("meals_id").references("id").inTable("meals").onDelete("CASCADE")
  table.varchar("image").references("image").inTable("meals")  
});
  

exports.down = knex => knex.schema.dropTable("favorites")

