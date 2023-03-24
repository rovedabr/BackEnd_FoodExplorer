
exports.up = knex => knex.schema.createTable("mealsRequest", table => {
  table.increments("id")
  table.integer("users_id").references("id").inTable("users").onDelete("CASCADE")
  table.text("status", ["Aguardando pagamento", "Aprovado", "Em preparação", "Finalizado"])
  table.integer("total_price").notNullable()
  table.timestamp("created_at").default(knex.fn.now())
  table.text("payment_type", ["Pix", "Dinheiro","Cartão de crédito", "Cartão de débito"]).notNullable()
  table.text("observation").default(null)
})

exports.down = knex => knex.schema.dropTable("mealsrequest")
