var express = require("express");
var router = express.Router();
const placeTypeController = require("../controllers/placeType.controller");

router.get("/", placeTypeController.index);

module.exports = router;
