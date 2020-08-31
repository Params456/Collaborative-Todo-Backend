var express = require('express')
const {auth,authPerson} = require("../auth/auth");
var router = express.Router();
var {create,getAll,getById} = require("../controller/users")

router
    .post("/user",create)  
    .get("/users",auth,getAll)
    .get("/users/:userId",authPerson,getById)

module.exports = router;