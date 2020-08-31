exports.up = async (knex) => {
    await knex.schema.createTable ("cities", table => {
        table.increments('id').primary()
        table.string("city_name").notNullable()
    })
};

exports.down = async (knex) => {
    await knex.schema.dropTable("cities")
}; 