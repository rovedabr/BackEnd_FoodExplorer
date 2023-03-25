
exports.up = knex => knex.schema.createTable("adminRequestControls", table => {
  table.increments("id")
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
  table.integer("mealsRequest_id").references("id").inTable("mealsRequest").onDelete("CASCADE")
  table.text("status", ["Pendente", "Preparado", "Entregue"]).notNullable()
  table.text("details").references("request_details").inTable("mealsRequest")
  table.timestamp("created_at").default(knex.fn.now())
});
  

exports.down = knex => knex.schema.dropTable("adminRequestControls")

