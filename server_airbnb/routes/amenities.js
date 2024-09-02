var express = require("express");

var router = express.Router();

const amenityController = require("../controllers/amenity.controller");

router.get("/", amenityController.index);
router.post("/", amenityController.handleAdd);

module.exports = router;
