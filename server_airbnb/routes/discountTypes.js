var express = require("express");
var router = express.Router();
const discountTypeController = require("../controllers/discountType.controller");

router.get("/", discountTypeController.index);

module.exports = router;
