const propertyService = require("../service/propertyService");
var multer = require("multer");
var upload = multer().array("photos");
const PropertyTransformer = require("../transformers/property.tranformer");
const NavigateTransformer = require("../transformers/navigatePropeties.tranformer");

module.exports = {
  getProperties: async (req, res) => {
    const response = {};
    const properties = await propertyService.getProperties();

    if (!properties) {
      Object.assign(response, {
        status: 400,
        message: "Bad request",
      });
    } else {
      console.log(properties);
      Object.assign(response, {
        status: 200,
        message: "SUCCESS",
        data: new PropertyTransformer(properties),
      });
    }
    res.status(response.status).json(response);
  },
  addProperty: async (req, res) => {
    const { id: userId } = req.body;
    const response = {};
    const createProperty = await propertyService.createProperty(userId);
    if (!createProperty) {
      Object.assign(response, {
        status: 400,
        message: "Bad request",
      });
    } else {
      Object.assign(response, {
        status: 200,
        message: "SUCCESS",
        data: createProperty,
      });
    }
    res.status(response.status).json(response);
  },
  getNavigate: async (req, res) => {
    const { id: propertyId } = req.params;
    const response = {};
    const navigate = await propertyService.getProperty(propertyId);
    if (!navigate) {
      Object.assign(response, {
        status: 400,
        message: "Bad request",
      });
    } else {
      Object.assign(response, {
        status: 200,
        message: "SUCCESS",
        data: new NavigateTransformer(navigate),
      });
    }
    res.status(response.status).json(response);
  },
  getProperty: async (req, res) => {
    const { id: propertyId } = req.params;
    const response = {};
    const property = await propertyService.getProperty(propertyId);
    if (!property) {
      Object.assign(response, {
        status: 400,
        message: "Bad request",
      });
    } else {
      Object.assign(response, {
        status: 200,
        message: "SUCCESS",
        data: new PropertyTransformer(property),
      });
    }
    res.status(response.status).json(response);
  },
  updateProperty: async (req, res) => {
    const {
      categoryName,
      placeType,
      quantity,
      propertyName,
      desc,
      price,
      public,
    } = req.body;
    const { id: propertyId } = req.params;
    console.log(req.body, "bodee");
    const response = {};
    const updateFields = {};

    if (categoryName) updateFields.category_name = categoryName;
    if (placeType) updateFields.place_type = placeType;
    if (quantity) updateFields.quantity = quantity;
    if (propertyName) updateFields.property_name = propertyName;
    if (desc) updateFields.desc = desc;
    if (price) updateFields.price = price;
    if (public) updateFields.public = public;

    const fieldUpdate = await propertyService.updateProperty(
      updateFields,
      propertyId
    );

    if (!fieldUpdate) {
      Object.assign(response, {
        status: 400,
        message: "Bad request",
      });
    } else {
      Object.assign(response, {
        status: 200,
        message: "SUCCESS",
        data: fieldUpdate,
      });
    }
    res.status(response.status).json(response);
  },
  uploadImages: async (req, res) => {
    const response = {};
    console.log(req.files);
    console.log(req.body.order);
    const order = req.body.order ? req.body.order : null;
    if (req.files) {
      const result = await propertyService.uploadImgs(
        req.params.id,
        req.files,
        order
      );
      if (result) {
        Object.assign(response, {
          status: 200,
          message: "SUCCESS",
          totalUpload: req.files.length,
        });
      } else {
        Object.assign(response, {
          status: 400,
          message: "Bad request",
        });
      }
    } else {
      Object.assign(response, {
        status: 400,
        message: "Bad request",
      });
    }
    res.status(response.status).json(response);
  },
  updateSortImages: async (req, res) => {
    const response = {};
    const result = await propertyService.updateSortImages(
      req.params.id,
      req.body.sortedPhotos
    );
    if (!result) {
      Object.assign(response, {
        status: 400,
        message: "Bad request",
      });
    } else {
      Object.assign(response, {
        status: 200,
        message: "SUCCESS",
        data: result,
      });
    }
    res.status(response.status).json(response);
  },
  deleteImage: async (req, res) => {
    const { id, idImage } = req.params;
    const response = {};

    const deleteImg = await propertyService.deleteImage(id, idImage);
    if (!deleteImg) {
      Object.assign(response, {
        status: 400,
        message: "Bad request",
      });
    } else {
      Object.assign(response, {
        status: 200,
        message: "SUCCESS",
      });
    }
    res.status(response.status).json(response);
  },
};
