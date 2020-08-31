
module.exports = {
  development: {
    client: "mysql",
    connection: "mysql://root:bijusrt123@localhost:3306/toda",
    migrations: {
      directory: __dirname + "/migrations",
    },
  },
  production: {
    client: "mysql",
    connection: "mysql://root:bijusrt123@localhost:3306/toda",
  },
 };
 