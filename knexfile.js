
module.exports = {
  development: {
    client: "mysql",
    connection: "mysql://root:paranthaman@localhost:3306/todo",
    migrations: {
      directory: __dirname + "/migrations",
    },
  },
  production: {
    client: "mysql",
    connection: "mysql://root:paranthaman@localhost:3306/todo",
  },
 };
 