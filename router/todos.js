var express = require('express')
var router = express.Router();
const {auth,authPerson} = require("../auth/auth");
var {create,single,getAll} = require("../controller/todos")

router.post("/todos",auth,create)

router.get("/mytodos",authPerson,single)
 
router.get("/todos",getAll)

module.exports = router;