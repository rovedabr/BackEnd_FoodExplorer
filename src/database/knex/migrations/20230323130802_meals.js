exports.up = knex => knex.schema.createTable("meals", table => {
  table.increments("id");
  table.text("name").notNullable()
  table.text("category", ['Refeições', 'Sobremesas', 'Bebidas']).notNullable()
  table.text("description").notNullable()
  table.integer("price").notNullable()
  table.varchar("image")
  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())
}); 


exports.down = knex => knex.schema.dropTable("meals")