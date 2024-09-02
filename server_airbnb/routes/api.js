var express = require("express");
var router = express.Router();

const authRouter = require("./auth");
const usersRouter = require("./users");
const propertiesRouter = require("./properties");
const categoriesRouter = require("./categories");
const placeTypesRouter = require("./placeTypes");
const amenitiesRouter = require("./amenities");
const locationsRouter = require("./locations");
const discountsRouter = require("./discounts");
const discountTypesRouter = require("./discountTypes");
const paymentRouter = require("./payment");

const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

router.use("/auth/", authRouter);
router.use("/users/", usersRouter);
router.use("/properties/", propertiesRouter);
router.use("/categories/", categoriesRouter);
router.use("/place-types/", placeTypesRouter);
router.use("/amenities/", amenitiesRouter);
router.use("/locations/", locationsRouter);
router.use("/discounts/", discountsRouter);
router.use("/discountTypes/", discountTypesRouter);

router.use("/payment/", paymentRouter);

router.get("/profile", authMiddleware, userController.profile);

module.exports = router;
