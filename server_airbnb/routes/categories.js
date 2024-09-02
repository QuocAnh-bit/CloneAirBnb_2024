var express = require("express");
var router = express.Router();
const categoryController = require("../controllers/category.controller");

router.get("/", categoryController.index);

module.exports = router;
