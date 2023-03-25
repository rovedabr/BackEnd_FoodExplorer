
exports.up = knex => knex.schema.createTable("mealsRequest", table => {
  table.increments("id")
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
  table.text("request_details").notNullable()
  table.integer("total_price").notNullable()
  table.timestamp("created_at").default(knex.fn.now())
  table.text("payment_type", ["PIX", "Crédito"]).notNullable()
  table.text("observation").default(null)
})

exports.down = knex => knex.schema.dropTable("mealsRequest")
