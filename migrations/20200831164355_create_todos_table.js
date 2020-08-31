exports.up = async (knex) => {
    await knex.schema.createTable ("todos", table => {
        table.string("text").notNullable();
        table.integer("assignedTo").notNullable().unsigned();
        table.foreign('assignedTo').references('id').inTable('users');
        table.string('dueDate').notNullable();
        table.string('created_at').notNullable();
    })
};  

exports.down = async (knex) => {
    await knex.schema.dropTable("todos")
};
