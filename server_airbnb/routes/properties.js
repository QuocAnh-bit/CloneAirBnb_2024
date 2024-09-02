var express = require("express");
var router = express.Router();
const model = require("../models/index");
const propertyController = require("../controllers/property.controller");
const authMiddleware = require("../middlewares/auth.middleware");
var multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/images/properties");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });
router.get("/", propertyController.getProperties);
router.post("/", authMiddleware, propertyController.addProperty);
router.get("/:id", propertyController.getProperty);
router.put("/:id", propertyController.updateProperty);
router.get("/:id/navigate", propertyController.getNavigate);
router.post(
  "/:id/images",
  upload.array("photos", 12),
  propertyController.uploadImages
);
router.put("/:id/images", propertyController.updateSortImages);
router.delete("/:id/images/:idImage", propertyController.deleteImage);

module.exports = router;
