## Installing And Dependency

**Clone the Repo** 
    [_Git_Clone_MyRepo_] (https://github.com/Params456/Collaborative-Todo-Backend)

## Dependency

1. `npm install` to install the dependencies
2. Set up the DB in mysql knexfile.js . Run the command `knex migrate:latest`.
3. Create a .env file in the root directory of the project and update the required variables.
4. `npm start` to run the server.

__The server will run with auto reloading using nodemon__

If you are using postman as the interacting with HTTP or HTTPS APIs.then for every authentication you have to give headers as email and password of particular user . if you want to see the logged in users todos so you have to give the users email and password . if you are not giving these needed headers It will send error as you response.

