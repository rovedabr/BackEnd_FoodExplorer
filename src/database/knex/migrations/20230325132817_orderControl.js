
exports.up = knex => knex.schema.createTable("orderControls", table => {
  table.increments("id")
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
  table.integer("mealsOrder_id").references("id").inTable("mealsOrder").onDelete("CASCADE")
  table.text("status", ["Pendente", "Preparado", "Entregue"]).notNullable()
  table.text("order_details").references("order_details").inTable("mealsOrder")
  table.timestamp("created_at").default(knex.fn.now())
});
  

exports.down = knex => knex.schema.dropTable("adminOrderControls")

