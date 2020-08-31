var express = require('express')
var router = express.Router();

router.post("/cities",require("../controller/cities"))

module.exports = router;