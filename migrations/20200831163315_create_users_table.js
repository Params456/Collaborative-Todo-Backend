exports.up = async (knex) => {
    await knex.schema.createTable ("users", table => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.integer("age").notNullable();
        table.integer('cityId').unsigned();
        table.foreign('cityId').references('id').inTable('cities');
    })
};

exports.down = async (knex) => {
    await knex.schema.dropTable("users")
};
