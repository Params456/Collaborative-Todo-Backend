const Dotenv = require('dotenv').config();

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'paranthaman',
      database : 'todo'
    }
});

module.exports = knex ;