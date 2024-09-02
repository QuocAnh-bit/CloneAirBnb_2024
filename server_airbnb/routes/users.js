var express = require("express");
var router = express.Router();
const model = require("../models/index");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// router.post("/create-property", authMiddleware, userController.createProperty);
// router.get("/categories", userController.categories);
// router.get("/place-types", userController.getPlaceTypes);
// router.get("/properties/:id", userController.getProperty);
// router.put("/properties/:id", userController.updateProperty);
router.get("/:userId/profile", authMiddleware, userController.profile);
router.get("/:userId/properties", userController.getProperties);
router.get("/:userId/properties/incomplete", userController.getProperties);

module.exports = router;
