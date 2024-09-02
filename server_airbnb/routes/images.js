var express = require("express");
var router = express.Router();
const imageController = require("../controllers/image.controller");

router.get("/:imgsRouter/:name", imageController.index);

module.exports = router;
