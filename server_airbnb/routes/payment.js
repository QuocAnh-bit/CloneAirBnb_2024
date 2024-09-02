var express = require("express");
var router = express.Router();
const paymentController = require("../controllers/payment.controller");

router.post("/create-payment-intent", paymentController.index);

module.exports = router;
