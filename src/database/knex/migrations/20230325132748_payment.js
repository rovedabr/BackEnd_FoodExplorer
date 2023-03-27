
exports.up = knex => knex.schema.createTable("payment", table => {
  table.increments("id")
  table.integer("user_id").references("id").inTable("user").onDelete("CASCADE")
  table.text("payment_type").references("payment_type").inTable("mealsOrder").onDelete("CASCADE")
  table.integer("total_price").references("total_price").inTable("mealsOrder").onDelete("CASCADE")
});

exports.down = knex => knex.schema.dropTable("payment")

