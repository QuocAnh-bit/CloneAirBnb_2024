var express = require("express");

var router = express.Router();

const discountController = require("../controllers/discount.controller");

router.get("/:propertyId", discountController.index);
router.post("/", discountController.handleAdd);

module.exports = router;
