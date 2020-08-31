const Dotenv = require('dotenv').config();

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : process.env.HOST,
      user : 'root',
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    }
});

module.exports = knex ;