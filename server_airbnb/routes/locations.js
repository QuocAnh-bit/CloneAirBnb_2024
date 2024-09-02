var express = require("express");

var router = express.Router();
const locationController = require("../controllers/location.controller");

router.post("/:id", locationController.updateOfCreateLocation);
module.exports = router;
